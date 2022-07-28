/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { Printer } from '@awesome-cordova-plugins/printer/ngx';
import { AlertController, MenuController, ModalController, Platform } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { environment } from 'src/environments/environment';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

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
  sexe: any;
  sexeMx: boolean;
  sexeFn: boolean;
  sexeInc: boolean;
  nom: ''; qualifiquation: ''; periode: '';  salaireBrut: ''; totalRetenue: ''; salaireNet: '';categorie: ''; situationFa: '';
  nbTotalJour: '';nbheureApayer: '';totalHeureApayer: ''; mois: ''; adresse: ''; partTrimf: ''; partIrpp: ''; periodePaie: '';
  dateEmbauche: '';gainPrime: any; ligneCotisation: any; SALAIRE_BRUT: '';

  searchTerm: string;
  selected_user= null;
  selected: any;
  users: any;
  toggle= true;
  @ViewChild('selectComponent') selectComponent: IonicSelectableComponent;
  employeForm: FormGroup;
  portNameControl: FormControl;
  portCountryControl: FormControl;

  listeEmploye: any;
  bulkEdit= false;

  //pdf make
  pdfObj = null;
  items: any; items2: any;
  constructor(private router: Router,  private modalctrl: ModalController,private alertctrl: AlertController,
    private menu: MenuController, private http: HttpClient,private printer: Printer,
    private fb: FormBuilder, private plt: Platform, private fileOpener: FileOpener) {
      this.loadEmploye();
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
    this.loadEmploye();
    this.loadSalary();

  }
  loadEmploye(){
    this.readAPI(environment.endPoint+'employe_action.php?Action=GET_EMPLOYE&Token='+environment.tokenUser)
    .subscribe((listes) =>{
      // console.log(Listes);
      this.listeEmploye=listes ;
      this.users=listes;
      /* this.users.ID=listes['"ID"'];
          this.users.Nom=listes['"Nom"'];
          this.users.Adresse=listes['"Adresse"'];
          this.users.Telephone=listes['"Tel"']; */
      console.log(this.listeEmploye);
    });
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
        this.SALAIRE_BRUT=this.listeSalaire.BULLETIN_SALAIRE.SALAIRE_BRUT;
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
  doRefresh(event: { target: { complete: () => void } }){
    this.loadSalary();
    event.target.complete();
  }
  getBulletin(){
    this.loadSalary();
  }

  openFromCode(){
    this.selectComponent.open();
  }
  clear(){
    this.selectComponent.clear();
    this.selectComponent.close();

  }
  toggleItems(){
    this.selectComponent.toggleItems(this.toggle);
    this.toggle= !this.toggle;

  }
  confirm(){
    this.selectComponent.confirm();
    this.selectComponent.close();
    console.log(this.selected);
    if(this.selected){
      this.id=this.selected.ID;

    }
    this.loadSalary();

  }
  bulletinBulkEdit(){
    this.bulkEdit = !this.bulkEdit;
    this.loadSalary();
  }

  goToPrint(bulletin=this.loadSalary){
    this.router.navigate(['/print-bulletin'],{
      queryParams:bulletin
    });
  }


  //****************************** * Print bulletin ************************************************


  getItems(): void {
    this.items =this.gainPrime;
    console.log(this.items);

  }

  buildTableBody(data: any, columns: any): any {
    const body = [];
    body.push(columns);

    data.forEach((row: { Libelle: any; Base: any; Taux: any; Gain: any;Retenu: any; COTISATION_PATRONALE_TAUX: any; COTISATION_PATRONALE_MONTANT: any}) => {
      const dataRow = [];
      columns.forEach((column: { text: string }) => {
        if (column.text === 'LIBELLE RUBRIQUE') {
          dataRow.push(row.Libelle);
        } else if (column.text === 'Base') {
          dataRow.push(row.Base);
        }else if (column.text === 'Taux') {
          dataRow.push(row.Taux);
        }else if (column.text === 'Gain') {
          dataRow.push(row.Gain);
        }else if (column.text === 'Retenu') {
          dataRow.push(row.Retenu);
        }else if (column.text === 'TAUX') {
          dataRow.push(row.COTISATION_PATRONALE_TAUX);
        }else if (column.text === 'MONTANT') {
          dataRow.push(row.COTISATION_PATRONALE_MONTANT);
        }
      });
      body.push(dataRow);
    });
    return body;
  }

  table(data: any, columns: any[]): any {
    return {
      table: {
        widths: [150, 60, 40,60,50,40,56],
        headerRows: 1,
        body: this.buildTableBody(data, columns),
      },
      layout: {
        hLineWidth(i: number, node: { table: { body: string | any[] } }) {
          return (i === 0 || i === node.table.body.length) ? 1 : 1;
        },
        vLineWidth(i: number, node: { table: { widths: string | any[] } }) {
          return (i === 0 || i === node.table.widths.length) ? 2 : 1;
        },
        hLineColor(i: number, node: { table: { body: string | any[] } }) {
          return (i === 0 || i === node.table.body.length) ? 'black' : 'black';
        },
        vLineColor(i: number, node: { table: { widths: string | any[] } }) {
          return (i === 0 || i === node.table.widths.length) ? 'black' : 'black';
        },
      }
    };
  }
  // *****************cotisation**********************
  getItems2(): void {
    this.items2 =this.ligneCotisation;
    console.log(this.items2);

  }

  buildTableBody2(data: any, columns: any): any {
    const body = [];
    body.push(columns);

    data.forEach((row: { Libelle: any; Base: any; Taux: any; Gain: any;Retenu: any; COTISATION_PATRONALE_TAUX: any; COTISATION_PATRONALE_MONTANT: any}) => {
      const dataRow = [];
      columns.forEach((column: { text: string }) => {
        if (column.text === 'LIBELLE RUBRIQUE') {
          dataRow.push(row.Libelle);
        } else if (column.text === 'Base') {
          dataRow.push(row.Base);
        }else if (column.text === 'Taux') {
          dataRow.push(row.Taux);
        }else if (column.text === 'Gain') {
          dataRow.push(row.Gain);
        }else if (column.text === 'Retenu') {
          dataRow.push(row.Retenu);
        }else if (column.text === 'TAUX') {
          dataRow.push(row.COTISATION_PATRONALE_TAUX);
        }else if (column.text === 'MONTANT') {
          dataRow.push(row.COTISATION_PATRONALE_MONTANT);
        }
      });
      body.push(dataRow);
    });
    return body;
  }

  table2(data: any ,columns: any[]): any {
    return {
      table: {
        widths: [150, 60, 40,60,50,40,56],
        headerRows: 1,
        body: this.buildTableBody2(data, columns),
      },
      layout: {
        hLineWidth(i: number, node: { table: { body: string | any[] } }) {
          return (i === 0 || i === node.table.body.length) ? 0 : 0;
        },
        vLineWidth(i: number, node: { table: { widths: string | any[] } }) {
          return (i === 0 || i === node.table.widths.length) ? 2 : 1;
        },
        hLineColor(i: number, node: { table: { body: string | any[] } }) {
          return (i === 0 || i === node.table.body.length) ? 'black' : 'black';
        },
        vLineColor(i: number, node: { table: { widths: string | any[] } }) {
          return (i === 0 || i === node.table.widths.length) ? 'black' : 'black';
        },
      }
    };
  }


  downloadPdf(){
    this.getItems();

    this.getItems2();
    console.log(this.items2);


    const docDefinition = {

      content: [
            {
              columns: [

                {
                  text: new Date().toTimeString(),
                  alignment: 'right',
                }
              ]
            },

            {text: 'BULLETIN DE SALAIRE \n', style: 'header', alignment: 'center'},
            {text: '                    ', style: 'header'},
        {
          style: 'tableExample',alignment: 'justify',

          table: {
            headerRows: 1,
            widths: [100,58, 200, 125],
            heights: ['auto','auto','auto','auto','auto','auto', 10],
            body: [
              [{text: '', style: 'header',  alignment: 'center',border: [true, true,true,false]},{text: 'Adresse: ',border: [true, true, false, true]}, {text:'Zone Industrielle Pikine Icotaf ',style: 'tableHeader',alignment: 'left',border: [false, true, true, true]},{text: '', style: 'header', alignment: 'center',border: [true, true, true, false]}],
              [{text: 'CAFINE SARL', style: 'header',  alignment: 'center',rowSpan: 3,border: [true, false,true,true]},{text: 'Téléphone: ',border: [true, true, false, true]}, {text: '00221 77 883 45 00',style: 'tableHeader',alignment: 'left',border: [false, true, true, true]},{text: 'BULLETIN DE PAIE', style: 'header', alignment: 'center',rowSpan: 3,border: [true, false, true, true]}],
              [{text: '', style: 'tableHeader'},{text: 'Fax: ',border: [true, true, false, true]}, {text: '00221 33 834 75 10', style: 'tableHeader',alignment: 'left',border: [false, true, true, true]}, {text: '', style: 'tableHeader'}],
              [{text: '', style: 'tableHeader',  alignment: 'center'},{text: ' Email: ',border: [true, true, false, true]}, {text: 'cafine@orange.sn', style: 'tableHeader',border: [false, true, true, true]},{text: '', style: 'tableHeader'}],
              [{text:'CONVENTION\n COLLECTIVE',  alignment: 'center'},{text:'NOM & PRENOM',  alignment: 'center', bold:true, colSpan: 2}, {}, {text:'ADRESSE',  alignment: 'center'}],
              [{text:this.qualifiquation,  alignment: 'center'},{text:this.nom,  alignment: 'center', bold:true, colSpan: 2}, {}, {text:this.adresse,  alignment: 'center'}],
              [{text:'',  style: 'header', fontsize: 40, colSpan: 4,border: [true, true, true, false]}],

            ]
          },

          layout: {
            hLineWidth(i: number, node: { table: { body: string | any[] } }) {
              return (i === 0 || i === node.table.body.length) ? 2 : 1;
            },
            vLineWidth(i: number, node: { table: { widths: string | any[] } }) {
              return (i === 0 || i === node.table.widths.length) ? 2 : 1;
            },
            hLineColor(i: number, node: { table: { body: string | any[] } }) {
              return (i === 0 || i === node.table.body.length) ? 'black' : 'black';
            },
            vLineColor(i: number, node: { table: { widths: string | any[] } }) {
              return (i === 0 || i === node.table.widths.length) ? 'black' : 'black';
            },
          }
        },
        {
          style: 'tableExample',
          table:{
            widths: [100, 40, 50,47,47,50,56,57],
            heights: ['auto','auto', 10],
            headerRows: 2,
            body:[
              [{text:'QUALIFICATION',  alignment: 'center',style:'header'},  {text:'N° D\'ordre',  alignment: 'center',fontSize: 10},  {text:'Catégorie',  alignment: 'center',fontSize: 10},
              {text:'Situation\n Familiale',  alignment: 'center',fontSize: 10},{text:'PART IRPP',  alignment: 'center',fontSize: 10},{text:'PART\n TRIMF',  alignment: 'center',fontSize: 10},
              {text:'Période de Paie',  alignment: 'center',fontSize: 10},{text:'DATE D\'embauche',  alignment: 'center',fontSize: 10}

              ],
              [{text:this.qualifiquation,  alignment: 'center',style:'header'},  {text:'1',  alignment: 'center',fontSize: 10},  {text:'34',  alignment: 'center',fontSize: 10},
              {text:this.situationFa,  alignment: 'center',fontSize: 10},{text:this.partTrimf,  alignment: 'center',fontSize: 10},{text:this.partIrpp,  alignment: 'center',fontSize: 10},
              {text:this.periodePaie,  alignment: 'center',fontSize: 10},{text:this.dateEmbauche,  alignment: 'center',fontSize: 10}
              ],
              [{text:'',  style: 'header', fontsize: 40, colSpan: 8,border: [true, true, true, false]}],

            ]
          },
          layout: {
            hLineWidth(i: number, node: { table: { body: string | any[] } }) {
              return (i === 0 || i === node.table.body.length) ? 1 : 1;
            },
            vLineWidth(i: number, node: { table: { widths: string | any[] } }) {
              return (i === 0 || i === node.table.widths.length) ? 2 : 1;
            },
            hLineColor(i: number, node: { table: { body: string | any[] } }) {
              return (i === 0 || i === node.table.body.length) ? 'black' : 'black';
            },
            vLineColor(i: number, node: { table: { widths: string | any[] } }) {
              return (i === 0 || i === node.table.widths.length) ? 'black' : 'black';
            },
          }
        },

        this.table(this.items, [{ text: 'LIBELLE RUBRIQUE',  alignment: 'center',style:'header', margin: [0, 5],fontSize: 10,border: [true, true, true, true]}, { text: 'Base',  alignment: 'center',style:'header', margin: [0, 5],fontSize: 10,border: [true, true, true, true] },
        {text: 'Taux' ,  alignment: 'center',style:'header', margin: [0, 5],fontSize: 10,border: [true, true, true, true]},{text: 'Gain' ,  alignment: 'center',style:'header', margin: [0, 5],fontSize: 10,border: [true, true, true, true]},
        {text: 'Retenu' ,  alignment: 'center',style:'header',margin: [0, 5],fontSize: 10,border: [true, true, true, true]},{text: 'TAUX',  alignment: 'center',style:'header', margin: [0, 5],fontSize: 10 ,border: [true, true, true, true]},
        {text: 'MONTANT' ,  alignment: 'center',style:'header', margin: [0, 5],fontSize: 10,border: [true, true, true, true]}],
        ),

        {
          style: 'tableExample',
          table:{
            widths: [150, 60, 40,60,50,40,56],
            headerRows: 1,
            body:[
              [{text:'**Salaire Brut** (1)',  alignment: 'center',style:'header', margin: [0, 5]},  {},  {},
              {text: this.SALAIRE_BRUT,  alignment: 'center', margin: [0, 5]},{},{},{}
              ],
            ]
          },
          layout: {
            hLineWidth(i: number, node: { table: { body: string | any[] } }) {
              return (i === 0 || i === node.table.body.length) ? 2 : 1;
            },
            vLineWidth(i: number, node: { table: { widths: string | any[] } }) {
              return (i === 0 || i === node.table.widths.length) ? 2 : 1;
            },
            hLineColor(i: number, node: { table: { body: string | any[] } }) {
              return (i === 0 || i === node.table.body.length) ? 'black' : 'black';
            },
            vLineColor(i: number, node: { table: { widths: string | any[] } }) {
              return (i === 0 || i === node.table.widths.length) ? 'black' : 'black';
            },
          }
        },
        this.table2(this.items2, [{ text: 'LIBELLE RUBRIQUE',  alignment: 'center',style:'header', margin: [0, 5],fontSize: 10}, { text: 'Base',  alignment: 'center',style:'header', margin: [0, 5],fontSize: 10 },
        {text: 'Taux' ,  alignment: 'center',style:'header', margin: [0, 5],fontSize: 10},{text: 'Gain' ,  alignment: 'center',style:'header', margin: [0, 5],fontSize: 10},
        {text: 'Retenu' ,  alignment: 'center',style:'header',margin: [0, 5],fontSize: 10},{text: 'TAUX',  alignment: 'center',style:'header', margin: [0, 5],fontSize: 10 },
        {text: 'MONTANT' ,  alignment: 'center',style:'header', margin: [0, 5],fontSize: 10}],
        ),
        {
          style: 'tableExample',
          table:{
            widths: [150, 60, 40,60,50,40,56],
            headerRows: 1,
            body:[
              [{text:'**Total des retenues** (2)',  alignment: 'center',style:'header', margin: [0, 5]},  {},  {},
              {text: '',  alignment: 'center', margin: [0, 5]},{},{text:'',border: [true, false, true, false]},{text:'',border: [false, false, true, false]}
              ],
            ]
          },
          layout: {
            hLineWidth(i: number, node: { table: { body: string | any[] } }) {
              return (i === 0 || i === node.table.body.length) ? 2 : 1;
            },
            vLineWidth(i: number, node: { table: { widths: string | any[] } }) {
              return (i === 0 || i === node.table.widths.length) ? 2 : 1;
            },
            hLineColor(i: number, node: { table: { body: string | any[] } }) {
              return (i === 0 || i === node.table.body.length) ? 'black' : 'black';
            },
            vLineColor(i: number, node: { table: { widths: string | any[] } }) {
              return (i === 0 || i === node.table.widths.length) ? 'black' : 'black';
            },
          }
        },
        {
          style: 'tableExample',
          table:{
            widths: [150, 60, 40,60,50,40,56],
            headerRows: 1,
            body:[
              [{text:'**Salaire Net** (3) = (1) - (2)',  alignment: 'center',style:'header', margin: [0, 5],border: [true, false, true, true]},  {text:'',border: [true, false, true, true]},  {text:'',border: [true, false, true, true]},
              {text: '',  alignment: 'center', margin: [0, 5],border: [true, false, true, true]},{text:'',border: [true, false, true, true]},{text:'',border: [true, false, true, true]},{text:'',border: [true, false, true, true]}
              ],
            ]
          },
          layout: {
            hLineWidth(i: number, node: { table: { body: string | any[] } }) {
              return (i === 0 || i === node.table.body.length) ? 2 : 1;
            },
            vLineWidth(i: number, node: { table: { widths: string | any[] } }) {
              return (i === 0 || i === node.table.widths.length) ? 2 : 1;
            },
            hLineColor(i: number, node: { table: { body: string | any[] } }) {
              return (i === 0 || i === node.table.body.length) ? 'black' : 'black';
            },
            vLineColor(i: number, node: { table: { widths: string | any[] } }) {
              return (i === 0 || i === node.table.widths.length) ? 'black' : 'black';
            },
          }
        },

      ],
      defaultStyle: {
        fontSize: 10,
      }
    };




    // download the PDF
    pdfMake.createPdf(docDefinition).download();
    console.log(this.items);

  }


}
