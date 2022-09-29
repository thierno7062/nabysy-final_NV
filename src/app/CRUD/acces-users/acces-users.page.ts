/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-acces-users',
  templateUrl: './acces-users.page.html',
  styleUrls: ['./acces-users.page.scss'],
})
export class AccesUsersPage implements OnInit {
  @Input() accesInfo: any;
  @Input() employeInfo: any;
  isUpdate= false;
  idEmp: string;  SERVICE: '';
  profile: ''; accesReseau: string; login: ''; password: '';

  constructor(private modalctrl: ModalController,private toastctrl: ToastController,private http: HttpClient) { }

  ngOnInit() {
    this.loadContrat();

  }
  loadContrat(){
    if (this.accesInfo.ACCES_RESEAU == 1){
      this.isUpdate = true;
      this.idEmp=this.accesInfo.IdEmploye;
      this.SERVICE=this.accesInfo.SERVICE;
      this.login=this.accesInfo.LOGIN;
      this.password=this.accesInfo.PASSOWRD;
      this.accesReseau=this.accesInfo.ACCES_RESEAU;
      this.profile=this.accesInfo.USER_PROFILE;

      console.log(this.accesInfo);
      console.log(this.idEmp);
      // console.log(this.isUpdate);


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
    if(this.login===''){
      this.presentToast('Veillez mettre le login SVP!!!!');
    }else if(this.password===''){
      this.presentToast('Veillez mettre le mot de passe SVP!!!!');
    }else if (this.accesReseau===''){
      this.presentToast('Veillez mettre le profile SVP!!!!');
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
        '&LOGIN='+this.login+'&PASSWORD='+this.password+'&PROFILE='+this.profile+
        '&ACCES_RESEAU='+this.accesReseau+'&Token='+environment.tokenUser;
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
  async presentToast(a){
    const toast = await this.toastctrl.create({
      message:a,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

}
