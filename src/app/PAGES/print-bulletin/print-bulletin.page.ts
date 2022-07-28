/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {   Plugins } from '@capacitor/core';
import {  Camera, CameraResultType, CameraSource,  } from '@capacitor/camera';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { Platform } from '@ionic/angular';



const {camera, Filesystem, FileSystemDirectory} = Plugins;
import { ActivatedRoute, Route, Router } from '@angular/router';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs= pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-print-bulletin',
  templateUrl: './print-bulletin.page.html',
  styleUrls: ['./print-bulletin.page.scss'],
})
export class PrintBulletinPage implements OnInit {
   // Create PDF to print:
 myForm: FormGroup;
 pdfObj= null;
 base64Image = null;
 photoPreview= null;
 logoData = null;

 bulletinSalaire: any;
 nom: ''; qualifiquation: ''; periode: '';  salaireBrut: ''; totalRetenue: ''; salaireNet: '';categorie: ''; situationFa: '';
 nbTotalJour: '';nbheureApayer: '';totalHeureApayer: ''; mois: ''; adresse: ''; partTrimf: ''; partIrpp: ''; periodePaie: '';
 dateEmbauche: '';gainPrime: any; ligneCotisation: any;

  constructor(private http: HttpClient,private fb: FormBuilder, private plt: Platform,private route: ActivatedRoute,
    private fileOpener: FileOpener, private router: Router) {
      this.infoBulletin();

  }

  ngOnInit() {
    this.myForm= this.fb.group({

    });

  }
  infoBulletin(){
    this.route.queryParams.subscribe(res =>{
      console.log(res);
      this.bulletinSalaire=res;
      console.log(this.bulletinSalaire);
      if(this.bulletinSalaire){
        this.nom=this.bulletinSalaire.BULLETIN_SALAIRE.NOMEMPLOYE; this.qualifiquation= this.bulletinSalaire.BULLETIN_SALAIRE.QUALIFICATION;
      this.periode=this.bulletinSalaire.BULLETIN_SALAIRE.PERIODE_DE_PAIE; this.adresse=this.bulletinSalaire.BULLETIN_SALAIRE.ADRESSEEMPLOYE;
        this.salaireBrut=this.bulletinSalaire.BULLETIN_SALAIRE.SALAIRE_BRUT;
        this.totalRetenue=this.bulletinSalaire.BULLETIN_SALAIRE.LIGNE_GAIN_PRIME.TOTAL_RETENU;
        this.salaireNet=this.bulletinSalaire.BULLETIN_SALAIRE.SALAIRE_NET; this.categorie=this.bulletinSalaire.BULLETIN_SALAIRE.CATEGORIE;
        this.situationFa=this.bulletinSalaire.BULLETIN_SALAIRE.SITUATION_FAMILLE;this.partTrimf=this.bulletinSalaire.BULLETIN_SALAIRE.PART_TRIMF;
        this.partIrpp=this.bulletinSalaire.BULLETIN_SALAIRE.PART_IRPP;this.periodePaie=this.bulletinSalaire.BULLETIN_SALAIRE.PERIODE_DE_PAIE;
        this.dateEmbauche=this.bulletinSalaire.BULLETIN_SALAIRE.DATE_EMBAUCHE;
        this.gainPrime=this.bulletinSalaire.BULLETIN_SALAIRE.LIGNE_GAIN_PRIME;
        this.ligneCotisation=this.bulletinSalaire.BULLETIN_SALAIRE.LIGNE_COTISATION;
      }
    });
  }




      createPdf(){

      }

      downloadPdf(){

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
          style: 'tableExample',alignment: 'center',

          table: {
            headerRows: 1,
            body: [
              [{text: '\nCAFINE SARL', style: 'header',  alignment: 'center',rowSpan: 4}, {text: 'Adresse: Zone Industrielle Pikine Icotaf ',style: 'tableHeader'},{text: '\nBULLETIN DE PAIE', style: 'header', alignment: 'center',rowSpan: 4}],
              [{text: '', style: 'header',  alignment: 'center'}, {text: 'Téléphone: 00221 77 883 45 00',style: 'tableHeader'},{text: '', style: 'header', alignment: 'center'}],
              [{text: '', style: 'tableHeader'}, {text: 'Fax: 00221 33 834 75 10', style: 'tableHeader'}, {text: '', style: 'tableHeader'}],
              [{text: '', style: 'tableHeader',  alignment: 'center'}, {text: ' Email: cafine@orange.sn', style: 'tableHeader',  alignment: 'center'},{text: '', style: 'tableHeader'}],
              ['CONVENTION COLLECTIVE', 'NOM & PRENOM', 'ADRESSE'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ]
          },

          layout: {
            hLineWidth(i, node) {
              return (i === 0 || i === node.table.body.length) ? 2 : 1;
            },
            vLineWidth(i, node) {
              return (i === 0 || i === node.table.widths.length) ? 2 : 1;
            },
            hLineColor(i, node) {
              return (i === 0 || i === node.table.body.length) ? 'black' : 'black';
            },
            vLineColor(i, node) {
              return (i === 0 || i === node.table.widths.length) ? 'black' : 'black';
            },
            // hLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            // paddingLeft: function(i, node) { return 4; },
            // paddingRight: function(i, node) { return 4; },
            // paddingTop: function(i, node) { return 2; },
            // paddingBottom: function(i, node) { return 2; },
            // fillColor: function (rowIndex, node, columnIndex) { return null; }
          }
        },
          ]
        };


        // download the PDF
        pdfMake.createPdf(docDefinition).download();

      }


      doRefresh(event){
        this.infoBulletin();
        event.target.complete();
      }
}
