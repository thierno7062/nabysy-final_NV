import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailAbsencePage } from '../DETAIL/detail-absence/detail-absence.page';
import { DetailAffectationPage } from '../DETAIL/detail-affectation/detail-affectation.page';
import { DetailEmployePage } from '../DETAIL/detail-employe/detail-employe.page';

@Injectable({
  providedIn: 'root'
})
export class PopupModalService {

  constructor( private modalCtrl: ModalController) { }

  async presentAffectationModal(userDetail: any){
    const modal = await this.modalCtrl.create({
      component: DetailAffectationPage,
      componentProps:{
        data: userDetail,
      }

    });
    return await modal.present();
  }
  async presentModal2(){
    const modal = await this.modalCtrl.create({
      component: DetailEmployePage,

    });
    return await modal.present();
  }
  dismiss(){
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
  async presentModalAbsence(){
    const modal = await this.modalCtrl.create({
      component: DetailAbsencePage,

    });
    return await modal.present();
  }
}
