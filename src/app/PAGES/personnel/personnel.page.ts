/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonSlides, MenuController, ModalController } from '@ionic/angular';
import { CrudEmployePage } from 'src/app/CRUD/crud-employe/crud-employe.page';
import { EmployeService } from 'src/app/services/employe.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PopupModalService } from 'src/app/services/popup-modal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.page.html',
  styleUrls: ['./personnel.page.scss'],
})
export class PersonnelPage implements OnInit {
  listeEmploye: any;

  searchTerm: string;
  bulkEdit= false;

  sortDirection= 0;
  sortKey= null;

  // Segments
  segmentList: Array<string> = ['Détails', 'Icônes'];
  selectedSegment: string;
  slideList: Array<string> = [
    'Slide Segment 1',
    'Slide Segment 2',
  ];

  @ViewChild('slide') slide: IonSlides;

  constructor(private router: Router,private popupModalService: PopupModalService,
    private menu: MenuController,
    private http: HttpClient, private alertctrl: AlertController,
    // eslint-disable-next-line max-len
    private modalctrl: ModalController, private service: EmployeService, private loadingService: LoadingService) {
      this.selectedSegment = this.segmentList[0];
      this.refreshPerson();
      this.sort();
     }

  ngOnInit() {
    this.refreshPerson();
   /*  for(let i= 0;i<100;i++){
      const obj ={id:'id'+i.toString(), name:'name'+i.toString(),
    salary:'salary'+i.toString()};
    this.listeEmploye.push(obj);
    }*/
    this.sort();
  }

  //Segment
  _segmentSelected(item: string, index: number) {
    this.slide.slideTo(index);
  }

  _ionSlideDidChange(event: any) {
    this.slide.getActiveIndex().then((index) => {
      this.selectedSegment = this.segmentList[index];
    });
  }

  //load API
  refreshPerson(){
    this.readAPI(environment.endPoint+'employe_action.php?Action=GET_EMPLOYE&Token='+environment.tokenUser)
    .subscribe((listes) =>{
      this.loadingService.dismiss();
      // console.log(Listes);
      this.listeEmploye=listes ;
      console.log(this.listeEmploye);
    });
    this.sort();
  }

  readAPI(url: string){
    return this.http.get(url);

  }
  goToServices(directionParent){
    this.router.navigate(['/liste-services'],{
      queryParams:directionParent
    });
  }
  adddirection(){
    this.router.navigate(['crud-direction']);
  }
  removeEmploye(employe: any){
    this.alertctrl.create({
      header:'Suppresion',
      message:'voulez vous supprimer ?',
      buttons:[{
        text:'oui',
        handler:()=>new Promise (() =>{
            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json' );
            const apiUrl=environment.endPoint+'employe_action.php?Action=SUPPRIME_EMPLOYE&IdEmploye='+
            employe.ID+'&Token='+environment.tokenUser;
            console.log(apiUrl);
            this.http.get(apiUrl).subscribe(async data =>{
              console.log(data);
              if(data['OK']>0){
                 //this.router.navigate(['personnel']);
                 const pos=this.listeEmploye.indexOf(employe);
                 console.log(pos);
                 if (pos>-1){
                  this.listeEmploye.splice(pos,1);
                  this.refreshPerson();
                 }
              }else{
                console.log(data['OK']);
              }
            });
          })
      },
       {text:'No'}
    ]
    }).then(alertE1 =>alertE1.present()) ;



  }

  addEmploye(){
    this.modalctrl.create({
      component: CrudEmployePage
    }).
    then(modal =>{
      modal.present();
      return modal.onDidDismiss();
    }).then(({data, role})=> {
      console.log(data);
      console.log(role);
      if(role === 'create'){
        const newIdEmploye=data.Extra;
        this.service.get(newIdEmploye).subscribe(async newdata =>{
            this.listeEmploye.push(newdata[0]);
            //console.log(this.listeEmploye);
            this.refreshPerson();
        });
      }
    });
  }

  updateEmploye(employe: any){
    console.log(employe);
    this.modalctrl.create({
      component: CrudEmployePage,
      componentProps:{ employe }
    })
    .then(modal => modal.present());
    this.refreshPerson();

  }
  _openSideNav(){
    this.menu.enable(true,'menu-content');
    this.menu.open('menu-content');
  }
  userdetails(userDetail: any){
    this.popupModalService.presentModalEmploye(userDetail);
  }
  doRefresh(event){
    this.refreshPerson();
    event.target.complete();
  }
  removeVarious(){
    this.bulkEdit=true;
  }
  save(){
    this.bulkEdit=false;
  }
  sortBy(key){
    this.sortKey= key;
    this.sortDirection++;
  }
  sort(){
    if (this.sortDirection === 1){
      this.listeEmploye = this.listeEmploye.sort((a, b) =>{
        console.log('a: ', a);
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        return valA.localeCompare(valB);
      });
    }else if (this.sortDirection === 2){
      this.listeEmploye = this.listeEmploye.sort((a, b) =>{
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        return valB.localeCompare(valA);
      });
    }else{
      this.sortDirection= 0;
      this.sortKey= null;
    }

  }
  userdetails2(userDetail){
    this.router.navigate(['/crud-employe'],{
      queryParams:userDetail
    });
  }


}
