/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { CrudAbsencePage } from 'src/app/CRUD/crud-absence/crud-absence.page';
import { EmployeService } from 'src/app/services/employe.service';
import { PopupModalService } from 'src/app/services/popup-modal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.page.html',
  styleUrls: ['./absence.page.scss'],
})
export class AbsencePage implements OnInit {
  listeAbsence: any;

  searchTerm: string;
  bulkEdit= false;

  constructor(private router: Router,private popupModalService: PopupModalService,
    private menu: MenuController,
    private http: HttpClient, private alertctrl: AlertController,
    private modalctrl: ModalController, private service: EmployeService) {
       //console.log(environment.endPoint);
     this.readAPI(environment.endPoint+'calendrier_action.php?Action=GET_ABSENCE&Token='+environment.tokenUser)
     .subscribe((listes) =>{
       // console.log(Listes);
       this.listeAbsence=listes ;
       console.log(this.listeAbsence);
     });
    }

  ngOnInit() {
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
        const newIdEmploye=data.Extra;
        this.service.get(newIdEmploye).subscribe(async newdata =>{
            this.listeAbsence.push(newdata[0]);
            //console.log(this.listeEmploye);
        });
      }
    });
  }

  readAPI(url: string){
    //console.log(url);
    return this.http.get(url);

  }
  absencedetails(){
    this.popupModalService.presentModalAbsence();
  }

  removeEmploye(employe: any){
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
            const apiUrl=environment.endPoint+'employe_action.php?Action=SUPPRIME_EMPLOYE&IdEmploye='+
            employe.ID+'&Token='+environment.tokenUser;
            console.log(apiUrl);
            this.http.get(apiUrl).subscribe(async data =>{
              console.log(data);
              if(data['OK'] >0){
                 //this.router.navigate(['personnel']);
                 const pos=this.listeAbsence.indexOf(employe);
                 console.log(pos);
                 if (pos>-1){
                  this.listeAbsence.splice(pos,1);
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
  updateEmploye(employe: any){
    console.log(employe);
    this.modalctrl.create({
      component: CrudAbsencePage,
      componentProps:{ employe }
    })
    .then(modal => modal.present());

  }
}
