/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { PopupModalService } from 'src/app/services/popup-modal.service';

/* Prise en charge des Photos */
import { PhotoService } from 'src/app/services/photo.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from 'src/app/services/loading.service';
/* ---------------------------------------------------------------------- */


@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.page.html',
  styleUrls: ['./contrat.page.scss'],
})
export class ContratPage implements OnInit {

   userDetails: any;
  direction: any;service: any; nom_Direction: ''; nom_Service: '';
  url: string; sexeString: string; situationString: ''; sexe: any;
  hideMe2: boolean;hideMe: boolean;message: boolean;
  message_txt_M: boolean;  message_txt_F: boolean;DateFin: ''; DateDebut: '';
  userContrat: any; usercontrat2: any; TypeContrat: '';TitreContrat: '';DateEmbauche: '';
  ANCIENNETE: '';DIRECTION: '';SERVICE: '';
  listeFichiers: any;
  nbElement: any;
  fichier: any;

  constructor(private router: Router,private popupModalService: PopupModalService,
    private route: ActivatedRoute,private http: HttpClient,private menu: MenuController,
    private loadingService: LoadingService,private toastctrl: ToastController)
     {
      this.loadDirection();
    this.loadService();
    this.getfichier();
    }

  ngOnInit() {
    this.loadEmploye();

  }
  closeModal(){
    this.popupModalService.dismiss();
  }
  loadEmploye(){
    this.loadingService.presentLoading();
      // info personnel
      this.route.queryParams.subscribe(res =>{
        console.log(res);
        this.userDetails=res;

        console.log(this.userDetails);
        this.sexe= this.userDetails.Sexe;
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
      console.log(this.userDetails.ID);

      this.readAPI(environment.endPoint+'employe_action.php?Action=GET_CONTRAT_EMPLOYE&IDEMPLOYE='+this.userDetails.ID+'&Token='+environment.tokenUser)
      .subscribe((listes) =>{
        this.userContrat=listes ;
        console.log(this.userContrat);
        this.usercontrat2=this.userContrat['0'];
        this.DateFin=this.usercontrat2.DateFin;  this.DateDebut=this.usercontrat2.DateDebut;
        this.TypeContrat=this.usercontrat2.TypeContrat;  this.TitreContrat=this.usercontrat2.TitreContrat;
        this.DateEmbauche=this.usercontrat2.DateEmbauche; this.ANCIENNETE=this.usercontrat2.ANCIENNETE;
        this.DIRECTION=this.usercontrat2.DIRECTION;
        this.SERVICE=this.usercontrat2.SERVICE;
      });
      });
  }

  loadDirection(){
    // this.userDetailsGlobal= this.navParams.get('data');
    this.route.queryParams.subscribe(res =>{
      console.log(res);
      this.userDetails=res;
      // this.idService=this.employe.IdService;
      this.url=environment.endPoint+'direction_action.php?Action=GET_DIRECTION&IdDirection='+this.userDetails.IdDirection+
      '&Token='+environment.tokenUser;
      this.readAPI(this.url)
      .subscribe((data) =>{
        this.direction=data ;
        // this.products=data;
        console.log(data);
        console.log(data['0']);
        this.nom_Direction=this.direction['0'].Nom;
      });
    });
  }

  loadService(){
    // this.userDetailsGlobal= this.navParams.get('data');
    this.route.queryParams.subscribe(res =>{
      console.log(res);
      this.userDetails=res;
      // this.idService=this.employe.IdService;
      this.url=environment.endPoint+'service_action.php?Action=GET_SERVICE&IdService='+this.userDetails.IdService+
      '&Token='+environment.tokenUser;
      this.readAPI(this.url)
      .subscribe((data) =>{
        this.service=data ;
        // this.products=data;
        console.log(data);
        console.log(data['0']);
        this.nom_Service=this.service['0'].Nom;
      });
    });
  }

  readAPI(url: string){
    return this.http.get(url);
  }
  _openSideNav(){
    this.menu.enable(true,'menu-content');
    this.menu.open('menu-content');
  }
  getfichier(){
    this.route.queryParams.subscribe(res =>{
      console.log(res);
      this.userDetails=res;
    this.readAPI(environment.endPoint+'rs_action.php?Action=LISTE_FICHIER_CONTRAT&IDEMPLOYE='+this.userDetails.ID+'&Token='+environment.tokenUser)
    .subscribe((listes) =>{
      this.listeFichiers=listes ;
      console.log(this.listeFichiers);
      this.nbElement=this.listeFichiers.length  ;

    });
  });
  }
  selectedFile(event){
    this.fichier= event.target.files[0];
  }

  joindreFichier(){
    const formData= new FormData();
    formData.append('fichier', this.fichier);
    //console.log(this.fichier);
    this.http.post(environment.endPoint+'rs_action.php?Action=LISTE_FICHIER_CONTRAT&CHAMPFICHIER=fichier&IDEMPLOYE='+this.userDetails.ID+'&NOMFICHIER='+
    this.fichier.name+'&Token='+environment.tokenUser,formData).
    subscribe((response: any)=>{
      console.log(response);
      this.presentToast('Fichier envoyé correctement.');
      /**
       * //On devrait alimenter une liste des fichiers joint et permettre d'en ajouter de nouveau
       */
      this.loadEmploye();
      this.getfichier();
      formData.append('fichier', '');

      //console.log(this.fichier);
      //console.log(formData);
    });
  }
  async presentToast(a){
    const toast = await this.toastctrl.create({
      message:a,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

}
