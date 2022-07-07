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
  infoMensuel: any;
  nom: ''; qualifiquation: ''; periode: ''; base1: '';base2: ''; base3: ''; taux1: ''; taux2: ''; taux3: '';
  gain1: ''; gain2: ''; gain3: ''; salaireBrut: ''; totalRetenue: ''; salaireNet: '';

  searchTerm: string;
  // @ViewChild(IonAccordionGroup)accordionGroup: IonAccordionGroup;

  constructor(private router: Router,  private modalctrl: ModalController,private alertctrl: AlertController,
    private menu: MenuController, private http: HttpClient) {
      this.loadSalary(); this.loadInfoMensuel();
    }

  ngOnInit() {
  }
  loadSalary(){
    this.readAPI(environment.endPoint+'salaire_action.php?Action=GET_BULLETIN&IdEmploye=51&MOIS=6&ANNEE=2022&Token='+environment.tokenUser)
    .subscribe((listes) =>{
      console.log(listes);
      //  this.dt1=Listes['0'];

      this.listeSalaire=listes ;
      console.log(this.listeSalaire);
    });
    if(this.listeSalaire){
      this.nom=this.listeSalaire.NOMEMPLOYE; this.qualifiquation= this.listeSalaire.QUALIFICATION;
      this.periode=this.listeSalaire.PERIODE_DE_PAIE;
      this.base1=this.listeSalaire.LIGNE_GAIN_PRIME.Base; this.base2=this.listeSalaire.LIGNE_GAIN_PRIME.Base;
      this.base3=this.listeSalaire.LIGNE_GAIN_PRIME.Base; this.taux1=this.listeSalaire.LIGNE_GAIN_PRIME.Taux;
       this.taux2=this.listeSalaire.LIGNE_GAIN_PRIME.Taux;this.taux3=this.listeSalaire.LIGNE_GAIN_PRIME.Taux;
       this.gain1=this.listeSalaire.LIGNE_GAIN_PRIME.Gain;  this.gain2=this.listeSalaire.LIGNE_GAIN_PRIME.Gain;
       this.gain3=this.listeSalaire.LIGNE_GAIN_PRIME.Gain;  this.salaireBrut=this.listeSalaire.SALAIRE_BRUT;
        this.totalRetenue=this.listeSalaire.LIGNE_GAIN_PRIME.TOTAL_RETENU;  this.salaireNet=this.listeSalaire.SALAIRE_NET;

    }
  }
  loadInfoMensuel(){
    this.readAPI(environment.endPoint+'salaire_action.php?Action=GET_INFOS_MENSUEL&Token='+environment.tokenUser)
    .subscribe((listes) =>{
      console.log(listes);
      //  this.dt1=Listes['0'];

      this.infoMensuel=listes ;
      console.log(this.infoMensuel);
    });
  }
  readAPI(url: string){
    return this.http.get(url);

  }
  closeAccordion(){
    // this.accordionGroup.value= '';
  }
  toggleSection(){
    // this.accordionGroup.value= 'infos';
  }
  _openSideNav(){
    this.menu.enable(true,'menu-content');
    this.menu.open('menu-content');
  }
  doRefresh(event){
    this.loadInfoMensuel();
    this.loadSalary();
    event.target.complete();
  }
}
