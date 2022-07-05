/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.page.html',
  styleUrls: ['./administration.page.scss'],
})
export class AdministrationPage implements OnInit {

  constructor( private http: HttpClient,
    private router: Router,
    private menu: MenuController,) { }

  ngOnInit() {
  }
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
  siege(){
    this.router.navigate(['direction']);

  }
  _openSideNav(){
    this.menu.enable(true,'menu-content');
    this.menu.open('menu-content');
  }

}
