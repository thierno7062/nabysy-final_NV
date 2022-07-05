/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crud-service',
  templateUrl: './crud-service.page.html',
  styleUrls: ['./crud-service.page.scss'],
})
export class CrudServicePage implements OnInit {
  @Input() serviceInfo: any;
  @Input() directionInfo: any;

  isUpdate= false;
  data: any;
  detailService: any;

  idService: 0;
  nom: '';
  direction: any;
  adresse: '';
  telephone: '';
  idDirection: '';

  constructor(private modalctrl: ModalController,private route: ActivatedRoute,
    private http: HttpClient,
    private toastctrl: ToastController) { }

  ngOnInit() {
     // console.log(this.directionInfo);
    // console.log(this.serviceInfo);

    if (this.directionInfo){
      console.log(this.directionInfo);
      this.direction=this.directionInfo ;
      this.idDirection=this.direction.ID ;

    }
    if(this.serviceInfo.ID) {
      console.log(this.serviceInfo);
      this.isUpdate = true;
      this.nom=this.serviceInfo.Nom;
      this.adresse= this.serviceInfo.Adresse;
      this.telephone= this.serviceInfo.Tel;
      this.idService= this.serviceInfo.ID;
      this.idDirection= this.serviceInfo.IdDirection;
      this.direction= this.directionInfo;
    }
  }
  onSubmit(){
    if(this.nom===''){
      this.presentToast('Veillez mettre le nom SVP!!!!');
    }else if(this.adresse===''){
      this.presentToast('Veillez mettre l\'adresse SVP!!!!!!');
    }else if(this.telephone===''){
      this.presentToast('Veillez mettre le téléphone SVP!!!!');
    }else{
      return new Promise (() =>{
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        // ----------------------
        let txId='';
        if (this.idService>0){
          console.log(this.serviceInfo);
          txId='&IdService='+this.idService ;
        }
        const apiUrl=environment.endPoint+'service_action.php?Action=SAVE_SERVICE'+txId+'&Nom='+
        this.nom+'&Adresse='+this.adresse+'&Tel='+this.telephone+
        '&IdDirection='+this.direction.ID+'&Token='+environment.tokenUser;
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
