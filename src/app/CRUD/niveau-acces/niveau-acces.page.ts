/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-niveau-acces',
  templateUrl: './niveau-acces.page.html',
  styleUrls: ['./niveau-acces.page.scss'],
})
export class NiveauAccesPage implements OnInit {
  @Input() accesInfo: any;
  @Input() employeInfo: any;
  isUpdate= false;
  idEmp: string;  SERVICE: '';
  profile: ''; niveauAcces: '';

  constructor(private modalctrl: ModalController,private toastctrl: ToastController,private http: HttpClient) { }

  ngOnInit() {
    this.loadContrat();

  }
  loadContrat(){
    if (this.accesInfo.NIVEAUACCES){
      this.isUpdate = true;
      this.SERVICE=this.accesInfo.SERVICE;
      this.niveauAcces=this.accesInfo.NIVEAUACCES;
      this.idEmp=this.accesInfo.ID;
      console.log(this.accesInfo);
      console.log(this.idEmp);
      console.log('Update= '+this.isUpdate);


    }
    if (this.employeInfo){
      this.idEmp=this.employeInfo.ID;
      console.log(this.employeInfo);
      console.log(this.idEmp);
      this.SERVICE=this.employeInfo.SERVICE;

    }
  }
  closeModal(){
    this.modalctrl.dismiss(null, 'closed');

  }

    onSubmit(){
    if(this.niveauAcces===''){
      this.presentToast('Veillez mettre le niveau d\'accés SVP!!!!');
    }else{
      return new Promise (() =>{
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        // ----------------------
        let txId='';
        if (this.accesInfo){
          txId='&acces='+this.accesInfo.ID ;
        }

        // -----------
        let txprofile='';
        if (this.profile){
          txprofile='&PROFILE='+this.profile;
        }
        const apiUrl=environment.endPoint+'employe_action.php?Action=SAVE_EMPLOYE'+'&IdEmploye='+this.idEmp+
        '&NIVEAUACCES='+this.niveauAcces+'&Token='+environment.tokenUser;
        // ---------------
        console.log(apiUrl);
        console.log(this.niveauAcces);

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
  async presentToast(a){
    const toast = await this.toastctrl.create({
      message:a,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

}
