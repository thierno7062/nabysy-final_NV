import { Component, OnInit } from '@angular/core';
import { PopupModalService } from 'src/app/services/popup-modal.service';

@Component({
  selector: 'app-detail-absence',
  templateUrl: './detail-absence.page.html',
  styleUrls: ['./detail-absence.page.scss'],
})
export class DetailAbsencePage implements OnInit {

  constructor(private popupModalService: PopupModalService,) { }

  ngOnInit() {
  }


  closeModal(){
    this.popupModalService.dismiss();
  }

}
