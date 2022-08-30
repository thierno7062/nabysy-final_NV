/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { Component,Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-crud-sous-direction',
  templateUrl: './crud-sous-direction.page.html',
  styleUrls: ['./crud-sous-direction.page.scss'],
})
export class CrudSousDirectionPage implements OnInit {
  @Input() sousdirectionInfo: any;
  @Input() directionInfo: any;

  isUpdate= false;
  data: any;
  sousdirection: any;

  idService: 0;
  nom: '';
  direction: any;
  adresse: '';
  telephone: '';
  idDirection: 0;
  idSousDirection: 0;
  IdDirectionParent: '';


  constructor(private modalctrl: ModalController,private route: ActivatedRoute,
    private http: HttpClient,
    private toastctrl: ToastController) { }

  ngOnInit() {
    if (this.directionInfo){
      console.log(this.directionInfo);
      this.direction=this.directionInfo ;
      this.idDirection=this.direction.ID ;

    }
    if(this.sousdirectionInfo.ID) {
      console.log(this.sousdirectionInfo);
      this.isUpdate = true;
      this.IdDirectionParent=this.sousdirectionInfo.IdDirectionParent;
      this.nom=this.sousdirectionInfo.Nom;
      this.adresse= this.sousdirectionInfo.Adresse;
      this.telephone= this.sousdirectionInfo.Tel;
      this.idSousDirection= this.sousdirectionInfo.ID;
      this.sousdirection= this.sousdirectionInfo;
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
        if (this.idSousDirection>0){
          console.log(this.sousdirectionInfo);
          txId='&IdDirection='+this.idSousDirection ;
        }
        const apiUrl=environment.endPoint+'direction_action.php?Action=SAVE_DIRECTION'+txId+'&Nom='+
        this.nom+'&Adresse='+this.adresse+'&Tel='+this.telephone+'&IdDirectionParent='+this.idDirection+'&Token='+environment.tokenUser;
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
