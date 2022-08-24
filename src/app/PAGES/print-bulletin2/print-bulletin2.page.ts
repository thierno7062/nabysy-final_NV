/* eslint-disable no-trailing-spaces */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Component, OnInit } from '@angular/core';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { Printer, PrintOptions } from '@awesome-cordova-plugins/printer/ngx';
import { File, IWriteOptions } from '@ionic-native/file/ngx';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-print-bulletin2',
  templateUrl: './print-bulletin2.page.html',
  styleUrls: ['./print-bulletin2.page.scss'],
})
export class PrintBulletin2Page implements OnInit {
  pdfObj = null;

  constructor( private file: File,private printer: Printer,
    private fileOpener: FileOpener) {

  }

  ngOnInit() {

  }
  pdfDownload(){


    const docDef = {
      watermark: { text: 'Ionic THIERNO', color: 'blue', opacity: 0.2, bold: true},
      // a string or { width: number, height: number }
      pageSize: 'A4',

      pageOrientation: 'portrait',

      pageMargins: [ 20, 10, 40, 60 ],
      
      content: [
        {
          columns: [

            {
              text: new Date().toString(),
              alignment: 'right',margin: [ 5, 2, 0, 20 ]
            }
          ]
        },
        {text: 'Reçu', style: 'header',alignment: 'center'},
        {text: 'Reçu de Thierno Abdourahmane Niang A__________________',margin: [ 0, 10, 0, 10 ] },
        'Je, soussigné(e) Nom Employé, reconnais avoir reçu la somme de________$. Cette somme a été reçu pour le mois de :',
        {text: 'Le paiement a été fait par______________.( espèce, chèque…). ',margin: [ 0, 20, 5, 10 ] },
        'Ce reçu confirme que le paiement a bien été fait.',
        {text: 'Signature',margin: [ 0, 400, 0, 0 ],alignment: 'right' }
        
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      },
      defaultStyle: {
        // alignment: 'justify'
      }
    };

    this.pdfObj = pdfMake.createPdf(docDef).download();



  }
}
