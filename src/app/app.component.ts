import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userInfo: any ;
  userName: string ;
  nomEmploye: string;
  prenomEmploye: string;
  photoUrl: string;
  constructor(private router: Router,private menu: MenuController) {
    this.userName=environment.userName ;
    if (environment.employeConnecte){
      this.userInfo=environment.employeConnecte ;
      this.nomEmploye=environment.employeConnecte.Nom ;
      this.prenomEmploye=environment.employeConnecte.Prenom ;
      this.photoUrl=environment.employeConnecte.PHOTO_URL ;
    }else{
      this.nomEmploye='Nom Employe' ;
      this.prenomEmploye='Prenom Employe' ;
      this.photoUrl='Url de ma Photo' ;
    }
    console.log(this);
  }

  loadUserInfos(){
    this.userName=environment.userName ;
    if (environment.employeConnecte){
      this.userInfo=environment.employeConnecte ;
      this.nomEmploye=environment.employeConnecte.Nom ;
      this.prenomEmploye=environment.employeConnecte.Prenom ;
      this.photoUrl=environment.employeConnecte.PHOTO_URL ;
    }else{
      this.nomEmploye='Nom Employe' ;
      this.prenomEmploye='Prenom Employe' ;
      this.photoUrl='Url de ma Photo' ;
    }
    //console.log(this);
  }

  closeMenu(){
    if (environment.employeConnecte){
      this.nomEmploye=environment.employeConnecte.Nom ;
      this.prenomEmploye=environment.employeConnecte.Prenom ;
      this.photoUrl=environment.employeConnecte.PHOTO_URL ;
      this.userInfo=environment.employeConnecte ;
      console.log(this);
    }
    console.log(this);
    this.menu.close('menu-content');
  }

  ionViewWillEnter() {
    console.log('Je charge les infos de connexion ici...');
    this.loadUserInfos();
    console.log(this);
  }
  ionViewCanEnter() {
    console.log('Je recharge ici');
    this.loadUserInfos();
    return true;
  }

}
