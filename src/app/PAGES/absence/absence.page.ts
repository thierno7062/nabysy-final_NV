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

  todoAbsence= [{
    dateEnreg: 'Coding', dateFin: '',
    heureEnreg: '13-10-21', heureFin: '',
    textMotif: 'hight',
    dateDebut: 'Work',
    heureDebut: '',
  },
{
  dateEnreg: 'Design', dateFin: '',
    heureEnreg: '13-10-21', heureFin: '',
    textMotif: 'low',
    dateDebut: 'Work',
},
{
  dateEnreg: 'Shopping', dateFin: '',
    heureEnreg: '30-10-21', heureFin: '',
    textMotif: 'middle',
    dateDebut: 'Personal',
},
{
  dateEnreg: 'Workout', dateFin: '',
    heureEnreg: '25-10-21', heureFin: '',
    textMotif: 'hight',
    dateDebut: 'Personal',
}];

today: number = Date.now();
sortDirection= 0;
  sortKey= null;

  constructor(private router: Router,private popupModalService: PopupModalService,
    private menu: MenuController,
    private http: HttpClient, private alertctrl: AlertController,
    private modalctrl: ModalController, private service: EmployeService) {
    this.loadAbsence();
    }

  ngOnInit() {
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
        const newIdEmploye=data.Extra;
        this.service.get(newIdEmploye).subscribe(async newdata =>{
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
  absencedetails(){
    this.popupModalService.presentModalAbsence();
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
}
