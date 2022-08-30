import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  nomEmploye: string;
  prenomEmploye: string;
  employeFonction: string;
  photoUrl: string;

  features: any[]=[
    {id: 1, name: 'ADMINISTRATION', src: 'assets/office (1).png', background: 'rgba(27, 150, 181, 0.1)', page: '/administration'},
    {id: 2, name: 'PERSONNEL', src: 'assets/man.png',background: 'rgba(106, 100, 255, 0.1)', page: '/personnel'},
    {id: 3, name: 'AFFECTATION', src: 'assets/send.png',background: 'rgba(255, 196, 9, 0.1)', page: '/affectation'},
    {id: 4, name: 'SALAIRE', src: 'assets/salary.png',background: 'rgba(27, 150, 181, 0.1)', page: '/salaires'},
    {id: 5, name: 'PRIME', src: 'assets/indemnity.png',background: 'rgba(27, 150, 181, 0.1)', page: '/prime'},
    {id: 6, name: 'CALENDRIER ABSENCE', src: 'assets/schedule.png',background: 'rgba(27, 150, 181, 0.1)', page: '/absence'},
  ];
  // features2: any[]=[
  //   {id: 1, name: 'Top Up', src: 'assets/top-up.png', background: 'rgba(27, 150, 181, 0.1)', page: ''},
  //   {id: 2, name: 'Withdraw', src: 'assets/cash-withdrawal.png',background: 'rgba(106, 100, 255, 0.1)', page: ''},
  // ];



  transaction: any[]= [
    {id: 1, vendor: 'Rapport du 21 septembre......', image: '', amount: 'Service comptable',time: 'le 22/09/2021 3:00PM'},
    {id: 2, vendor: 'Rapport du 09 Octobre........', image: '', amount: 'Service comptable',time: 'le 14/10/2021 4:00PM'},
    {id: 3, vendor: 'Rapport du 11 Octobre........', image: '', amount: 'Service comptable',time: 'le 20/10/2021 4:00PM'},
    {id: 4, vendor: 'Rapport du 13 Octobre........', image: '', amount: 'Service comptable',time: 'le 21/10/2021 4:00PM'},
    {id: 5, vendor: 'Rapport du 15 Octobre........', image: '', amount: 'Service comptable',time: 'le 22/10/2021 4:00PM'},
    {id: 6, vendor: 'Rapport du 20 Octobre........', image: '', amount: 'Service comptable',time: 'le 25/10/2021 4:00PM'},
    {id: 7, vendor: 'Rapport du 25 Octobre........', image: '', amount: 'Service comptable',time: 'le 27/10/2021 4:00PM'},
    {id: 8, vendor: 'Rapport du 30 Octobre........', image: '', amount: 'Service comptable',time: 'le 02/11/2021 4:00PM'},
    {id: 9, vendor: 'Rapport du 02 Novembre........', image: '', amount: 'Service comptable',time: 'le 11/11/2021 4:00PM'},
  ];

  constructor( private router: Router,
    private menu: MenuController,
    private http: HttpClient,) {
      this.nomEmploye='';
      this.prenomEmploye='';
      this.employeFonction='';
      console.log('Construtor du HomePage');
      this.getInfosUtilisateur();
      if (environment.employeConnecte){
        this.nomEmploye=environment.employeConnecte.Nom;
        this.prenomEmploye=environment.employeConnecte.Prenom;
        this.employeFonction=environment.employeConnecte.Fonction ;
        this.photoUrl=environment.employeConnecte.PHOTO_URL ;
        console.log(environment.employeConnecte);
      }else{
        this.getInfosUtilisateur();
        console.log(environment.employeConnecte);
      }
    }
  ngOnInit(): void {
    console.log('nbOnInit pour HomePage');
    console.log(this.nomEmploye);
    if (!environment.employeConnecte){
      this.getInfosUtilisateur();
    }
  }

  admin(){
      this.router.navigateByUrl('/administration');
    }

    _openSideNav(){
      this.menu.enable(true,'menu-content');
      this.menu.open('menu-content');
    }

    /* ionViewWillEnter() {
      console.log('Je charge les infos ici...');
      //this.getInfosUtilisateur();
      //console.log(this);
    } */

    getInfosUtilisateur(){
      console.log('getInfosUtilisateur du HomePage');
      const headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json' );
      // eslint-disable-next-line max-len
      const apiUrl=environment.endPoint+'nabysy_action.php?Action=GET_INFOS_USER&User='+environment.userName+'&Password='+environment.passWord;
      console.log(apiUrl);
      this.http.get(apiUrl).subscribe( data => {
        //console.log(data);
        if (data) {
          environment.employeConnecte =data ;
        }else{
          environment.employeConnecte=null;
        }
        if (environment.employeConnecte){
          console.log(environment.employeConnecte);
          this.nomEmploye=environment.employeConnecte.Nom;
          this.prenomEmploye=environment.employeConnecte.Prenom;
          this.employeFonction=environment.employeConnecte.Fonction ;
          this.photoUrl=environment.employeConnecte.PHOTO_URL ;
        }
      });
    }

}
