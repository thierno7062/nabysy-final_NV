/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
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


  constructor(private router: Router,private popupModalService: PopupModalService,
    private menu: MenuController,
    private http: HttpClient, private alertctrl: AlertController,
    private modalctrl: ModalController, private service: EmployeService, private loadingService: LoadingService) {
      this.refreshPerson();
     }

  ngOnInit() {
    this.refreshPerson();

  }

  refreshPerson(){
    this.readAPI(environment.endPoint+'employe_action.php?Action=GET_EMPLOYE&Token='+environment.tokenUser)
    .subscribe((listes) =>{
      this.loadingService.dismiss();
      // console.log(Listes);
      this.listeEmploye=listes ;
      console.log(this.listeEmploye);
    });
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
}
