/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import { Router } from '@angular/router';
import { AlertController,IonDatetime, MenuController, ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { IonicSelectableComponent } from 'ionic-selectable';
// import { Key } from 'protractor';
import { CrudAbsencePage } from 'src/app/CRUD/crud-absence/crud-absence.page';
import { EmployeService } from 'src/app/services/employe.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PopupModalService } from 'src/app/services/popup-modal.service';
import { environment } from 'src/environments/environment';
import { PrimePage } from '../prime/prime.page';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.page.html',
  styleUrls: ['./absence.page.scss'],
})
export class AbsencePage implements OnInit {
  @ViewChild(IonDatetime) datetime: IonDatetime;
  @ViewChild('selectComponent') selectComponent: IonicSelectableComponent;
  listeAbsence: any;
  id: any;
  searchTerm: string;
  bulkEdit= false;

  /* Search Absence */
  selected_user= null;
  selected: any;
  users: any;
  listeEmploye: any;
  toggle= true;

  // Pick Date
   selectedDate= '';
   selectedDate2= '';
  selectedDate3: '';
   modes = ['date', 'month', 'month-year','year'];
   selectedMode= 'date';
   showPicker = false;
   dateValue= format(new Date(),'yyyy-MM-dd');
   formattedString= '';
   formattedString2= '';
   formattedString3= '';


  today= format(new Date(),'yyyy-MM-dd');
  yesterday: any ; yesterdayToString: any; hier: any;

  isPaid: boolean; paye: any;
  choix: boolean; pourtous: any=1;
  isnotPaid: boolean; choixforOne: boolean;


  constructor(private router: Router,private popupModalService: PopupModalService,
    private menu: MenuController,private loadingService: LoadingService,
    private http: HttpClient, private alertctrl: AlertController,
    private modalctrl: ModalController, private service: EmployeService) {
    // this.loadAbsence();
    this.loadPrime();
    this.loadEmploye();
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

  /* loadAbsence(){
     //console.log(environment.endPoint);
     this.loadingService.presentLoading();
     this.readAPI(environment.endPoint+'calendrier_action.php?Action=GET_ABSENCE&Token='+environment.tokenUser)
     .subscribe((listes) =>{
       // console.log(Listes);
       this.listeAbsence=listes ;
       console.log(this.listeAbsence);
       this.loadingService.dismiss();
     });

  } */
  // **************************
  loadPrime(){
    let IdEmploye=''; let datedebut= '';let absencepaye= '';
    let datefin= '';let dateEnregistrement= ''; let absencepourtous= '';
    if(this.id){
      IdEmploye ='&IDEMPLOYE='+this.id ;
      console.log(IdEmploye);
    }
    if(this.selectedDate){
      datedebut='&DATEDEBUT='+this.selectedDate;
    }
    if(this.selectedDate2){
      datefin='&DATEFIN='+this.selectedDate2;
    }
    // DateEnreg
    if(this.selectedDate3){
      dateEnregistrement='&DateEnreg='+this.selectedDate3;
    }
    if(this.isPaid===true){
      this.paye= '1';
      absencepaye='&IsPaye=1';
    }else{
      this.paye= '0';
      absencepaye='&IsPaye=0';
    }
    if(this.choix===true){
      this.pourtous= '0';
    }else{
      this.pourtous= '1';
    }
    this.loadingService.presentLoading();
    this.readAPI(environment.endPoint+'calendrier_action.php?Action=GET_ABSENCE'+datedebut+datefin+absencepaye+
    +dateEnregistrement+IdEmploye+'&Token='+environment.tokenUser)
    .subscribe((listes) =>{
      this.loadingService.dismiss();
      // console.log(Listes);
      this.listeAbsence=listes ;
      console.log(this.listeAbsence);
    });
    this.sort(this.id);

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
              // this.loadAbsence();
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
                  // this.loadAbsence();
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
      /* .then(modal => modal.present());
      this.loadAbsence(); */
    }).then(modal =>{
      modal.present();
      return modal.onDidDismiss();
    }).then(({data, role})=> {
      console.log(data);
      console.log(role);
      if(role === 'create'){
          this.doRefresh(event);
          // this.loadAbsence();
      }
    });
  }
  doRefresh(event){
    this.loadPrime();
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
  // Zone de Recherche
  confirm(){
    this.selectComponent.confirm();
    this.selectComponent.close();
    this.id=0;
    console.log(this.selected);
    if(this.selected){
      this.id=this.selected.ID;

    }
    this.loadPrime();

  }
  clear(){
    this.selectComponent.clear();
    this.selectComponent.close();
    this.id=0;
    console.log(this.id);
    this.loadPrime();
  }
  toggleItems(){
    this.selectComponent.toggleItems(this.toggle);
    this.toggle= !this.toggle;

  }

  // Date
  dateChanged(value){
    this.dateValue= value;
   this.formattedString= format(parseISO(value),  ' MMM d, yyyy');
   this.showPicker= false;
   this.selectedDate=value;
   }
   dateChangedFin(value){
    this.dateValue= value;
   this.formattedString2= format(parseISO(value),  ' MMM d, yyyy');
   this.showPicker= false;
   this.selectedDate2=value;
   }


   dateChangedEnre(value){
    this.dateValue= value;
   this.formattedString3= format(parseISO(value),  ' MMM d, yyyy');
   this.showPicker= false;
   this.selectedDate3=value;
   }
   close(){
     this.datetime.cancel(true);
    this.loadPrime();
   }
   select(){
    this.datetime.confirm(true);
   this.loadPrime();
  }

   effacedateEnre(){
    this.datetime.cancel(true);
    this.selectedDate3= '';
    this.formattedString3= '';
   this.loadPrime();
  }
  effacedateDebut(){
    this.datetime.cancel(true);
    this.selectedDate= '';
    this.formattedString= '';
   this.loadPrime();
  }
  effacedateFin(){
    this.datetime.cancel(true);
    this.selectedDate2= '';
    this.formattedString2= '';
   this.loadPrime();
  }

  //  Employe
  loadEmploye(){
    this.readAPI(environment.endPoint+'employe_action.php?Action=GET_EMPLOYE&Token='+environment.tokenUser)
    .subscribe((listes) =>{
      // console.log(Listes);
      this.listeEmploye=listes ;
      this.users=listes;
      /* this.users.ID=listes['"ID"'];
          this.users.Nom=listes['"Nom"'];
          this.users.Adresse=listes['"Adresse"'];
          this.users.Telephone=listes['"Tel"']; */
      console.log(this.listeEmploye);
    });
  }

  // Methode pour tous
  togglepaspourTous(){
    /* this.bulkIndividuel = !this.bulkIndividuel;
    this.choixAbscencePourTous=!this.choixAbscencePourTous;
    console.log('choixAbscencePourTous =',this.choixAbscencePourTous); */
  }
}
