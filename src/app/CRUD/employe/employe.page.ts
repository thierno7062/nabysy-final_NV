/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IonSlides, NavParams } from '@ionic/angular';
import { PopupModalService } from 'src/app/services/popup-modal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.page.html',
  styleUrls: ['./employe.page.scss'],
})
export class EmployePage implements OnInit {
  isUpdate= false;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  nom: string;
  prenom: string;
  fonction: string;
  adresse: string;
  telephone: string;
  sexe: string;
  idDirection: string;
  idService: string;
  direction: string;
  service: string;
  hideMe: boolean;
  message: boolean;
  message_txt_M: boolean;
  message_txt_F: boolean;
  message_txt: boolean;
  userDetails: any;
  employe: any;
  url: string ;
  data={
    id:'',
    nom:'',
    adresse:'',
    telephone:'',
  };
  id: number;
  infoEmploye: any;

  segmentList: Array<string> = ['Segment 1', 'Segment 2', 'Segment 3'];
  selectedSegment: string;
  slideList: Array<string> = [
    'Slide Segment 1',
    'Slide Segment 2',
    'Slide Segment 3',
  ];

  @ViewChild('slide') slide: IonSlides;
  constructor( private router: Router,private popupModalService: PopupModalService, private navParams: NavParams,
    private route: ActivatedRoute,private http: HttpClient) {
    this.selectedSegment = this.segmentList[0];

    //Information employe
    this.refreshEmploye();

  }

  ngOnInit() {
    // this.userDetails= this.navParams.get('data');
    if (this.infoEmploye){
      this.nom=this.infoEmploye.Nom;
      this.prenom= this.infoEmploye.Prenom;
      this.fonction= this.infoEmploye.Fonction;
      this.adresse= this.infoEmploye.Adresse;
      this.telephone= this.infoEmploye.Tel;
      this.sexe= this.infoEmploye.Sexe;
      this.idDirection= this.infoEmploye.idDirection;
      this.direction= this.infoEmploye.Direction;
      this.service= this.infoEmploye.Service;
      this.isUpdate = true;
      if(this.infoEmploye.IdDirection>0){
        this.hideMe = !this.hideMe;
      }else {
        this.hideMe = this.hideMe;
        this.message= !this.message;
        if(this.sexe=== 'M' || this.sexe=== 'm' ){
          this.message_txt_M= !this.message_txt_M;
        }else if(this.sexe=== 'F' || this.sexe=== 'f'){
          this.message_txt_F= !this.message_txt_F;
        }
        else{
          this.message_txt= !this.message_txt;
        }
      }
    }
  }

  _segmentSelected(item: string, index: number) {
    this.slide.slideTo(index);
  }

  _ionSlideDidChange(event: any) {
    this.slide.getActiveIndex().then((index) => {
      this.selectedSegment = this.segmentList[index];
    });
  }
  refreshEmploye(){
    this.route.queryParams.subscribe(res =>{
      console.log(res);
      this.employe=res;
      //console.log(this.direction);
      this.id=this.employe.ID;
      this.url=environment.endPoint+'employe_action.php?Action=GET_EMPLOYE&IdEmploye='+this.id+'&Token='+environment.tokenUser;

      this.readAPI(this.url)
      .subscribe((data) =>{
        this.infoEmploye=data ;
        // this.products=data;
        console.log(data);
        console.log(data['0']);
        this.data.id=data['"Id"'];
        this.data.nom=data['"Nom"'];
        this.data.adresse=data['"Adresse"'];
        this.data.telephone=data['"Tel"'];
      });
    });
  }

  readAPI(url: string){
    return this.http.get(url);

  }
  onSubmit(){

  }
}
