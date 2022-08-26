/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Router } from '@angular/router';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
// import { Key } from 'protractor';
import { CrudAbsencePage } from 'src/app/CRUD/crud-absence/crud-absence.page';
import { EmployeService } from 'src/app/services/employe.service';
import { PopupModalService } from 'src/app/services/popup-modal.service';
import { environment } from 'src/environments/environment';
import { PrimePage } from '../prime/prime.page';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.page.html',
  styleUrls: ['./absence.page.scss'],
})
export class AbsencePage implements OnInit {
  listeAbsence: any;
  id: any;
  searchTerm: string;
  bulkEdit= false;

  /*  */

  today= format(new Date(),'yyyy-MM-dd');
  yesterday: any ; yesterdayToString: any; hier: any;


  constructor(private router: Router,private popupModalService: PopupModalService,
    private menu: MenuController,
    private http: HttpClient, private alertctrl: AlertController,
    private modalctrl: ModalController, private service: EmployeService) {
    this.loadAbsence();
    // this.today =format(new Date(), 'yyyy-MM-dd');
    this.yesterday = new Date(this.today);
    this.yesterday.setDate(this.yesterday.getDate() - 1);
    // this.yesterdayToString=format(parseISO(this.yesterday),'yyyy-MM-dd');
    this.yesterdayToString=format(this.yesterday,'yyyy-MM-dd');
    }

  ngOnInit() {
    if(this.listeAbsence){
      this.id=this.listeAbsence.ID;
    }
    this.sort(this.id);
  }

  loadAbsence(){
     //console.log(environment.endPoint);
     this.readAPI(environment.endPoint+'calendrier_action.php?Action=GET_ABSENCE&Token='+environment.tokenUser)
     .subscribe((listes) =>{
       // console.log(Listes);
       this.listeAbsence=listes ;
       console.log(this.listeAbsence);
     });

  }
  _openSideNav(){
    this.menu.enable(true,'menu-content');
    this.menu.open('menu-content');
  }
  addAbsence(){
    this.modalctrl.create({
      component: CrudAbsencePage
    }).
    then(modal =>{
      modal.present();
      return modal.onDidDismiss();
    }).then(({data, role})=> {
      console.log(data);
      console.log(role);
      if(role === 'create'){
        const newIdAbsence=data.Extra;
        this.service.get(newIdAbsence).subscribe(async newdata =>{
            this.listeAbsence.push(newdata[0]);
            //console.log(this.listeEmploye);
            this.loadAbsence();
        });
      }
    });
  }

  readAPI(url: string){
    //console.log(url);
    return this.http.get(url);

  }
  absencedetails(absence: any){
    this.popupModalService.presentModalAbsence(absence);
  }

  removeAbsence(absence: any){
    this.alertctrl.create({
      header:'Suppresion',
      message:'voulez vous supprimer ?',
      buttons:[{
        text:'oui',
        handler:()=>new Promise (resolve =>{
            /* let body = {
              action: 'SUPPRIME_DIRECTION',
              id:ID,

            }; */
            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json' );
            const apiUrl=environment.endPoint+'calendrier_action.php?Action=SUPPRIMER_ABSENCE&IDABSENCE='+
            absence.ID+'&Token='+environment.tokenUser;
            console.log(apiUrl);
            this.http.get(apiUrl).subscribe(async data =>{
              console.log(data);
              if(data['OK'] >0){
                 //this.router.navigate(['personnel']);
                 const pos=this.listeAbsence.indexOf(absence);
                 console.log(pos);
                 if (pos>-1){
                  this.listeAbsence.splice(pos,1);
                  this.loadAbsence();
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
  updateAbsence(absence: any){
    console.log(absence);
    this.modalctrl.create({
      component: CrudAbsencePage,
      componentProps:{ absence }
    })
    .then(modal => modal.present());

  }
  doRefresh(event){
    this.loadAbsence();
    event.target.complete();
  }
  async addAbsence2(){
    const modal = await this.modalctrl.create({
      component: CrudAbsencePage
    });
    return await modal.present();
  }
  // key= this.id;
  reverse= false;
  sort(key){

   this.id = key;
   this.reverse = !this.reverse;
  }

}
