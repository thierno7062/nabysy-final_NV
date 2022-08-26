/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
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

  page = 0;
  resultsCount = 10;
  totalPages = 10;
  idDirection: 0;
  idService: 0;

  // data= [];
  data: any;
  bulkEdit= false;
  edit: any[];


  sortDirection= 0;
  sortKey= null;

  constructor(private http: HttpClient,private modalctrl: ModalController,private router: Router,private route: ActivatedRoute,
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
        this.idDirection= this.infoService.IdDirection;
        this.idService= this.infoService.ID;
        //console.log(this.infoService);
      }
    });
    // this.http.get(`https://randomuser.me/api/?page=${this.page}&results=${this.resultsCount}`).subscribe(res => {
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
    let apiUrl=environment.endPoint+
    'employe_action.php?Action=AFFECTER_EMPLOYE&IdEmploye='+
    idPersonne+'&IdDirection='+this.idDirection+'&Token='+
    environment.tokenUser;
    if (this.idService > 0){
      apiUrl=environment.endPoint+'employe_action.php?Action=AFFECTER_EMPLOYE&IdEmploye='+
      idPersonne+'&IdService='+this.idService+'&Token='+environment.tokenUser;
    }

    // this.url=environment.endPoint+'service_action.php?Action=GET_SERVICE&IdDirection='+this.direction.ID;
      console.log(apiUrl);
      this.readAPI(apiUrl)
      .subscribe((reponseApi) =>{
        console.log(reponseApi);
        console.log(reponseApi['OK']);
        let txToast='Employé(es) affecté correctement !' ;
        if(reponseApi['OK']!== '0'){
          console.log('Affectation IdEmploye '+idPersonne+' ...OK');
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
  nextPage(){
    this.page++;
    this.loadData();
  }

  prevPage(){
    this.page--;
    this.loadData();
  }
  goFirst(){
    this.page= 0;
    this.loadData();
  }
  goLast(){
    this.page = this.totalPages - 1;
    this.loadData();
  }
  closeModal(){
    this.modalctrl.dismiss(null, 'closed');

  }
}
