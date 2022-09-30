/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, IonSlides, MenuController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { IonicSelectableComponent } from 'ionic-selectable';
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
  constructor(private menu: MenuController,private loadingService: LoadingService,private http: HttpClient)
   {
    this.loadCredit();
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
    this.loadingService.presentLoading();
    this.readAPI(environment.endPoint+'credit_action.php?Action=LISTE_CREDIT&DATEDEBUT='+this.selectedDate+
    '&DATEFIN='+this.selectedDate2+'&Token='+environment.tokenUser)
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
    //console.log(url);
    return this.http.get(url);

  }
  creditDetail(credit: any){

  }
  updateCredit(credit: any){

  }
  removeCredit(credit: any){

  }
  doRefresh(event){
    this.loadCredit();
    event.target.complete();
  }
}
