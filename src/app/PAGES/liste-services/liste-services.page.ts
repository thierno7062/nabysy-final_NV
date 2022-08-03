/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Observable } from 'rxjs';
import { CrudServicePage } from 'src/app/CRUD/crud-service/crud-service.page';
import { EmployeService } from 'src/app/services/employe.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-liste-services',
  templateUrl: './liste-services.page.html',
  styleUrls: ['./liste-services.page.scss'],
})
export class ListeServicesPage implements OnInit {
  // products: Observable<any>;
  direction: any;
  listeService: any;
  url: string ;
  nabyData={
    id:'',
    nom:'',
    adresse:'',
    telephone:'',
  };

   // ionic selectable************
   searchTerm: string;
   selected_user= null;
   selected: any;
   users: any;
   toggle= true;
   id: number;
   @ViewChild('selectComponent') selectComponent: IonicSelectableComponent;
   listeEmploye: any;
   listeDirections: any;

  constructor(private router: Router,private route: ActivatedRoute, private modalctrl: ModalController,
    private menu: MenuController,private service: EmployeService,private alertctrl: AlertController,
    private http: HttpClient) {
     this.refreshServices();
     this.loadEmploye();
     this.refreshDirection();
    }

  ngOnInit() {
    if(this.id){
      this.id=this.direction.ID;
    }

  }
  loadEmploye(){
    this.readAPI(environment.endPoint+'employe_action.php?Action=GET_EMPLOYE&Token='+environment.tokenUser)
    .subscribe((listes) =>{
      // console.log(Listes);
      this.listeEmploye=listes ;
      console.log(this.listeEmploye);
    });
  }
  refreshDirection(){
    this.readAPI(environment.endPoint+'direction_action.php?Action=GET_DIRECTION')
    .subscribe((Listes) =>{
      console.log(Listes);
      //  this.dt1=Listes['0'];

      this.listeDirections=Listes ;
      this.users=Listes;
      console.log(this.listeDirections);
    });
  }
  refreshServices(){
    this.route.queryParams.subscribe(res =>{
      console.log(res);
      this.direction=res;
      //console.log(this.direction);
      this.id=this.direction.ID;
      this.url=environment.endPoint+'service_action.php?Action=GET_SERVICE&IdDirection='+this.id;

      this.readAPI(this.url)
      .subscribe((data) =>{
        this.listeService=data ;
        // this.products=data;
        console.log(data);
        console.log(data['0']);
        this.nabyData.id=data['"Id"'];
        this.nabyData.nom=data['"Nom"'];
        this.nabyData.adresse=data['"Adresse"'];
        this.nabyData.telephone=data['"Tel"'];
      });
    });
  }
  readAPI(url: string){
    return this.http.get(url);

  }
  goToFicheServices(ficheService){
    this.router.navigate(['/services'],{
      queryParams:ficheService
    });
  }
  goToListeServices(ficheService){
    this.router.navigate(['/liste-services'],{
      queryParams:ficheService
    });
  }
  _openSideNav(){
    this.menu.enable(true,'menu-content');
    this.menu.open('menu-content');
  }
  getService(id: ''){
    this.url= environment.endPoint+'service_action.php?Action=GET_SERVICE&IdService='+id+'&Token='+environment.tokenUser;
    return this.http.get(this.url);
  }

   addService(){
    this.modalctrl.create({
      component: CrudServicePage,
      componentProps: {serviceInfo: [], directionInfo: this.direction }
    }).
    then(modal =>{
      modal.present();
      return modal.onDidDismiss();
    }).then(({data, role})=> {
      console.log(data);
      console.log(role);
      if(role === 'create'){
        const newIdService=data.Extra;
        this.getService(newIdService).subscribe(async newdata =>{
            this.listeService.push(newdata[0]);
            console.log(this.listeService);
            this.refreshServices();
        });
      }
    });
  }

  removeService(serviceInfo: any){
    this.alertctrl.create({
      header:'Suppresion',
      message:'voulez vous supprimer ?',
      buttons:[{
        text:'oui',
        handler:()=>new Promise (() =>{
            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json' );
            const apiUrl=environment.endPoint+'service_action.php?Action=SUPPRIME_SERVICE&IdService='+serviceInfo.ID+
            '&Token='+environment.tokenUser;
            console.log(apiUrl);
            this.http.get(apiUrl).subscribe(async data =>{
              console.log(data);
              if(data['OK'] >0){
                 //this.router.navigate(['personnel']);
                 const pos=this.listeService.indexOf(serviceInfo);
                 console.log(pos);
                 if (pos>-1){
                  this.listeService.splice(pos,1);
                  this.refreshServices();
                 }
              }else{
                console.log(data['OK']);
              }
            });
          })
      },
       {text:'No'}
    ]
    }).then(alertE1 =>alertE1.present()) ;
  }

  updateService(service: any){
    console.log(service);
    this.modalctrl.create({
      component: CrudServicePage,
      componentProps:{ serviceInfo: service , directionInfo: this.direction }
    }).
    then(modal  =>{
      modal.present();
      return modal.onDidDismiss();
    }).then(({data, role})=> {
        console.log(data);
        console.log(role);
        if(role === 'create'){
          const idEdit=data.Extra;
          this.getService(idEdit).subscribe(async newdata =>{
              // this.listeService.push(newdata[0]);
              console.log(this.listeService);
              this.refreshServices();
          });
        }
      });
  }
  doRefresh(event){
    this.refreshServices();
    event.target.complete();
  }


  //ionic selectable
  openFromCode(){
    this.selectComponent.open();
  }
  clear(){
    this.selectComponent.clear();
    this.selectComponent.close();

  }
  toggleItems(){
    this.selectComponent.toggleItems(this.toggle);
    this.toggle= !this.toggle;

  }
  confirm(){
    this.selectComponent.confirm();
    this.selectComponent.close();
    console.log(this.selected);
    if(this.selected){
      this.id=this.selected.ID;

    }
    console.log(this.selected);
    this.goToListeServices(this.selected);

  }
}
