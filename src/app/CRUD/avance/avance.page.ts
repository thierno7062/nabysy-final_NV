/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-avance',
  templateUrl: './avance.page.html',
  styleUrls: ['./avance.page.scss'],
})
export class AvancePage implements OnInit {
  avance: any;
  infoEmploye: any;
  id: ''; nom: '';prenom: ''; mois: ''; annee: ''; montant: number;
  constructor(private http: HttpClient,private route: ActivatedRoute,private router: Router,
    private navParams: NavParams,private modalctrl: ModalController,private toastctrl: ToastController) {
      this.infoSalaire();
      this.loadEmploye();
      this.montant=0;
     }

  ngOnInit() {
  }

  doRefresh(event){
    event.target.complete();
  }
  closeModal(){
    this.modalctrl.dismiss(null, 'closed');

  }
  infoSalaire(){
    this.avance= this.navParams.get('data');
    console.log(this.avance.BULLETIN_SALAIRE);
      this.id=this.avance.BULLETIN_SALAIRE.IDEMPLOYE;
      this.mois=this.avance.BULLETIN_SALAIRE.MOIS;
      this.annee=this.avance.BULLETIN_SALAIRE.ANNEE;
      console.log(this.id);
      console.log(this.mois);
      console.log(this.annee);
  }

  loadEmploye(){
    this.readAPI(environment.endPoint+'employe_action.php?Action=GET_EMPLOYE&IdEmploye='+this.id+'&Token='+environment.tokenUser)
    .subscribe((listes) =>{
      // console.log(Listes);
      this.infoEmploye=listes ;
      console.log(this.infoEmploye);
      console.log(this.infoEmploye['0']);
      if(this.infoEmploye){
        this.nom=this.infoEmploye['0'].Nom;
        // this.prenom=this.avance.BULLETIN_SALAIRE.NOMEMPLOYE;
        this.prenom=this.infoEmploye['0'].Prenom;
        console.log(this.id+' '+this.prenom+''+this.nom);
      }
    });

  }
  readAPI(url: string){
    console.log(url);
    return this.http.get(url);

  }
  onSubmit(){
    if(this.montant===0||this.montant<0){
      this.presentToast('Veillez mettre le montant SVP!!!!');
    }else{
      return new Promise (() =>{
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json' );
        let txId= '';
        /* if (this.employe){
          txId='&IdEmploye='+this.employe.ID ;
        } */

        const apiUrl=environment.endPoint+'salaire_action.php?Action=AVANCE_SALAIRE&IdEmploye='+this.id+
        '&MOIS='+this.mois+'&ANNEE='+this.annee+'&MONTANT='+this.montant+'&Token='+environment.tokenUser;
        // ---------------
        console.log(apiUrl);
        this.http.get(apiUrl).subscribe(async data =>{
          console.log(data);
          console.log(data['OK']);
          console.log(data['TxErreur']);
          if(data['OK']=== 0){
            // this.router.navigate(['/personnel']);
            this.modalctrl.dismiss();
            this.presentToast('Opération échouée: '+data['TxErreur']);
            console.log(data['TxErreur']);
          }else{
            this.presentToast('Opération réussit');
            console.log('Opération OK');
            this.modalctrl.dismiss(data,'create');
          }

        });
      });
    }
  }
  async presentToast(a){
    const toast = await this.toastctrl.create({
      message:a,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

}
