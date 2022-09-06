/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { UserInfosServiceService } from '../user-infos-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: '';
  password: '';
  IdEmploye: '';


  constructor(
    private router: Router,
    private toasctrl: ToastController,
    private alertctrl: AlertController,
    private loadingctrl: LoadingController,
   private http: HttpClient,
    private navctrl: NavController,
    private infosUserSrv: UserInfosServiceService,
  ) { }

  ngOnInit() {
  }

  async proseslogin(){
    if (this.username !== '' && this.password !== '') {
      const body = {
        login: this.username,
        password: this.password,
        aksi: 'Login'
      };
      console.log('Connexion en cour .. vers '+environment.endPoint);
      const headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json' );
      const apiUrl=environment.endPoint+'auth.php?Login='+this.username+'&Password='+this.password;
      //console.log(apiUrl);
      environment.userName=this.username ;
      environment.passWord=this.password ;
      this.http.get(apiUrl).subscribe(async data => {
       console.log(data['Extra']);
       if (data['OK'] !== 0) {
          environment.tokenUser=data['Extra'] ;
          //Recup info de l'utilisateur connecté
          await this.getInfosUtilisateur();

       }else{
          environment.userName='' ;
          environment.passWord='' ;
          const toast = await this.toasctrl.create({
            message: 'Username or password invalid',
            duration: 2000,
            position: 'top'
          });
          toast.present();
       }
     });
    } else {
      const toast = await this.toasctrl.create({
        message: 'Vérifiez votre connexion svp.',
        duration: 2000,
        position: 'top'
      });
      toast.present();
    }

    this.username = '';
    this.password = '';

    // Info Utilisateur

      return new Promise (() =>{


      });
  };

  getInfosUtilisateur(){
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
        console.log(environment);
        this.infosUserSrv.getUserProfile().subscribe(userData => {
          environment.userProfile=userData;
          delete environment.userProfile.PASSWORD ;
          console.log(environment.userProfile);
          console.log('Ouverture du Menu Principal');
          this.router.navigate(['/home']);
        });        
      //toast.present();
      }else{
        environment.employeConnecte=null;
      }
    });

  }
}
