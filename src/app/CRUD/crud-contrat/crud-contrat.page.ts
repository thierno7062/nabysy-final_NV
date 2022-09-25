/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-crud-contrat',
  templateUrl: './crud-contrat.page.html',
  styleUrls: ['./crud-contrat.page.scss'],
})
export class CrudContratPage implements OnInit {
  @ViewChild(IonDatetime) datetime: IonDatetime;
  @Input() contrat: any;
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

  constructor(private modalctrl: ModalController)
  {

   }

  ngOnInit() {
    this.loadContrat();
  }

  loadContrat(){
    if (this.contratInfo.ID){
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
  onSubmit(){

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
}
