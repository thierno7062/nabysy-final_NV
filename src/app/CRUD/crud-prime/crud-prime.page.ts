/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crud-prime',
  templateUrl: './crud-prime.page.html',
  styleUrls: ['./crud-prime.page.scss'],
})
export class CrudPrimePage implements OnInit {
  @Input() employe: any;
  isUpdate= false;
  ID: string;
  point: string;
  motif: string;

  constructor(private modalctrl: ModalController,
    private http: HttpClient,
    private toastctrl: ToastController) { }

  ngOnInit() {
    if (this.employe){
      this.ID=this.employe.IdEmploye;
      this.point= this.employe.NbPointAjoute;
      this.motif= this.employe.Motif;
      this.isUpdate = true;
    }
  }

  onSubmit(){
    if(this.ID===''){
      this.presentToast('Veillez mettre le nom SVP!!!!');
    }else if(this.point===''){
      this.presentToast('Veillez mettre votre prénom SVP!!!!!!');
    }else if(this.motif===''){
      this.presentToast('Veillez mettre l\'adresse SVP!!!!');
    }/* else if (this.telephone===''){
      this.presentToast('Veillez mettre le numéro SVP!!!!');
    } */else{
      return new Promise (() =>{
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        let txId= '';
        if (this.employe){
          txId='&IdEmploye='+this.employe.ID ;
        }

        const apiUrl=environment.endPoint+'performance_action.php?Action=ADD_PERFORMANCE&NBPOINT='+this.point+'&MOTIF='+this.motif+
        '&IDEMPLOYE='+this.ID+'&Token='+environment.tokenUser;
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
