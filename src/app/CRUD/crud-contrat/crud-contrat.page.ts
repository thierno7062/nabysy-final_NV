import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-crud-contrat',
  templateUrl: './crud-contrat.page.html',
  styleUrls: ['./crud-contrat.page.scss'],
})
export class CrudContratPage implements OnInit {
  @Input() contrat: any;
  isUpdate= false;
  idEmp: string; idContrat: '';

  constructor(private modalctrl: ModalController) { }

  ngOnInit() {
    this.loadContrat();
  }

  loadContrat(){
    if (this.contrat){
      this.idEmp=this.contrat.IdEmploye;
      this.idContrat=this.contrat.ID;
      this.isUpdate = true;
      console.log(this.contrat);
      console.log(this.idContrat);
      console.log(this.idEmp);
    }
  }
  closeModal(){
    this.modalctrl.dismiss(null, 'closed');

  }
  onSubmit(){

  }
}
