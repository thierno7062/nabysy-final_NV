/* eslint-disable no-trailing-spaces */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { NavParams, Platform } from '@ionic/angular';
import { PopupModalService } from 'src/app/services/popup-modal.service';

@Component({
  selector: 'app-photoviewer',
  templateUrl: './photoviewer.page.html',
  styleUrls: ['./photoviewer.page.scss'],
})
export class PhotoviewerPage implements OnInit {
  userDetails: any;

  constructor(public viewer: PhotoViewer,public platform: Platform,private navParams: NavParams,
    private popupModalService: PopupModalService,private route: ActivatedRoute)
     { }

  ngOnInit() {
    this.userDetails= this.navParams.get('data');
    console.log(this.userDetails);
  /*  const photoUrl=this.userDetails.PHOTO_URL;
    const option: PhotoViewerOptions={
      share:true,
      closeButton: true
    };
    this.viewer.show(photoUrl,'Test Photo',option); */
  }

  closeModal(){
    this.popupModalService.dismiss();
  }
}
