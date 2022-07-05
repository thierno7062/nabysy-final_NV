/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crud-employe',
  templateUrl: './crud-employe.page.html',
  styleUrls: ['./crud-employe.page.scss'],
})
export class CrudEmployePage implements OnInit {
  @Input() employe: any;
  isUpdate= false;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  nom: string;
  prenom: string;
  fonction: string;
  adresse: string;
  telephone: string;
  sexe: string;
  idDirection: string;
  idService: string;
  direction: string;
  service: string;
  hideMe: boolean;
  message: boolean;
  message_txt_M: boolean;
  message_txt_F: boolean;
  message_txt: boolean;


  constructor(private modalctrl: ModalController,
    private http: HttpClient,
    private toastctrl: ToastController) { }

  ngOnInit() {
    if (this.employe){
      this.nom=this.employe.Nom;
      this.prenom= this.employe.Prenom;
      this.fonction= this.employe.Fonction;
      this.adresse= this.employe.Adresse;
      this.telephone= this.employe.Tel;
      this.sexe= this.employe.Sexe;
      this.idDirection= this.employe.idDirection;
      this.direction= this.employe.Direction;
      this.service= this.employe.Service;
      this.isUpdate = true;
      if(this.employe.IdDirection>0){
        this.hideMe = !this.hideMe;
      }else {
        this.hideMe = this.hideMe;
        this.message= !this.message;
        if(this.sexe=== 'M' || this.sexe=== 'm' ){
          this.message_txt_M= !this.message_txt_M;
        }else if(this.sexe=== 'F' || this.sexe=== 'f'){
          this.message_txt_F= !this.message_txt_F;
        }
        else{
          this.message_txt= !this.message_txt;
        }
      }
    }
  }
  onSubmit(){
    if(this.nom===''){
      this.presentToast('Veillez mettre le nom SVP!!!!');
    }else if(this.prenom===''){
      this.presentToast('Veillez mettre votre prénom SVP!!!!!!');
    }else if(this.adresse===''){
      this.presentToast('Veillez mettre l\'adresse SVP!!!!');
    }else if (this.telephone===''){
      this.presentToast('Veillez mettre le numéro SVP!!!!');
    }else{
      return new Promise (resolve =>{
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        // ----------------------
        let TxId='';
        if (this.employe){
          TxId='&IdEmploye='+this.employe.ID ;
        }

        let TxService='';
        if (this.service){
          TxService='&IdService='+this.idService;
        }
        const apiUrl=environment.endPoint+'employe_action.php?Action=SAVE_EMPLOYE'+
        TxId+'&Nom='+this.nom+'&Prenom='+this.prenom+'&Fonction='+this.fonction+'&Sexe='+
        this.sexe+'&Adresse='+this.adresse+'&Tel='+this.telephone+'&IdDirection='+
        this.idDirection+'&IdService='+this.idService+'&Token='+environment.tokenUser;
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
  closeModal(){
    this.modalctrl.dismiss(null, 'closed');

  }
}
