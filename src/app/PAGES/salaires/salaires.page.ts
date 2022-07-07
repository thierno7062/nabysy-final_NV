/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonAccordionGroup, MenuController, ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-salaires',
  templateUrl: './salaires.page.html',
  styleUrls: ['./salaires.page.scss'],
})
export class SalairesPage implements OnInit {
  listeSalaire: any;
  url: string ;

  searchTerm: string;
  @ViewChild(IonAccordionGroup)accordionGroup: IonAccordionGroup;

  constructor(private router: Router,  private modalctrl: ModalController,private alertctrl: AlertController,
    private menu: MenuController, private http: HttpClient) {

    }

  ngOnInit() {
  }
  loadSalary(){
    this.readAPI(environment.endPoint+'direction_action.php?Action=GET_DIRECTION')
    .subscribe((listes) =>{
      console.log(listes);
      //  this.dt1=Listes['0'];

      this.listeSalaire=listes ;
      console.log(this.listeSalaire);
    });
  }
  readAPI(url: string){
    return this.http.get(url);

  }
  closeAccordion(){
    this.accordionGroup.value= '';
  }
  toggleSection(){
    this.accordionGroup.value= 'infos';
  }

}
