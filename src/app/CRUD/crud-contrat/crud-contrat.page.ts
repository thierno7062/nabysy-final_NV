/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
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
  @Input() contratInfo: any;
  @Input() employeInfo: any;
  isUpdate= false;
  idEmp: string; idContrat: ''; SERVICE: '';
  Titre_Contrat: ''; Type_contrat: number;
  bulkEdit= true;

  // select date
  formattedString= '';
  formattedString2= '';
  dateValue= format(new Date(),'yyyy-MM-dd')+ 'T09:00:00.000Z';
  dateValue2= format(new Date(),'yyyy-MM-dd')+ 'T09:00:00.000Z';
  showPicker = false;
  selectedDate= format(new Date(),'yyyy-MM-dd');
  selectedDate2: string;

  constructor(private modalctrl: ModalController,private toastctrl: ToastController,
    private http: HttpClient,
    )
  {

   }

  ngOnInit() {
    this.loadContrat();
  }

  loadContrat(){
    if (this.contratInfo.ID>0){
      this.isUpdate = true;
      this.idEmp=this.contratInfo.IdEmploye;
      this.idContrat=this.contratInfo.ID;
      console.log(this.contratInfo);
      console.log(this.idContrat);
      console.log(this.idEmp);
      this.SERVICE=this.contratInfo.SERVICE;
      this.selectedDate=this.contratInfo.DateDebut;
      this.formattedString=this.contratInfo.DateDebut;
      this.selectedDate2=this.contratInfo.DateFin;
      this.formattedString2=this.contratInfo.DateFin;
      this.Titre_Contrat=this.contratInfo.TitreContrat;
      this.Type_contrat=this.contratInfo.Illimite;
      if(this.Type_contrat==1){
        this.bulkEdit=false;
      }
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
    close(){
      this.datetime.cancel(true);
    }
    select(){
      this.datetime.confirm(true);
    }
    onSubmit(){
    if(this.formattedString==''){
      this.presentToast('Veillez mettre la date de Départ SVP!!!!');
    }
    else if (this.Titre_Contrat=== null){
      this.presentToast('Veillez mettre le Titre du contrat SVP!!!!');
    }else if (this.Type_contrat == null){
      this.presentToast('Veillez mettre le Type du contrat SVP!!!!');
    }
    else{
      return new Promise (() =>{
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        // ----------------------
        let txId='';
        if (this.idContrat){
          txId='&IDCONTRAT='+this.contratInfo.ID ;
        }
        let datefn='';
        if (this.bulkEdit==true){
          datefn='&DATEFIN='+this.selectedDate2 ;
        }
        const apiUrl=environment.endPoint+'employe_action.php?Action=AJOUT_CONTRAT_EMPLOYE'+'&IDEMPLOYE='+this.idEmp+
        txId+'&DATEDEBUT='+this.selectedDate+datefn+'&ILLIMITE='+this.Type_contrat+
        '&TITRE_CONTRAT='+this.Titre_Contrat+'&Token='+environment.tokenUser;
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
  }
  // onSubmit(){}
  async presentToast(a){
    const toast = await this.toastctrl.create({
      message:a,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }
  effacedateDebut(){
    this.datetime.cancel(true);
    this.selectedDate= '';
    this.formattedString= '';
    this.loadContrat();
  }
  effacedateFin(){
    this.datetime.cancel(true);
    this.selectedDate2= '';
    this.formattedString2= '';
    this.loadContrat();
  }
  illimite(){
    this.bulkEdit=false;
    this.selectedDate2= '';
    this.formattedString2= '';
  }
  limite(){
    this.bulkEdit=true;
    this.formattedString2= format(new Date(),'yyyy-MM-dd');
    this.selectedDate2=format(new Date(),'yyyy-MM-dd');
  }
}
