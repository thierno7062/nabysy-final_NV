/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonDatetime, IonSlides, MenuController, ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { IonicSelectableComponent } from 'ionic-selectable';
import { CrudCreditPage } from 'src/app/CRUD/crud-credit/crud-credit.page';
import { LoadingService } from 'src/app/services/loading.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.page.html',
  styleUrls: ['./credit.page.scss'],
})
export class CreditPage implements OnInit {
  @ViewChild(IonDatetime) datetime: IonDatetime;
  @ViewChild('selectComponent') selectComponent: IonicSelectableComponent;

  // Segments
  segmentList: Array<string> = ['CREDIT','HISTORIQUE DES CREDITS'];
  selectedSegment: string;
  slideList: Array<string> = [
    'Slide Segment 1',
    'Slide Segment 2',
  ];
  @ViewChild('slide') slide: IonSlides;

   /* Search Absence */
   selected_user= null;
   selected: any;
   users: any;
   listeEmploye: any;
   toggle= true;

   // Pick Date
    selectedDate= '';
    selectedDate2= format(new Date(),'yyyy-MM-dd');
    modes = ['date', 'month', 'month-year','year'];
    selectedMode= 'date';
    showPicker = false;
    dateValue= format(new Date(),'yyyy-MM-dd');
    dateValue2= format(new Date(),'yyyy-MM-dd');
    formattedString= '';
    formattedString2= format(new Date(),'yyyy-MM-dd');

    searchTerm: string;
    nbElement: any;
    id: any;

    today= format(new Date(),'yyyy-MM-dd');
    yesterday: any ; yesterdayToString: any; hier: any;
    listeCredit: any;
  constructor(private menu: MenuController,private loadingService: LoadingService,private http: HttpClient,
    private modalctrl: ModalController,private alertctrl: AlertController)
   {
    this.loadCredit();
    this.loadEmploye();
    }

  ngOnInit() {
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
  _openSideNav(){
    this.menu.enable(true,'menu-content');
    this.menu.open('menu-content');
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
    this.loadCredit();

  }
  clear(){
    this.selectComponent.clear();
    this.selectComponent.close();
    this.id=0;
    console.log(this.id);
    this.loadCredit();
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
    this.dateValue2= value;
    this.formattedString2= format(parseISO(value),  ' MMM d, yyyy');
    this.showPicker= false;
    this.selectedDate2=value;
   }

   close(){
    this.datetime.cancel(true);
    this.loadCredit();
   }
   select(){
    this.datetime.confirm(true);
   this.loadCredit();
  }

  effacedateDebut(){
    this.datetime.cancel(true);
    this.selectedDate= '';
    this.formattedString= '';
    this.loadCredit();
  }
  effacedateFin(){
    this.datetime.cancel(true);
    this.selectedDate2= '';
    this.formattedString2= '';
    this.loadCredit();
  }

  loadCredit(){
    let IdEmploye=''; let datedebut= '';
    let datefin= '';
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
    this.loadingService.presentLoading();
    this.readAPI(environment.endPoint+'credit_action.php?Action=LISTE_CREDIT'+IdEmploye+
    datedebut+datefin+'&Token='+environment.tokenUser)
    .subscribe((listes) =>{
      this.loadingService.dismiss();
      // console.log(Listes);
      this.listeCredit=listes ;
      this.nbElement=this.listeCredit.length  ;
      console.log(this.listeCredit.length);
      console.log(this.listeCredit);
    });

  }
  readAPI(url: string){
    console.log(url);
    return this.http.get(url);

  }
  addCredit(){
    this.modalctrl.create({
      component: CrudCreditPage
    }).
      then(modal =>{
        modal.present();
        return modal.onDidDismiss();
      }).then(({data, role})=> {
        console.log(data);
        console.log(role);
        if(role === 'create'){
          this.loadCredit();
        }
    });
  }
  creditDetail(credit: any){

  }
  updateCredit(credit: any){
    console.log(credit);
    this.modalctrl.create({
      component: CrudCreditPage,
      componentProps:{ credit }
    }).then(modal =>{
      modal.present();
      return modal.onDidDismiss();
    }).then(({data, role})=> {
      console.log(data);
      console.log(role);
      if(role === 'create'){
          this.loadCredit();
      }
    });
  }
  // IDCREDIT
  removeCredit(credit: any){
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
            const apiUrl=environment.endPoint+'credit_action.php?Action=SUPPRIMER_CREDIT&IDCREDIT='+
            credit.IdCredit+'&Token='+environment.tokenUser;
            console.log(apiUrl);
            this.http.get(apiUrl).subscribe(async data =>{
              console.log(data);
              if(data['OK'] >0){
                 //this.router.navigate(['personnel']);
                 const pos=this.listeCredit.indexOf(credit);
                 console.log(pos);
                 if (pos>-1){
                  this.listeCredit.splice(pos,1);
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

  //  Employe
  loadEmploye(){
    this.readAPI(environment.endPoint+'employe_action.php?Action=GET_EMPLOYE&Token='+environment.tokenUser)
    .subscribe((listes) =>{
      // console.log(Listes);
      this.listeEmploye=listes ;
      this.users=listes;
    });
  }
  doRefresh(event){
    this.loadCredit();
    event.target.complete();
  }
}
