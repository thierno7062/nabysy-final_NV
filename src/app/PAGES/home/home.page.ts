import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

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
  photoUrl: '';

  constructor( private router: Router,
    private menu: MenuController,) {
      this.photoUrl=environment.employeConnecte.PHOTO_URL ;
    }

    admin(){
      this.router.navigateByUrl('/administration');
    }

    _openSideNav(){
      this.menu.enable(true,'menu-content');
      this.menu.open('menu-content');
    }

    ionViewWillEnter() {
      console.log('Je charge les infos ici...');
      console.log(this);
    }
    ionViewCanEnter() {
      console.log('Peut visiter la page ici...');
      return true;
    }
}
