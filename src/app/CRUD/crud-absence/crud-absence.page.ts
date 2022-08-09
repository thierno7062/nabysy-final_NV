/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonDatetime, ModalController, ToastController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { PopupModalService } from 'src/app/services/popup-modal.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-crud-absence',
  templateUrl: './crud-absence.page.html',
  styleUrls: ['./crud-absence.page.scss'],
})
export class CrudAbsencePage implements OnInit {
  @Input() absence: any;
  @ViewChild(IonDatetime) datetime: IonDatetime;
  listeEmploye: any;
  isUpdate= false;
  bulkEdit= false;
  isPaid: boolean;
  data: [];
  choix: boolean;
  idEmploye: ''; utilisateur: ''; paye: any; idAbsence: any;
  nom: ''; pourtous: any=1; dateEnregistrement: '';
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

  choixAbscencePourTous=true;

  // Pick Date
  today: any;
  /* age =0; */
   selectedDate= format(new Date(),'yyyy-MM-dd');
   selectedDate2= format(new Date(),'yyyy-MM-dd');
   selectedTime= format(new Date(),'HH-mm-ss');
   selectedTime2= format(new Date(),'HH-mm-ss');
   modes = ['date', 'month', 'month-year','year'];
   selectedMode= 'date';
   showPicker = false;
   dateValue= format(new Date(),'yyyy-MM-dd')+ 'T09:00:00.000Z';
   formattedString= '';
   formattedString2= '';
   timeString= '';
   timeString2= '';

  constructor(private modalctrl: ModalController,private popupModalService: PopupModalService,
    private http: HttpClient,private route: ActivatedRoute,
    private toastctrl: ToastController) {
        this.loadEmploye();
        this.setToday();
      this.today = new Date().getDate();
      if(this.absence){
        this.paye= this.absence.IsPaye;
        if(this.absence.IsPaye === '0'){

          this.isPaid= false;
        }else{
          this.isPaid= true;
        }
      }

     }

  ngOnInit() {
    this.choixAbscencePourTous=true;
    if (this.absence.ID > 0){
          this.idAbsence=this.absence.ID;
          this.nom=this.absence.Nom;
          this.prenom= this.absence.Prenom;
          this.formattedString= this.absence.DateDebut;
          this.selectedDate= this.absence.DateDebut;
          this.formattedString2= this.absence.DateFin;
          this.selectedDate2= this.absence.DateFin;
          this.motif= this.absence.TextMotif;
          this.idEmploye=  this.absence.IdEmploye;
          this.dateEnregistrement= this.absence.DateEnreg;
          this.heureEnregistrement= this.absence.HeureEnreg;
          this.timeString= this.absence.HeureDebut;
          this.selectedTime= this.absence.HeureDebut;
          this.timeString2= this.absence.HeureFin;
          this.selectedTime2= this.absence.HeureFin;
          this.annee= this.absence.Annee;
          this.paye= this.absence.IsPaye;
          this.pourtous= this.absence.PourTous;
          if (this.pourtous===0){
            this.choixAbscencePourTous=false;
          }
          this.isUpdate = true;
          this.bulkIndividuel= false;
          if(this.paye === '0'){

            this.isPaid= false;
          }else{
            this.isPaid= true;
          }
    }
  }

  loadEmploye(){
    this.route.queryParams.subscribe(res =>{
          this.absence=res ;
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
              if (this.pourtous===0){
                this.choixAbscencePourTous=false;
              }
          }
      });

    this.http.get(environment.endPoint+'employe_action.php?Action=GET_EMPLOYE&Token='+environment.tokenUser).subscribe(res => {
    this.listeEmploye = res;
    this.listeEmploye.forEach(function(employe, index,Lst) {Lst[index].IsChecked=0;});
    this.data= [];
    this.sort();
  });

  }
  togglepourTous(){
    this.bulkIndividuel = false;
    this.choixAbscencePourTous=!this.choixAbscencePourTous;
    console.log('choixAbscencePourTous =',this.choixAbscencePourTous);
  }
  togglepaspourTous(){
    this.bulkIndividuel = !this.bulkIndividuel;
    this.choixAbscencePourTous=!this.choixAbscencePourTous;
    console.log('choixAbscencePourTous =',this.choixAbscencePourTous);
  }

  readAPI(url: string){
    return this.http.get(url);

  }

  onSubmit(){
    if(this.formattedString===''){
      this.presentToast('Veillez indiquer la Date de début SVP!!!!');
    }else if(this.formattedString2===''){
      this.presentToast('Veillez indiquer la date de fin  SVP!!!!!!');
    }else if(this.timeString===''){
      this.presentToast('Veillez indiquer l\'heure de début  SVP!!!!!!');
    }else if(this.timeString2===''){
      this.presentToast('Veillez indiquer l\'heure de fin  SVP!!!!!!');
    }else{
      return new Promise (() =>{
        console.log('Pour tous =',!this.bulkIndividuel);
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        if (this.choixAbscencePourTous){
          this.absencePourTous(true);
        }else{
          this.listeEmploye.forEach((employe)=>{
            if (employe.IsChecked>0){
              console.log(employe);
              this.absenceUnePersonne(employe.ID);
            }
          });
        }
        this.modalctrl.dismiss(this.listeEmploye,'create');
        return false;

        // ---------------
      });
    }
  }
  absenceUnePersonne(idPersonne,afficherTost=false){
    if(this.isPaid===true){
      this.paye= '1';
    }else{
      this.paye= '0';
    }
    if(this.choix===true){
      this.pourtous= '0';
    }else{
      this.pourtous= '1';
    }
    console.log(this.paye);
    console.log(this.pourtous);
    const apiUrl=environment.endPoint+
    'calendrier_action.php?Action=AJOUTER_ABSENCE&IDEMPLOYE='+
    idPersonne+'&DATEDEBUT='+this.selectedDate+'&DATEFIN='+this.selectedDate2+
    '&PAYE='+this.paye+'&MOTIF='+this.motif+'&POURTOUS='+this.pourtous+
    '&HEUREDEBUT='+this.selectedTime+'&HEUREFIN='+
    this.selectedTime2+'&Token='+environment.tokenUser;

      console.log(apiUrl);
      this.readAPI(apiUrl)
      .subscribe((reponseApi) =>{
        console.log(reponseApi);
        if(reponseApi['"OK"']!== '0'){
          console.log('Absence individuelle Ajoutée');
          if (afficherTost){
            this.presentToast('Absence individuelle Ajoutée pout IdEmployé '+idPersonne+ ' : OK');
          }
          return true;
        }else{
          console.log('Ajout absence pour '+this.prenom+' '+this.nom+' ...Erreur');
          return false ;
        }
      });
  }
  updateabsenceUnePersonne(idPersonne,afficherTost=false){
    if(this.isPaid===true){
      this.paye= '1';
    }else{
      this.paye= '0';
    }
    if(this.choix===true){
      this.pourtous= '0';
    }else{
      this.pourtous= '1';
    }
    console.log(this.paye);
    console.log(this.pourtous);
    const apiUrl=environment.endPoint+
    'calendrier_action.php?Action=EDITER_ABSENCE&IDEMPLOYE='+
    idPersonne+'&IDABSENCE='+this.idAbsence+'&DATEDEBUT='+this.selectedDate+'&DATEFIN='+this.selectedDate2+
    '&PAYE='+this.paye+'&MOTIF='+this.motif+'&POURTOUS='+this.pourtous+
    '&HEUREDEBUT='+this.selectedTime+'&HEUREFIN='+
    this.selectedTime2+'&Token='+environment.tokenUser;

      console.log(apiUrl);
      this.readAPI(apiUrl)
      .subscribe((reponseApi) =>{
        console.log(reponseApi);
        if(reponseApi['"OK"']!== '0'){
          console.log('Absence individuelle modifiée');
          if (afficherTost){
            this.presentToast('Absence individuelle modifiée pour IdEmployé '+idPersonne+ ' : OK');
          }
          return true;
        }else{
          console.log('Modification absence pour '+this.prenom+' '+this.nom+' ...Erreur');
          return false ;
        }
      });
  }
  onUpdate(){
    if(this.formattedString===''){
      this.presentToast('Veillez indiquer la Date de début SVP!!!!');
    }else if(this.formattedString2===''){
      this.presentToast('Veillez indiquer la date de fin  SVP!!!!!!');
    }else if(this.timeString===''){
      this.presentToast('Veillez indiquer l\'heure de début  SVP!!!!!!');
    }else if(this.timeString2===''){
      this.presentToast('Veillez indiquer l\'heure de fin  SVP!!!!!!');
    }else{
      return new Promise (() =>{
        console.log('Pour tous =',!this.bulkIndividuel);
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        if (this.choixAbscencePourTous){
          this.absencePourTousUpdate(true);
        }else{
          this.listeEmploye.forEach((employe)=>{
            if (employe.IsChecked>0){
              console.log(employe);
              this.updateabsenceUnePersonne(employe.ID);
            }
          });
        }
        this.modalctrl.dismiss(this.listeEmploye,'create');
        return false;

        // ---------------
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
    this.modalctrl.dismiss(null, 'closed');

  }
  userdetails(userDetail: any){
    this.popupModalService.presentModalEmploye(userDetail);
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

  absencePourTous(afficherTost=false){
    if(this.isPaid===true){
      this.paye= 1;
    }else{
      this.paye= 0;
    }
    if(this.choix===true){
      this.pourtous= 0;
    }else{
      this.pourtous= 1;
    }
    console.log(this.paye);
    console.log(this.pourtous);
    const apiUrl=environment.endPoint+
    'calendrier_action.php?Action=AJOUTER_ABSENCE&DATEDEBUT='+this.selectedDate+'&DATEFIN='+this.selectedDate2+
    '&PAYE='+this.paye+'&MOTIF='+this.motif+'&POURTOUS=1'+
    '&HEUREDEBUT='+this.selectedTime+'&HEUREFIN='+
    this.selectedTime2+'&Token='+environment.tokenUser;

      console.log(apiUrl);
      this.readAPI(apiUrl)
      .subscribe((reponseApi) =>{
        console.log(reponseApi);
        if(reponseApi['"OK"']!== '0'){
          console.log('Absence ajoutée correctement '+this.motif);
          if (afficherTost){
            this.presentToast('Absent pour tous du '+this.motif+ ' ajoutée correctement.');
          }
          return true;
        }else{
          console.log('Erreur absence pour '+this.motif+' non ajoutée');
          return false ;
        }
      });
  }
  absencePourTousUpdate(afficherTost=false){
    if(this.isPaid===true){
      this.paye= 1;
    }else{
      this.paye= 0;
    }
    if(this.choix===true){
      this.pourtous= 0;
    }else{
      this.pourtous= 1;
    }
    console.log(this.paye);
    console.log(this.pourtous);
    const apiUrl=environment.endPoint+
    'calendrier_action.php?Action=EDITER_ABSENCE&IDABSENCE='+this.idAbsence+'&DATEDEBUT='+this.selectedDate+'&DATEFIN='+this.selectedDate2+
    '&PAYE='+this.paye+'&MOTIF='+this.motif+'&POURTOUS=1'+
    '&HEUREDEBUT='+this.selectedTime+'&HEUREFIN='+
    this.selectedTime2+'&Token='+environment.tokenUser;

      console.log(apiUrl);
      this.readAPI(apiUrl)
      .subscribe((reponseApi) =>{
        console.log(reponseApi);
        if(reponseApi['"OK"']!== '0'){
          console.log('Absence modifiée correctement '+this.motif);
          if (afficherTost){
            this.presentToast('Absent pour tous du '+this.motif+ ' modifiée correctement.');
          }
          return true;
        }else{
          console.log('Erreur absence pour '+this.motif+' non modifiée');
          return false ;
        }
      });
  }

  //Date
  setToday(){
    // this.formattedString= format(parseISO(format(new Date(), 'yyyy-MM-dd')+ 'T09:00:00.000Z'), 'HH:mm, MMM d, yyyy');
    this.formattedString= format(parseISO(format(new Date(), 'yyyy-MM-dd')+ 'T09:00:00.000Z'),  'HH:mm:ss, yyyy-MM-d ');
    this.formattedString2= format(parseISO(format(new Date(), 'yyyy-MM-dd')+ 'T09:00:00.000Z'), 'HH:mm:ss, yyyy-MM-d ');
    this.timeString= format(parseISO(format(new Date(), 'yyyy-MM-dd')+ 'T09:00:00.000Z'), 'HH:mm:ss');
    this.timeString2= format(parseISO(format(new Date(), 'yyyy-MM-dd')+ 'T09:00:00.000Z'), 'HH:mm:ss');
    }
    dateChanged(value){
     this.dateValue= value;
     this.formattedString= format(parseISO(value),  'yyyy-MM-dd');
     this.timeString= format(parseISO(value),  ' HH:mm:ss');
     this.showPicker= false;
     this.selectedDate=format(parseISO(value),'yyyy-MM-dd');
     this.selectedTime=format(parseISO(value),'HH:mm:ss');
     }
     dateChangedFin(value){
      this.dateValue= value;
     this.formattedString2= format(parseISO(value),  'yyyy-MM-dd');
     this.timeString2= format(parseISO(value),  ' HH:mm:ss');
     this.showPicker= false;
     this.selectedDate2=format(parseISO(value),'yyyy-MM-dd');
     this.selectedTime2=format(parseISO(value),'HH:mm:ss');
     }
     close(){
       this.datetime.cancel(true);
     }
     select(){
       this.datetime.confirm(true);

     }

}
