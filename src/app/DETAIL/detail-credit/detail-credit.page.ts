/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { PopupModalService } from 'src/app/services/popup-modal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail-credit',
  templateUrl: './detail-credit.page.html',
  styleUrls: ['./detail-credit.page.scss'],
})
export class DetailCreditPage implements OnInit {
  @Input() creditInfos: any;
  beneficiaire: any;
  fonction: '';
  photo: '';



  constructor(private popupModalService: PopupModalService,private navParams: NavParams,private http: HttpClient)
   {
    }

  ngOnInit() {
    this.creditInfos= this.navParams.get('data');
    if(this.creditInfos){
      console.log(this.creditInfos);
      this.loadBeneficiaire();

    }
  }

  closeModal(){
    // this.modalctrl.dismiss(null, 'closed');
    this.popupModalService.dismiss();

  }
  loadBeneficiaire(){
    this.readAPI(environment.endPoint+'employe_action.php?Action=GET_EMPLOYE&IdEmploye='+this.creditInfos.IdEmploye+'&Token='+environment.tokenUser)
    .subscribe((listes) =>{
      this.beneficiaire=listes ;
      console.log(this.beneficiaire);
      // this.nom=this.beneficiaire['0'].Nom;
      // this.prenom=this.beneficiaire['0'].Prenom;
      this.fonction=this.beneficiaire['0'].Fonction;
      this.photo=this.beneficiaire['0'].PHOTO_URL;
    });
  }
  readAPI(url: string){
    console.log(url);
    return this.http.get(url);
  }
}
