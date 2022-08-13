/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-trailing-spaces */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { PopupModalService } from 'src/app/services/popup-modal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail-absence',
  templateUrl: './detail-absence.page.html',
  styleUrls: ['./detail-absence.page.scss'],
})
export class DetailAbsencePage implements OnInit {
  absence: any;
  userDetails: any;
  idEmploye: number;
  url: string;
  employe: any;
  nom: ''; prenom: ''; fonction: ''; adresse: ''; telephone: ''; idDirection: number; idService: number; photo: '';
  direction: any; service: any; nomdirection: ''; nomservice: '';
  nbPerformance: number; nom_Direction: ''; nom_Service: '';
  sexe: string;
  hideMe: boolean;  message: boolean; hideMe2: boolean; message_txt_M: boolean;  message_txt_F: boolean;

  constructor(private popupModalService: PopupModalService,private navParams: NavParams,private http: HttpClient,
    private router: Router) {
    this.loadEmploye();
    
    
  }

  ngOnInit() {
    this.absence= this.navParams.get('data');
    console.log(this.absence);
   

  }


  closeModal(){
    this.popupModalService.dismiss();
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
        this.idDirection=this.employe['0'].IdDirection;
        this.idService=this.employe['0'].IdService;
        this.photo=this.employe['0'].PHOTO_URL;
        this.nbPerformance=this.employe['0'].NbPerformance;
        this.sexe=this.employe['0'].Sexe;
        // Load Direction
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
        // Load Service
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

        // ************
        if(this.idDirection>0 ){
          this.hideMe = true;
        }else if(this.idService>0){
          this.hideMe2 = true;
        }
        else {
          this.hideMe = false;
          this.message= true;
          if(this.sexe=== 'M' || this.sexe=== 'm' ){
            this.message_txt_M= true;
    
          }else if(this.sexe=== 'F' || this.sexe=== 'f'){
            this.message_txt_F= true;
          }
        }
        if(this.sexe=== 'M' || this.sexe=== 'm' ){
          this.sexe= 'M';
    
        }else if(this.sexe=== 'F' || this.sexe=== 'f'){
          this.sexe= 'F';
        }
        
      });

  }
  readAPI(url: string){
    return this.http.get(url);
  }
  loadDirection(){
   /*  this.userDetails= this.navParams.get('data');
    this.idDirection=this.userDetails.IdDirection; */
      
  }
}
