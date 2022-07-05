/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, ModalController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crud-direction',
  templateUrl: './crud-direction.page.html',
  styleUrls: ['./crud-direction.page.scss'],
})
export class CrudDirectionPage implements OnInit {
  @Input() direction: any;
  id: '';
  nom: '';
  adresse: '';
  telephone: '';

  isUpdate= false;
  disabledbutton;

  constructor(private menu: MenuController,private modalctrl: ModalController,
    private router: Router,
    private toastctrl: ToastController,
    private http: HttpClient,
    private loadingctrl: LoadingController,
    private alertctrl: AlertController,) { }

  ngOnInit() {
    if (this.direction){
      this.nom=this.direction.Nom;
      this.adresse= this.direction.Adresse;
      this.telephone= this.direction.Tel;
      this.isUpdate = true;
    }
  }

  onSubmit(){
    if(this.nom===''){
      this.presentToast('Veillez mettre le nom SVP!!!!');
    }else if(this.adresse===''){
      this.presentToast('Veillez mettre l\'adresse SVP!!!!');
    }else if (this.telephone===''){
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
