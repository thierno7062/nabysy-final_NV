/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';
import { PhotoService } from 'src/app/services/photo.service';
import { environment } from 'src/environments/environment';
import { Platform } from '@ionic/angular';
import { PopupModalService } from 'src/app/services/popup-modal.service';
import { format, parseISO } from 'date-fns';
import { IonDatetime } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-crud-employe',
  templateUrl: './crud-employe.page.html',
  styleUrls: ['./crud-employe.page.scss'],
})
export class CrudEmployePage implements OnInit {
  @ViewChild(IonDatetime) datetime: IonDatetime;
  // @Input() employe: any;
  isUpdate= false;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  nom: '';  prenom: '';  fonction: ''; adresse: ''; telephone: string;  sexe: string;
    idDirection: number;  idService: string;  hideMe: boolean;  message: boolean; hideMe2: boolean;
  message_txt_M: boolean;  message_txt_F: boolean;  url: string ; id: number;  employe: any;  infoEmploye: any;
  direction: any; service: any; nom_Direction: string;nom_Service: string;SITUATION_FAMILLE: string; Salaire: number; SurSalaire: number;
  NbPerformance: number; PART_TRIMF: number;PART_IRPP: number ;IPRES_TAUX_PATRONAL: number;IPRES_TAUX_E: number;
  CSS_TAUX_ALLOCFAMILLE_PATRONAL: number;CSS_TAUX_ACCIDENT_PATRONAL: number;CFCE_TAUX_PATRONAL: number;IPRES_TAUXCOMPLCADRE_E: number;
  IPRES_TAUXCOMPLCADRE_P: number;

  /*
  **DATE TIME
  */
  selectedDate= format(new Date(),'yyyy-MM-dd');
   selectedDate2= format(new Date(),'yyyy-MM-dd');
  //  modes = ['date', 'month', 'month-year','year'];
   selectedMode= 'date';
   showPicker = false;
   dateValue= format(new Date(),'yyyy-MM-dd');
   formattedString= format(new Date(),'yyyy-MM-dd');
   formattedString2= format(new Date(),'yyyy-MM-dd');
  userDetails: any;

  //  registerForm: RegisterPageForm;

  constructor(private modalctrl: ModalController,private route: ActivatedRoute,private loadingService: LoadingService,
    private http: HttpClient, public photoService: PhotoService, private formBuilder: FormBuilder,private platform: Platform,
    private toastctrl: ToastController,private popupModalService: PopupModalService,private router: Router) {
      this.refreshEmploye();
      this.loadDirection();
      this.loadService();
      // console.log(this.employe.IdService);
     }

  ngOnInit() {
    if (this.employe.ID>0){
      this.isUpdate = true;
      this.nom=this.employe.Nom; this.prenom= this.employe.Prenom; this.fonction= this.employe.Fonction;
      this.adresse= this.employe.Adresse; this.telephone= this.employe.Tel; this.sexe= this.employe.Sexe;
      this.idDirection= this.employe.idDirection;this.direction= this.employe.Direction; this.service= this.employe.Service;
      this.selectedDate=this.employe.DATENAIS;this.formattedString=this.employe.DATENAIS;this.SITUATION_FAMILLE=this.employe.SITUATION_FAMILLE;
      this.selectedDate2=this.employe.DateEmbauche;this.formattedString2=this.employe.DateEmbauche;
      this.Salaire=this.employe.Salaire;this.SurSalaire=this.employe.SurSalaire;this.NbPerformance=this.employe.NbPerformance;
      this.PART_TRIMF=this.employe.PART_TRIMF;this.PART_IRPP=this.employe.PART_IRPP;
      this.IPRES_TAUX_PATRONAL=this.employe.IPRES_TAUX_PATRONAL;
      this.IPRES_TAUX_E=this.employe.IPRES_TAUX_E;this.CSS_TAUX_ALLOCFAMILLE_PATRONAL=this.employe.CSS_TAUX_ALLOCFAMILLE_PATRONAL;
      this.CSS_TAUX_ACCIDENT_PATRONAL=this.employe.CSS_TAUX_ACCIDENT_PATRONAL;this.CFCE_TAUX_PATRONAL=this.employe.CFCE_TAUX_PATRONAL;
      this.IPRES_TAUXCOMPLCADRE_E=this.employe.IPRES_TAUXCOMPLCADRE_E;this.IPRES_TAUXCOMPLCADRE_P=this.employe.IPRES_TAUXCOMPLCADRE_P;
      if(this.employe.IdDirection>0 ){
        this.hideMe = true;
      }else if(this.employe.IdService>0){
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
    }else{
      this.SITUATION_FAMILLE=this.employe.SITUATION_FAMILLE; this.Salaire=0;this.SurSalaire=0;this.PART_TRIMF=0;this.PART_IRPP=0;
      this.IPRES_TAUX_PATRONAL=0;this.IPRES_TAUX_E=0;this.CSS_TAUX_ALLOCFAMILLE_PATRONAL=0; this.CSS_TAUX_ACCIDENT_PATRONAL=0;
      this.CFCE_TAUX_PATRONAL=0;this.IPRES_TAUXCOMPLCADRE_E=0;this.IPRES_TAUXCOMPLCADRE_P=0;this.sexe='F';
      this.SITUATION_FAMILLE='Célibataire';this.telephone='+221';
    }
  this.createForm();
  }
  onSubmit(){
    if(this.nom===''){
      this.presentToast('Veillez mettre le nom SVP!!!!');
    }else if(this.prenom===''){
      this.presentToast('Veillez mettre votre prénom SVP!!!!!!');
    }else if(this.adresse===''){
      this.presentToast('Veillez mettre l\'adresse SVP!!!!');
    }else if (this.telephone===''){
      this.presentToast('Veillez mettre le numéro SVP!!!!');
    }else{
      return new Promise (resolve =>{
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        // ----------------------
        let TxId='';
        if (this.employe.ID>0){
          TxId='&IdEmploye='+this.employe.ID ;
        }

      /*   let TxService='';
        if (this.service){
          TxService='&IdService='+this.idService;
        } */
        const apiUrl=environment.endPoint+'employe_action.php?Action=SAVE_EMPLOYE'+TxId+'&Nom='+this.nom+'&Prenom='+this.prenom+
        '&Fonction='+this.fonction+'&Sexe='+this.sexe+'&Adresse='+this.adresse+'&Tel='+this.telephone+'&DATENAIS='+ this.selectedDate+
        '&DateEmbauche='+this.selectedDate2+'&Salaire='+this.Salaire+'&SurSalaire='+this.SurSalaire+'&PART_TRIMF='+this.PART_TRIMF+
        '&PART_IRPP='+ this.PART_IRPP+'&IPRES_TAUX_PATRONAL='+this.IPRES_TAUX_PATRONAL+'&IPRES_TAUX_E='+this.IPRES_TAUX_E+
        '&CSS_TAUX_ALLOCFAMILLE_PATRONAL='+this.CSS_TAUX_ALLOCFAMILLE_PATRONAL+'&CSS_TAUX_ACCIDENT_PATRONAL='+this.CSS_TAUX_ACCIDENT_PATRONAL+
        '&CFCE_TAUX_PATRONAL='+this.CFCE_TAUX_PATRONAL+'&IPRES_TAUXCOMPLCADRE_E='+this.IPRES_TAUXCOMPLCADRE_E+
        '&IPRES_TAUXCOMPLCADRE_P='+this.IPRES_TAUXCOMPLCADRE_P+'&SITUATION_FAMILLE='+this.SITUATION_FAMILLE+'&Token='+environment.tokenUser;
        // ---------------
        console.log(apiUrl);
        this.http.get(apiUrl).subscribe(async data =>{
          console.log(data);
           if(data['OK']!== '0'){
            // this.router.navigate(['/personnel']);
            // this.modalctrl.dismiss(data,'create');
            this.loadingService.presentLoading();
          }else{
            this.presentToast('Veillez remplir tous les champs SVP!!!!');
          }

        });
      });
    }
  }
  async presentToast(a){
    const toast = await this.toastctrl.create({
      message:a,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }
  closeModal(){
    // this.modalctrl.dismiss(null, 'closed');
    this.router.navigate(['personnel']);

  }
  refreshEmploye(){
    this.route.queryParams.subscribe(res =>{
      console.log(res);
      this.employe=res;
      if(this.employe){
        this.idDirection=this.employe.IdDirection;
        this.idService=this.employe.IdService;
      }
      console.log(this.idDirection);

    });

  }

  readAPI(url: string){
    return this.http.get(url);

  }

  loadDirection(){
    this.route.queryParams.subscribe(res =>{
      console.log(res);
      this.employe=res;
      console.log(this.employe);
      this.idDirection=this.employe.IdDirection;
      console.log(this.idDirection);
      this.url=environment.endPoint+'direction_action.php?Action=GET_DIRECTION&IdDirection='+this.idDirection+
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
    this.route.queryParams.subscribe(res =>{
      console.log(res);
      this.employe=res;
      console.log(this.employe.IdService);
      this.idService=this.employe.IdService;
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
    });
  }
  doRefresh(event){
    this.refreshEmploye();
    this.loadDirection();
    this.loadService();
    event.target.complete();
  }

   /**
    * Prend une Photo et la Stock dans la Gallerie
    */
    async addPhotoToGallery(employeInfos: any) {
      await this.photoService.addNewToGallery(employeInfos.ID);
      this.photoService.transfertFile(employeInfos, this.photoService.photo.photoRawData);
    }
   /**
    * Show picture
    */
    showPicture(userDetail: any){
      this.popupModalService.presentModalPhoto(userDetail);
     }

    //  Date time
    dateChanged(value){
      this.dateValue= value;
      this.formattedString= format(parseISO(value),  'yyyy-MM-dd');
      this.showPicker= false;
      this.selectedDate=format(parseISO(value),'yyyy-MM-dd');
      }
      dateChangedFin(value){
       this.dateValue= value;
      this.formattedString2= format(parseISO(value),  'yyyy-MM-dd');
      this.showPicker= false;
      this.selectedDate2=format(parseISO(value),'yyyy-MM-dd');
      }
      close(){
        this.datetime.cancel(true);
      }
      select(){
        this.datetime.confirm(true);

      }

      private createForm(){
        // this.registerForm= new RegisterPageForm(this.formBuilder);
      }
}
