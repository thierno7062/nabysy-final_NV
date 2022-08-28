/* eslint-disable no-trailing-spaces */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { PopupModalService } from 'src/app/services/popup-modal.service';

/* Prise en charge des Photos */
import { PhotoService } from 'src/app/services/photo.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
/* --------------------------------------------------------------------- */




@Component({
  selector: 'app-print-bulletin2',
  templateUrl: './print-bulletin2.page.html',
  styleUrls: ['./print-bulletin2.page.scss'],
})
export class PrintBulletin2Page implements OnInit {
  userDetails: any;  idDirection: number;  idService: number;
  direction: any;  service: any;  nom_Direction: '';  nom_Service: '';
  url: string;  sexeString: string;
  situationString: '';  sexe: any;
  hideMe2: boolean;  hideMe: boolean;message: boolean;
  message_txt_M: boolean;  message_txt_F: boolean;
  idEmploye: number;  employe: any;  nom: '';  prenom: '';  fonction: '';  adresse: '';  telephone: '';
  photo: '';  nbPerformance: '';
  Salaire: ''; SurSalaire: '';

  // eslint-disable-next-line max-len

  constructor( private router: Router,private popupModalService: PopupModalService, private navParams: NavParams,
    public photoService: PhotoService,private route: ActivatedRoute,private http: HttpClient,private modalCtrl: ModalController) {
      this.loadDirection();
      this.loadService();
      this.loadEmploye();

  }

  ngOnInit() {
    this.userDetails= this.navParams.get('data');
    console.log(this.userDetails);
    this.sexe= this.userDetails.SexeEmploye;
    if(this.sexe==='M'||this.sexe==='m' ){
      this.sexeString='Masculin';
    }else if(this.sexe==='F'||this.sexe==='f' ){
      this.sexeString='Féminin';
    }
    if(this.userDetails.IdDirection>0 ){
      this.hideMe = true;
    }
    if(this.userDetails.IdService>0){
      this.hideMe2 = true;
    }

    if (this.hideMe===false && this.hideMe2===false) {
      this.hideMe = false;
      this.message= true;
      if(this.sexe=== 'M' || this.sexe=== 'm' ){
        this.message_txt_M= true;

      }else if(this.sexe=== 'F' || this.sexe=== 'f'){
        this.message_txt_F= true;
      }
    }

  }
  closeModal(){
    this.popupModalService.dismiss();
  }
  CallUserdetails(){
    this.router.navigate(['/crud-employe'],{
      queryParams:this.userDetails
    });
    this.popupModalService.dismiss();
    // const user = data['data'];

  }
  /**
   * Prend une Photo et la Stock dans la Gallerie
   */
   async addPhotoToGallery(employeInfos: any) {
    await this.photoService.addNewToGallery(employeInfos.ID);
    this.photoService.transfertFile(employeInfos, this.photoService.photo.photoRawData);
  }

  loadDirection(){
    this.userDetails= this.navParams.get('data');
    this.idDirection=this.userDetails.IdDirection;
      console.log('idDirection: '+this.idDirection);
      this.url=environment.endPoint+'direction_action.php?Action=GET_DIRECTION&IdDirection='+this.idDirection+
      '&Token='+environment.tokenUser;
      this.readAPI(this.url)
      .subscribe((data) =>{
        this.direction=data ;
        // this.products=data;
        console.log(data);
        console.log(data['0']);
        this.nom_Direction=this.direction['0'].Nom;
        console.log(this.nom_Direction);

      });
  }

  loadService(){
    this.userDetails= this.navParams.get('data');
    this.idService=this.userDetails.IdService;
      console.log('idService: '+this.idService);
      this.url=environment.endPoint+'service_action.php?Action=GET_SERVICE&IdService='+this.idService+
      '&Token='+environment.tokenUser;
      this.readAPI(this.url)
      .subscribe((data) =>{
        this.service=data ;
        // this.products=data;
        console.log(data);
        console.log(data['0']);
        this.nom_Service=this.service['0'].Nom;
      });
  }

  readAPI(url: string){
    return this.http.get(url);

  }
  loadEmploye(){
    this.userDetails= this.navParams.get('data');
    this.idEmploye=this.userDetails.IdEmploye;
      console.log('idEmploye: '+this.idEmploye);
      this.url=environment.endPoint+'employe_action.php?Action=GET_EMPLOYE&IdEmploye='+this.idEmploye+
      '&Token='+environment.tokenUser;
      this.readAPI(this.url)
      .subscribe((data) =>{
        this.employe=data ;
        // this.products=data;
        console.log(data);
        console.log(data['0']);
        this.nom=this.employe['0'].Nom;
        this.prenom=this.employe['0'].Prenom;
        this.fonction=this.employe['0'].Fonction;
        this.adresse=this.employe['0'].Adresse;
        this.telephone=this.employe['0'].Tel;
        this.photo=this.employe['0'].PHOTO_URL;
        this.nbPerformance=this.employe['0'].NbPerformance;
        this.Salaire=this.employe['0'].Salaire;
        this.SurSalaire=this.employe['0'].SurSalaire;
      });

  }
}
