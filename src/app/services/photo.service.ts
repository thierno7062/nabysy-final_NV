import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import * as internal from 'stream';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photo: PhotoPersonnel;
  public idEmploye: any;
  constructor() { }

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

}

export class PhotoPersonnel {
  idEmploye: any ;
  filepath: any;
  webviewPath: any;
}

