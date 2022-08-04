import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EmployePage } from '../CRUD/employe/employe.page';
import { DetailAbsencePage } from '../DETAIL/detail-absence/detail-absence.page';
import { DetailAffectationPage } from '../DETAIL/detail-affectation/detail-affectation.page';
import { DetailEmployePage } from '../DETAIL/detail-employe/detail-employe.page';

/* Prise en charge des Photos */
import { PhotoService } from 'src/app/services/photo.service';
/* --------------------------------------------------------------------- */

@Injectable({
  providedIn: 'root'
})
export class PopupModalService {

  constructor( private modalCtrl: ModalController , private photoService: PhotoService) { }

  async presentAffectationModal(userDetail: any){
    const modal = await this.modalCtrl.create({
      component: DetailAffectationPage,
      componentProps:{
        data: userDetail,
      }

    });
    return await modal.present();
  }

 /*  async presentModalEmployeForm(userDetail: any){
    const modal = await this.modalCtrl.create({
      component: EmployePage,
      componentProps:{
        data: userDetail,
      }

    });
    return await modal.present();
  } */

  async presentModalEmploye(userDetail: any){
    const modal = await this.modalCtrl.create({
      component: DetailEmployePage,
      componentProps:{
        data: userDetail,
      }

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
