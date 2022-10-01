/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-trailing-spaces */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, ToastController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { IonicSelectableComponent } from 'ionic-selectable';
import { LoadingService } from 'src/app/services/loading.service';
import { PopupModalService } from 'src/app/services/popup-modal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crud-credit',
  templateUrl: './crud-credit.page.html',
  styleUrls: ['./crud-credit.page.scss'],
})
export class CrudCreditPage implements OnInit {

@Input() credit: any;
isUpdate: boolean;

// ionic selectable************
searchTerm: string;
selected_user= null;
selected: any;
users: any;
toggle= true;
@ViewChild('selectComponent') selectComponent: IonicSelectableComponent;

// Date
@ViewChild(IonDatetime) datetime: IonDatetime;
formattedString= format(new Date(),'yyyy-MM-dd');
dateValue= format(new Date(),'yyyy-MM-dd');
showPicker = false;
selectedDate= format(new Date(),'yyyy-MM-dd');

photo: '';
listeEmploye: any;
id: number;
  beneficiaire: any;
  nom: '';
  prenom: '';
  fonction: '';

  constructor(private popupModalService: PopupModalService,private http: HttpClient,
    private loadingService: LoadingService,private toastctrl: ToastController)
    {
      this.loadBeneficiaire();
      this.loadEmploye();
     }

  ngOnInit() {
    this.loadCredit();
  }

  loadCredit(){
    if(this.credit){
      console.log(this.credit);

    }
  }
  dateChanged(value){
    this.dateValue= value;
    this.formattedString= format(parseISO(value),  'dd MMMM, yyyy');
    console.log(format(parseISO(value),  'yyyy-MM-dd'));
    this.showPicker= false;
    //  this.selectedDate=value;
    this.selectedDate=format(parseISO(value),  'yyyy-MM-dd');

  }
  close(){
    this.datetime.cancel(true);
  //  this.loadSalary();
  }
  select(){
    this.datetime.confirm(true);
  //  this.loadSalary();
  }
  clear(){
    this.selectComponent.clear();
    this.selectComponent.close();
    this.id=== 0;
  }
  toggleItems(){
    this.selectComponent.toggleItems(this.toggle);
    this.toggle= !this.toggle;
    this.id=== 0;

  }
  confirm(){
    this.selectComponent.confirm();
    this.selectComponent.close();
    console.log(this.selected);
    if(this.selected){
      this.id=this.selected.ID;

    }
    // this.loadSalary();

  }

  loadEmploye(){
    this.loadingService.presentLoading();
    this.readAPI(environment.endPoint+'employe_action.php?Action=GET_EMPLOYE&Token='+environment.tokenUser)
    .subscribe((listes) =>{
      // console.log(Listes);
      this.listeEmploye=listes ;
      this.users=listes;
      console.log(this.listeEmploye);
    });

  }
  loadBeneficiaire(){
    this.readAPI(environment.endPoint+'employe_action.php?Action=GET_EMPLOYE&IdEmploye='+this.credit.ID+'&Token='+environment.tokenUser)
    .subscribe((listes) =>{
      this.beneficiaire=listes ;
      console.log(this.beneficiaire);
      this.nom=this.beneficiaire['0'].Nom;
      this.prenom=this.beneficiaire['0'].Prenom;
      this.fonction=this.beneficiaire['0'].Fonction;
      this.photo=this.beneficiaire['0'].PHOTO_URL;
      console.log(this.nom);
    });
  }
  readAPI(url: string){
    console.log(url);
    return this.http.get(url);

  }


  async presentToast(a){
    const toast = await this.toastctrl.create({
      message:a,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }
  closeModal(){
    // this.modalctrl.dismiss(null, 'closed');
    this.popupModalService.dismiss();

  }

}
