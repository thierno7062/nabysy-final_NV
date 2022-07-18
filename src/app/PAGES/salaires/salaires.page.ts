/* eslint-disable @typescript-eslint/naming-convention */
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
  infoMensuel: any; id: number;
  afficheBulletin: boolean;
  nom: ''; qualifiquation: ''; periode: ''; base1: '';base2: ''; base3: ''; taux1: ''; taux2: ''; taux3: '';
  gain1: ''; gain2: ''; gain3: ''; salaireBrut: ''; totalRetenue: ''; salaireNet: '';categorie: ''; situationFa: '';
  nbTotalJour: '';nbheureApayer: '';totalHeureApayer: ''; mois: ''; adresse: ''; partTrimf: ''; partIrpp: ''; periodePaie: '';
  dateEmbauche: '';gainPrime: any; ligneCotisation: any;

  searchTerm: string;
  // @ViewChild(IonAccordionGroup)accordionGroup: IonAccordionGroup;

  constructor(private router: Router,  private modalctrl: ModalController,private alertctrl: AlertController,
    private menu: MenuController, private http: HttpClient) {
      this.loadSalary();
      /* this.loadInfoMensuel(); */
      if(this.listeSalaire){
        this.id=this.listeSalaire.IdEmploye;
        if(this.id>0)
        {this.afficheBulletin= true;}
      }else{
        this.afficheBulletin=false;
      }
    }

  ngOnInit() {
    this.loadSalary();
  }
  loadSalary(){
    this.readAPI(environment.endPoint+'salaire_action.php?Action=GET_BULLETIN&IdEmploye='+this.id+
    '&ANNEE=2022&Token='+environment.tokenUser)
    .subscribe((listes) =>{
      console.log(listes);
      //  this.dt1=Listes['0'];

      this.listeSalaire=listes ;
      //console.log(this.listeSalaire);
      console.log(this.listeSalaire.BULLETIN_SALAIRE.LIGNE_GAIN_PRIME);
    });
    if(this.listeSalaire){
      this.nom=this.listeSalaire.BULLETIN_SALAIRE.NOMEMPLOYE; this.qualifiquation= this.listeSalaire.BULLETIN_SALAIRE.QUALIFICATION;
      this.periode=this.listeSalaire.BULLETIN_SALAIRE.PERIODE_DE_PAIE; this.adresse=this.listeSalaire.BULLETIN_SALAIRE.ADRESSEEMPLOYE;
        this.salaireBrut=this.listeSalaire.BULLETIN_SALAIRE.SALAIRE_BRUT;
        this.totalRetenue=this.listeSalaire.BULLETIN_SALAIRE.LIGNE_GAIN_PRIME.TOTAL_RETENU;
        this.salaireNet=this.listeSalaire.BULLETIN_SALAIRE.SALAIRE_NET; this.categorie=this.listeSalaire.BULLETIN_SALAIRE.CATEGORIE;
        this.situationFa=this.listeSalaire.BULLETIN_SALAIRE.SITUATION_FAMILLE;this.partTrimf=this.listeSalaire.BULLETIN_SALAIRE.PART_TRIMF;
        this.partIrpp=this.listeSalaire.BULLETIN_SALAIRE.PART_IRPP;this.periodePaie=this.listeSalaire.BULLETIN_SALAIRE.PERIODE_DE_PAIE;
        this.dateEmbauche=this.listeSalaire.BULLETIN_SALAIRE.DATE_EMBAUCHE;
        this.gainPrime=this.listeSalaire.BULLETIN_SALAIRE.LIGNE_GAIN_PRIME;
        this.ligneCotisation=this.listeSalaire.BULLETIN_SALAIRE.LIGNE_COTISATION;

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
    if(this.infoMensuel){
      this.nbTotalJour= this.infoMensuel.NBTOTAL_JOUR;
      this.nbheureApayer=this.infoMensuel.NBHEURE_A_PAYER;
      this.totalHeureApayer=this.infoMensuel.TOTAL_HEURE_A_PAYER;
      this.mois=this.infoMensuel.MOIS;

    }
  }
  readAPI(url: string){
    console.log(url);
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
    this.loadSalary();
    event.target.complete();
  }
  getBulletin(){
    this.loadSalary();
  }
}
