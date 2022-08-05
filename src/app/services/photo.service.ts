/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

/* Transfert de Fichier */
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
//import { File } from '@ionic-native/file';
import { UploadfileService } from './uploadfile.service';
import { UploadResult } from './uploadfile.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})



export class PhotoService {
  public photo: PhotoPersonnel;
  public idEmploye: any;
  public infoUpload: UploadResult;
	private uploadService: UploadfileService;

  constructor(uploadService: UploadfileService) {
    this.infoUpload=new UploadResult();
    this.uploadService=uploadService;
  }

  public async addNewToGallery(idEmploye: any) {
    // Take a photo
    this.photo=new PhotoPersonnel();
    this.photo.idEmploye=idEmploye ;
    this.photo.filepath='' ;
    this.photo.webviewPath='';
    this.photo.photoRawData=null ;

    this.idEmploye=idEmploye;
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      allowEditing: true,
      quality: 100
    });
    //console.log(capturedPhoto);
    //this.photo.filepath='Soon';
    this.photo.webviewPath=capturedPhoto.webPath;
    const blob = await fetch(capturedPhoto.webPath).then(r => r.blob());
    this.photo.photoRawData=blob ;
    //console.log(this.photo);
    //console.log('On envoie la photo après au Serveur ...');
  }

  /**
   * Function de Transfert de Photo d'un personnel vers le Serveur
   * param int idEmploye : Id de l émployé
   */
  public async transfertFile(employeInfos: any, fichier: File): Promise<any>{
    /* const options: FileUploadOptions = {
      fileKey: 'Fichier',
      fileName: 'Photos.jpg'
    }; */
    const photoUrl=environment.endPoint+'employe_action.php?Action=SAVE_PHOTO&IdEmploye='+employeInfos.ID+'&CHAMPFICHIER=Fichier'+
      '&Token='+environment.tokenUser;
    try{
      await this.uploadService.uploadFile(fichier,photoUrl);
      this.infoUpload=this.uploadService.InfoUpload;
      employeInfos.PHOTO_URL=this.infoUpload.reponse.Extra ;
      //console.log(this.infoUpload);
    } catch ( error ) {
      console.log( 'Erreur Envoie du Fichier.' );
      console.log( error );
    }
    return this.infoUpload ;
  }

}

export class PhotoPersonnel {
  idEmploye: any ;
  filepath: any;
  webviewPath: any;
  public photoRawData: any;
}



