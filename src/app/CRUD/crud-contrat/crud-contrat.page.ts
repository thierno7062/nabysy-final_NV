/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, ModalController, ToastController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crud-contrat',
  templateUrl: './crud-contrat.page.html',
  styleUrls: ['./crud-contrat.page.scss'],
})
export class CrudContratPage implements OnInit {
  @ViewChild(IonDatetime) datetime: IonDatetime;
  // @Input() contrat: any;
  @Input() contratInfo: any;
  @Input() employeInfo: any;
  isUpdate= false;
  idEmp: string; idContrat: ''; SERVICE: '';

  // select date
  formattedString= '';
  formattedString2= '';
  formattedString3= '';
  dateValue= format(new Date(),'yyyy-MM-dd')+ 'T09:00:00.000Z';
  dateValue2= format(new Date(),'yyyy-MM-dd')+ 'T09:00:00.000Z';
  dateValue3= format(new Date(),'yyyy-MM-dd')+ 'T09:00:00.000Z';
  showPicker = false;
  selectedDate= format(new Date(),'yyyy-MM-dd');
  selectedDate2= format(new Date(),'yyyy-MM-dd');
  selectedDate3= format(new Date(),'yyyy-MM-dd');

  constructor(private modalctrl: ModalController,private toastctrl: ToastController,)
  {

   }

  ngOnInit() {
    this.loadContrat();
  }

  loadContrat(){
    if (this.contratInfo){
      this.isUpdate = true;
      this.idEmp=this.contratInfo.IdEmploye;
      this.idContrat=this.contratInfo.ID;
      console.log(this.contratInfo);
      console.log(this.idContrat);
      console.log(this.idEmp);
      this.SERVICE=this.contratInfo.SERVICE;

    }
    if (this.employeInfo){
      this.idEmp=this.employeInfo.ID;
      console.log(this.employeInfo);
      console.log(this.idEmp);

    }
  }
  closeModal(){
    this.modalctrl.dismiss(null, 'closed');

  }
    dateChanged(value){
      this.dateValue= value;
      this.formattedString= format(parseISO(value),  'yyyy-MM-dd');
      this.showPicker= false;
      this.selectedDate=format(parseISO(value),'yyyy-MM-dd');
    }
    dateChangedFin(value){
      this.dateValue2= value;
      this.formattedString2= format(parseISO(value),  'yyyy-MM-dd');
      this.showPicker= false;
      this.selectedDate2=format(parseISO(value),'yyyy-MM-dd');
    }
    dateChangedAmbauche(value){
      this.dateValue3= value;
      this.formattedString3= format(parseISO(value),  'yyyy-MM-dd');
      this.showPicker= false;
      this.selectedDate3=format(parseISO(value),'yyyy-MM-dd');
    }
    close(){
      this.datetime.cancel(true);
    }
    select(){
      this.datetime.confirm(true);

    }
    /* onSubmit(){
    if(this.formattedString===''){
      this.presentToast('Veillez mettre le nom SVP!!!!');
    }else if(this.formattedString2===''){
      this.presentToast('Veillez mettre l\'adresse SVP!!!!');
    }else if (this.formattedString3===''){
      this.presentToast('Veillez mettre le numéro SVP!!!!');
    }else{
      return new Promise (() =>{
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        // ----------------------
        let txId='';
        if (this.direction){
          txId='&IdDirection='+this.direction.ID ;
        }

        const apiUrl=environment.endPoint+'direction_action.php?Action=SAVE_DIRECTION'+
        txId+'&Nom='+this.nom+'&Adresse='+this.adresse+'&Tel='+this.telephone+'&Token='+environment.tokenUser;
        // ---------------
        console.log(apiUrl);
        this.http.get(apiUrl).subscribe(async data =>{
          console.log(data);
          if(data['OK']!== '0'){
            // this.router.navigate(['/personnel']);
            this.modalctrl.dismiss(data,'create');
          }

        });
      });
    }
  } */
  onSubmit(){}
  async presentToast(a){
    const toast = await this.toastctrl.create({
      message:a,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }
}
