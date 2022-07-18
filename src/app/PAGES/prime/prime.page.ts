import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-prime',
  templateUrl: './prime.page.html',
  styleUrls: ['./prime.page.scss'],
})
export class PrimePage implements OnInit {
  @ViewChild('slide') slide: IonSlides;
  segmentList: Array<string> = ['Segment 1', 'Segment 2', 'Segment 3'];
  selectedSegment: string;
  slideList: Array<string> = [
    'Slide Segment 1',
    'Slide Segment 2',
    'Slide Segment 3',
  ];


  constructor(public modalCtrl: ModalController) {
    this.selectedSegment = this.segmentList[0];
  }

  ngOnInit() {
  }
  _segmentSelected(item: string, index: number) {
    this.slide.slideTo(index);
  }

  _ionSlideDidChange(event: any) {
    this.slide.getActiveIndex().then((index) => {
      this.selectedSegment = this.segmentList[index];
    });
  }
}
