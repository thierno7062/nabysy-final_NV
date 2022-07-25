/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {   Plugins } from '@capacitor/core';
import {  CameraResultType, CameraSource,  } from '@capacitor/camera';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { Platform } from '@ionic/angular';

const {Camera, Filesystem, FileSystemDirectory} = Plugins;

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs= pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-prime',
  templateUrl: './prime.page.html',
  styleUrls: ['./prime.page.scss'],
})
export class PrimePage implements OnInit {

 // Create PDF to print:
 myForm: FormGroup;
 pdfObj= null;
 base64Image = null;
 photoPreview= null;
 logoData = null;


  constructor(private http: HttpClient,private fb: FormBuilder, private plt: Platform, private fileOpener: FileOpener) {

  }

  ngOnInit() {
    this.myForm= this.fb.group({
      showLogo:true,
      from: 'thierno',
      to: 'Paul',
      text: 'TEST'
    });
    this.loadLocalAssetToBase64();
  }

  loadLocalAssetToBase64(){
this.http.get('./assets/man.png', {responseType: 'blob'})
.subscribe(res =>{
  const reader= new FileReader();
  reader.onloadend = () =>{
    this.logoData= reader.result;
  };
  reader.readAsDataURL(res);
});
  }

  async takePicture(){
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera

    });
    console.log('image');
    this.photoPreview=`data:image/jpeg;base64,${ image.base64Image}`;
  }
  createPdf(){
    const formValue = this.myForm.value;
    const image =this.photoPreview? { image: this.photoPreview, width:300 } : {};

    let logo = {};
    if(formValue.showLogo){
      logo = { image: this.logoData, width: 50};
    }

    const docDefinition= {
      watermark: { text: 'Ionic Academy', color: 'blue', opacity: 0.2, bold: true},
      content: [
        {
          columns: [

            logo,
            {
              text: new Date().toTimeString(),
              alignment: 'right'
            }
          ]
        },
        { text: 'REMINDER', style: 'header'},
        {
          columns:[
            {
              width: '50%',
              text: 'From',
              style: 'subheader'
            },
            {
              width: '50%',
              text: 'To',
              style: 'subheader'
            }
          ]
        },
        {
          columns: [
            {
              width: '50%',
              text: formValue.from
            },
            {
              width: '50%',
              text: formValue.to
            }
          ]
        },
        image,
        { text: formValue.text, margin: [0, 20, 0, 20]},
      ],
      styles:{
        header:{
          fontSize: 18,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        }
      }
    };
    this.pdfObj = pdfMake.createPdf(docDefinition);
    console.log(this.pdfObj);
  }

  downloadPdf(){
    if(this.plt.is('cordova')){
      this.pdfObj.getBase64(async (data)=>{
        try{
          let path = `pdf/myletter_${Date.now()}.pdf`;

          const result = await Filesystem.writeFile({
            path,
            data,
            directory: FileSystemDirectory.Documents,
            recursive:true
            // encoding: FilesystemEncoding.UTF8
          });
          this.fileOpener.open(`${result.uri}`, 'application/pdf');

        }catch (e){
          console.error('Unable to write file', e);
        }
      });

    }else{
      this.pdfObj.download();
    }
  }
}
