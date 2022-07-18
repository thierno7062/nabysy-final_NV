import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { PopupModalService } from 'src/app/services/popup-modal.service';

@Component({
  selector: 'app-detail-employe',
  templateUrl: './detail-employe.page.html',
  styleUrls: ['./detail-employe.page.scss'],
})
export class DetailEmployePage implements OnInit {
  userDetails: any;

  sexe: any;
  sexeMx: boolean;
  sexeFn: boolean;
  sexeInc: boolean;

  constructor(private popupModalService: PopupModalService, private navParams: NavParams) { }

  ngOnInit() {
    this.userDetails= this.navParams.get('data');
    console.log(this.userDetails);
    this.sexe= this.userDetails.Sexe;
    if(this.sexe==='M'||this.sexe==='m' ){
      this.sexeMx = !this.sexeMx;
    }else if(this.sexe==='F'||this.sexe==='f' ){
      this.sexeMx = this.sexeMx;
      this.sexeFn = !this.sexeFn;
    }else{
      this.sexeMx = this.sexeMx;
      this.sexeFn = this.sexeFn;
      this.sexeInc = !this.sexeInc;
    }
  }
  closeModal(){
    this.popupModalService.dismiss();
  }

}
