/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';
import { environment } from 'src/environments/environment';
import { CrudEmployePage } from '../crud-employe/crud-employe.page';

@Component({
  selector: 'app-crud-affectation',
  templateUrl: './crud-affectation.page.html',
  styleUrls: ['./crud-affectation.page.scss'],
})
export class CrudAffectationPage implements OnInit {
  @Input() infoService: any;
  affectation: any;
  listeEmploye: any;
  url: string ;
  searchTerm: string;

  resultsCount = 10;
  idDirection: 0;
  idService: 0;

  // data= [];
  data: any;
  bulkEdit= false;
  edit: any[];

  apiUrl: string;


  sortDirection= 0;
  sortKey= null;
  Employeaffecte: any;

  constructor(private http: HttpClient,private modalctrl: ModalController,private router: Router,private loadingService: LoadingService,
    private route: ActivatedRoute,
    private toastctrl: ToastController) {
      this.loadData();
    }

  ngOnInit() {
  }

  loadData(){
    this.route.queryParams.subscribe(res =>{
      this.infoService=res ;
      //console.log(this.infoService);
      if (this.infoService){
        if(this.infoService.IdDirection){

          this.idDirection= this.infoService.IdDirection;
          this.idService= this.infoService.ID;
        }else{
          this.idDirection= this.infoService.ID;
          console.log(this.idDirection);
        }
        console.log(this.infoService);
      }
    });
    this.loadingService.presentLoading();
      this.http.get(environment.endPoint+'employe_action.php?Action=GET_EMPLOYE&Token='+environment.tokenUser).subscribe(res => {
      this.listeEmploye = res;
      console.log('listeEmploye =',this.listeEmploye);
      this.data=res ;
      this.sort();
    });
  }
  sortBy(key){
    this.sortKey= key;
    this.sortDirection++;
  }
  sort(){
    if (this.sortDirection === 1){
      this.data = this.data.sort((a, b) =>{
        console.log('a: ', a);
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        return valA.localeCompare(valB);
      });
    }else if (this.sortDirection === 2){
      this.data = this.data.sort((a, b) =>{
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        return valB.localeCompare(valA);
      });
    }else{
      this.sortDirection= 0;
      this.sortKey= null;
    }

  }
  toggleBulkEdit(){
    this.bulkEdit = !this.bulkEdit;
    this.edit= [];
    console.log('listeEmploye =',this.listeEmploye);
  }
  /* bulkAffect(){
    console.log('this.edit: ', this.edit);
    const toAffect = Object.keys(this.edit);
    console.log(toAffect);
    const reallyAffect = toAffect.filter(index => this.edit[index]).map(Key => +Key);
    while(reallyAffect.length){
      this.data.splice(reallyAffect.pop(), 1);
    }
    this.toggleBulkEdit();
  }*/



  affectaTion(){
    console.log('Objet en cour =',this);
      console.log('listeEmploye =',this.listeEmploye);
      // const Lst=this.listeEmploye;
      const headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json' );
      // ----------------------
        for (const [key, value] of Object.entries(this.edit)) {
          const employe=this.listeEmploye[key];
          this.affecterUnePersonne(employe.ID);

        }
        this.modalctrl.dismiss(this.data,'create');
      return false;
  }

  affecterUnePersonne(idPersonne,afficherTost=true){
    console.log(this.idDirection);
    console.log(this.idService);


    if (this.idService){
       this.apiUrl=environment.endPoint+'employe_action.php?Action=AFFECTER_EMPLOYE&IdEmploye='+
      idPersonne+'&IdService='+this.idService+'&Token='+environment.tokenUser;
    }else{
      this.apiUrl=environment.endPoint+
    'employe_action.php?Action=AFFECTER_EMPLOYE&IdEmploye='+
    idPersonne+'&IdDirection='+this.idDirection+'&IdService=0'+'&Token='+
    environment.tokenUser;
    }

    // this.url=environment.endPoint+'service_action.php?Action=GET_SERVICE&IdDirection='+this.direction.ID;
      console.log(this.apiUrl);
      this.readAPI(this.apiUrl)
      .subscribe((reponseApi) =>{
        console.log(reponseApi);
        console.log(reponseApi['OK']);//Extra
        console.log(reponseApi['Extra']);//Extra
        let txToast='Employé(es) affecté correctement ! -- '+idPersonne+' -- '+reponseApi['Extra'];
        this.loadData();
        if(reponseApi['OK']!== '0'){
          this.readAPI(environment.endPoint+'employe_action.php?Action=GET_EMPLOYE&IdEmploye='+idPersonne+'&Token='+environment.tokenUser)
          .subscribe((listes) =>{
            this.Employeaffecte=listes ;
            console.log(this.Employeaffecte);
          });
          console.log('Affectation IdEmploye '+idPersonne+'...OK');
          if (afficherTost){
            this.presentToast(txToast);
          }
          return true;
        }else{
          txToast='Erreur d\'affectation : '+reponseApi['TxErreur'] ;
          console.error(txToast);
          if (afficherTost){
            this.presentToast(txToast);
          }
          return false ;
        }
      });
}  async presentToast(a){
    const toast = await this.toastctrl.create({
      message:a,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

  readAPI(url: string){
    console.log(url);
    return this.http.get(url);
  }
  removeRow(index){
    this.data.splice(index, 1);
  }
  editRow(employe: any){
    console.log(employe);
    this.modalctrl.create({
      component: CrudEmployePage,
      componentProps:{ employe }
    })
    .then(modal => modal.present());
  }

  closeModal(){
    this.modalctrl.dismiss(null, 'closed');

  }
}
