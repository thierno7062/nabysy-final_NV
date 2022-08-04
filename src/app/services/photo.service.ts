/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

/* Transfert de Fichier */
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photo: PhotoPersonnel;
  public idEmploye: any;
  constructor(private transfer: FileTransfer, private file: File) { }
    public fileTransfer: FileTransferObject = this.transfer.create();

  public async addNewToGallery(idEmploye: any) {
    // Take a photo
    this.photo=new PhotoPersonnel();
    this.photo.idEmploye=idEmploye ;
    this.photo.filepath='' ;
    this.photo.webviewPath='';

    this.idEmploye=idEmploye;
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    //console.log(capturedPhoto);
    //this.photo.filepath='Soon';
    this.photo.webviewPath=capturedPhoto.webPath;
    console.log(this.photo);
    console.log('On envoie la photo au Serveur Ici...');
  }

  /**
   * Function de Transfert de Photo d'un personnel vers le Serveur
   * param int idEmploye : Id de l émployé
   */
  public async transfertFile(idEmploye: any){
    const options: FileUploadOptions = {
      fileKey: 'Fichier',
      fileName: 'Photos.jpg'
    };
    const photoUrl=environment.endPoint+'employe_action.php?Action=SAVE_PHOTO&IdEmploye='+idEmploye+'&CHAMPFICHIER=Fichier'+
      '&Token='+environment.tokenUser;
    this.fileTransfer.upload(this.photo.webviewPath,photoUrl,options).then(
      (data) => {
        // success
        console.log(data);
      }, (err) => {
        // error
        console.log(err);
      })
    ;

  }

}

export class PhotoPersonnel {
  idEmploye: any ;
  filepath: any;
  webviewPath: any;
}

