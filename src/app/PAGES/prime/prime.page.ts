import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-prime',
  templateUrl: './prime.page.html',
  styleUrls: ['./prime.page.scss'],
})
export class PrimePage implements OnInit {
  categorie=[];

  taskName: any;
  taskDate: any;
  taskCategorie: any;
  taskPriority: any;

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }
  async dismis(){
    await this.modalCtrl.dismiss();
  }
  selectedCategorie(index){
    this.taskCategorie=this.categorie[index];
  }
}
