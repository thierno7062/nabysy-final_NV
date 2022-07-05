/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { PopupModalService } from 'src/app/services/popup-modal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crud-absence',
  templateUrl: './crud-absence.page.html',
  styleUrls: ['./crud-absence.page.scss'],
})
export class CrudAbsencePage implements OnInit {
  @Input() employe: any;
  listeEmploye: any;
  isUpdate= false;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  idEmploye: ''; utilisateur: ''; paye: '';
  nom: ''; pourtous: ''; dateEnregistrement: '';
  prenom: ''; heureEnregistrement: '';
  dateDebut: ''; heureDebut: '';
  dateFin: ''; heureFin: '';
  motif: ''; annee: '';

  bulkIndividuel= true;
  selectedValue: ''[]=[];

  constructor(private modalctrl: ModalController,private popupModalService: PopupModalService,
    private http: HttpClient,
    private toastctrl: ToastController) {
      this.readAPI(environment.endPoint+'employe_action.php?Action=GET_EMPLOYE&Token='+environment.tokenUser)
      .subscribe((listes) =>{
        // console.log(Listes);
        this.listeEmploye=listes ;
        console.log(this.listeEmploye);
      });
     }

  ngOnInit() {
    if (this.employe){
      this.nom=this.employe.Nom;
          this.prenom= this.employe.Prenom;
          this.dateDebut= this.employe.DateDebut;
          this.dateFin= this.employe.DateFin;
          this.motif= this.employe.TextMotif;
          this.idEmploye=  this.employe.IdEmploye;
          this.dateEnregistrement= this.employe.DateEnreg;
          this.heureEnregistrement= this.employe.HeureEnreg;
          this.heureDebut= this.employe.HeureDebut;
          this.heureFin= this.employe.HeureFin;
          this.annee= this.employe.Annee;
          this.paye= this.employe.IsPaye;
          this.pourtous= this.employe.PourTous;

    this.isUpdate = true;
  }
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

  traiterAbsenceIndividuelle( indexTableau){
    const employe=this.listeEmploye[indexTableau];
    console.log(employe);
    console.log('Id='+employe.ID);
  }

  onSubmit(){
    //console.log(this.selectedValue);
    if(this.dateDebut===''){
      this.presentToast('Veillez mettre le nom SVP!!!!');
    }else if(this.motif===''){
      this.presentToast('Veillez mettre votre prénom SVP!!!!!!');
    }else{
      console.log(this.selectedValue);
      for (let i=0;i<=this.selectedValue.length; i++){
        const elem=this.selectedValue[i];
        console.log(elem);
        console.log(this.selectedValue[i]);
        this.traiterAbsenceIndividuelle(elem) ;
      }

      return new Promise (() =>{
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        // ----------------------
        let txId='';
        if (this.employe){
          txId='&IDABSENCE='+this.employe.ID ;
        }

       /*  var TxService='';
        if (this.service){
          TxService='&IdService='+this.idService;
        } */
        const apiUrl=environment.endPoint+'calendrier_action.php?Action=AJOUTER_ABSENCE'+txId+'&IDEMPLOYE='+
        this.idEmploye+'&DATEDEBUT='+this.dateDebut+'&DATEFIN='+this.dateFin+
        '&PAYE='+this.paye+'&MOTIF='+this.motif+'&POURTOUS='+this.pourtous+
        '&Nom='+this.nom+'&Prenom='+
        this.prenom+'&Token='+environment.tokenUser;
        // ---------------
        console.log(apiUrl);
        this.http.get(apiUrl).subscribe(async data =>{
          console.log(data);
          if(data['OK']!== '0'){
            // this.router.navigate(['/personnel']);
            this.modalctrl.dismiss(data,'create');
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
    this.modalctrl.dismiss(null, 'closed');

  }
  userdetails(){
    this.popupModalService.presentModal2();
  }

}
