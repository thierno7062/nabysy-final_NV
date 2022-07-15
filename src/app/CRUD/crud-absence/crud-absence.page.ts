/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { PopupModalService } from 'src/app/services/popup-modal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crud-absence',
  templateUrl: './crud-absence.page.html',
  styleUrls: ['./crud-absence.page.scss'],
})
export class CrudAbsencePage implements OnInit {
  @Input() absence: any;
  listeEmploye: any;
  isUpdate= false;
  bulkEdit= false;
  isPaid: boolean;
  data: [];
  choix: boolean;
  idEmploye: ''; utilisateur: ''; paye: any;
  nom: ''; pourtous: any; dateEnregistrement: '';
  prenom: ''; heureEnregistrement: '';
  dateDebut: ''; heureDebut: '';
  dateFin: ''; heureFin: '';
  motif: ''; annee: '';

  nomEmp: ''; prenomEmp: ''; fonctionEmp: '';affectation: ''; telephone: '';
  bulkIndividuel= true;
  selectedValue: ''[]=[];
  page = 0;
  resultsCount = 10;
  totalPages = 10;
  sortEmploye= 0;
  sortKey= null;
  edit: any[];

  constructor(private modalctrl: ModalController,private popupModalService: PopupModalService,
    private http: HttpClient,private route: ActivatedRoute,
    private toastctrl: ToastController) {
        this.loadEmploye();

     }

  ngOnInit() {
    if (this.absence.ID > 0){
          this.nom=this.absence.Nom;
          this.prenom= this.absence.Prenom;
          this.dateDebut= this.absence.DateDebut;
          this.dateFin= this.absence.DateFin;
          this.motif= this.absence.TextMotif;
          this.idEmploye=  this.absence.IdEmploye;
          this.dateEnregistrement= this.absence.DateEnreg;
          this.heureEnregistrement= this.absence.HeureEnreg;
          this.heureDebut= this.absence.HeureDebut;
          this.heureFin= this.absence.HeureFin;
          this.annee= this.absence.Annee;
          this.paye= this.absence.IsPaye;
          this.pourtous= this.absence.PourTous;

          this.isUpdate = true;
          this.bulkIndividuel= false;
          if(this.paye > 0){
            this.isPaid= true;

          }else{
            this.isPaid= false;
          }

  }
  }
  loadEmploye(){
    this.route.queryParams.subscribe(res =>{
      this.absence=res ;
      //console.log(this.infoService);
      if (this.absence){
        this.prenom= this.absence.Prenom;
          this.dateDebut= this.absence.DateDebut;
          this.dateFin= this.absence.DateFin;
          this.motif= this.absence.TextMotif;
          this.idEmploye=  this.absence.IdEmploye;
          this.dateEnregistrement= this.absence.DateEnreg;
          this.heureEnregistrement= this.absence.HeureEnreg;
          this.heureDebut= this.absence.HeureDebut;
          this.heureFin= this.absence.HeureFin;
          this.annee= this.absence.Annee;
          this.paye= this.absence.IsPaye;
          this.pourtous= this.absence.PourTous;
      }
    });
      this.http.get(environment.endPoint+'employe_action.php?Action=GET_EMPLOYE&Token='+environment.tokenUser).subscribe(res => {
      this.listeEmploye = res;
      console.log('listeEmploye =',this.listeEmploye);
      // eslint-disable-next-line @typescript-eslint/naming-convention
      this.listeEmploye.forEach(function(employe, index,Lst) {Lst[index].IsChecked=0;});
      this.data= [];
      this.sort();
    });
/*     this.readAPI(environment.endPoint+'employe_action.php?Action=GET_EMPLOYE&Token='+environment.tokenUser)
    .subscribe((listes) =>{
      // console.log(Listes);
      this.listeEmploye=listes ;
      console.log(this.listeEmploye);
      if(this.listeEmploye.ID>0){
        this.nomEmp=this.listeEmploye.Nom;
        this.prenomEmp=this.listeEmploye.Prenom;
        this.fonctionEmp=this.listeEmploye.Fonction;
        this.affectation=this.listeEmploye.LieuxAffectationType;
        this.telephone=this.listeEmploye.Tel;
        }
    }); */
  }
  togglepourTous(){
    this.bulkIndividuel = false;
    console.log('listeEmploye =',this.listeEmploye);
  }
  togglepaspourTous(){
    this.bulkIndividuel = true;
  }

  readAPI(url: string){
    return this.http.get(url);

  }

  onSubmit(){
    if(this.dateDebut===''){
      this.presentToast('Veillez mettre le nom SVP!!!!');
    }else if(this.motif===''){
      this.presentToast('Veillez mettre votre prénom SVP!!!!!!');
    }else{
      return new Promise (() =>{
        console.log('Objet en cour =',this);
        console.log('listeEmploye =',this.listeEmploye);
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );

        this.listeEmploye.forEach((employe)=>{
          if (employe.IsChecked>0){
            this.absenceUnePersonne(employe.ID);
          }
        });
        this.modalctrl.dismiss(this.listeEmploye,'create');
      return false;

        // ---------------
      });
    }
  }
  absenceUnePersonne(idPersonne,afficherTost=false){
    const apiUrl=environment.endPoint+
    'calendrier_action.php?Action=AJOUTER_ABSENCE&IdEmploye='+
    idPersonne+'&DATEDEBUT='+this.dateDebut+'&DATEFIN='+this.dateFin+
    '&PAYE='+this.paye+'&MOTIF='+this.motif+'&POURTOUS='+this.pourtous+
    '&HEUREDEBUT='+this.heureDebut+'&HEUREFIN='+
    this.heureFin+'&Token='+environment.tokenUser;
    if(this.isPaid===true){
      this.paye=1;
    }else{
      this.paye=0;
    }
    if(this.choix===true){
      this.pourtous=0;
    }else{
      this.pourtous=1;
    }
      console.log(apiUrl);
      this.readAPI(apiUrl)
      .subscribe((reponseApi) =>{
        console.log(reponseApi);
        if(reponseApi['"OK"']!== '0'){
          console.log(+this.prenom+' '+this.nom+' absent le '+this.dateDebut+ '...OK');
          if (afficherTost){
      this.presentToast(+this.prenom+' '+this.nom+' absent le '+this.dateDebut+ '...OK');
          }
          return true;
        }else{
          console.log('Ajout absence pour '+this.prenom+' '+this.nom+' ...Erreur');
          return false ;
        }
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
  closeModal(){
    this.modalctrl.dismiss(null, 'closed');

  }
  userdetails(userDetail: any){
    this.popupModalService.presentModal2(userDetail);
  }
  sortBy(key){
    this.sortKey= key;
    this.sortEmploye++;
  }
  sort(){
    if (this.sortEmploye === 1){
      this.listeEmploye = this.listeEmploye.sort((a, b) =>{
        console.log('a: ', a);
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        return valA.localeCompare(valB);
      });
    }else if (this.sortEmploye === 2){
      this.listeEmploye = this.listeEmploye.sort((a, b) =>{
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        return valB.localeCompare(valA);
      });
    }else{
      this.sortEmploye= 0;
      this.sortKey= null;
    }

  }
  nextPage(){
    this.page++;
    this.loadEmploye();
  }

  prevPage(){
    this.page--;
    this.loadEmploye();
  }
  goFirst(){
    this.page= 0;
    this.loadEmploye();
  }
  goLast(){
    this.page = this.totalPages - 1;
    this.loadEmploye();
  }
}
