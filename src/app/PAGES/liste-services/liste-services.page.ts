/* eslint-disable @typescript-eslint/dot-notation */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { CrudServicePage } from 'src/app/CRUD/crud-service/crud-service.page';
import { EmployeService } from 'src/app/services/employe.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-liste-services',
  templateUrl: './liste-services.page.html',
  styleUrls: ['./liste-services.page.scss'],
})
export class ListeServicesPage implements OnInit {
  direction: any;
  listeService: any;
  url: string ;
  nabyData={
    id:'',
    nom:'',
    adresse:'',
    telephone:'',
  };
  constructor(private router: Router,private route: ActivatedRoute, private modalctrl: ModalController,
    private menu: MenuController,private service: EmployeService,private alertctrl: AlertController,
    private http: HttpClient) {
     this.refreshServices();
    }

  ngOnInit() {
    // this.refreshServices();
  }
  refreshServices(){
    this.route.queryParams.subscribe(res =>{
      console.log(res);
      this.direction=res;
      //console.log(this.direction);
      this.url=environment.endPoint+'service_action.php?Action=GET_SERVICE&IdDirection='+this.direction.ID;

      this.readAPI(this.url)
      .subscribe((data) =>{
        this.listeService=data ;
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
}
