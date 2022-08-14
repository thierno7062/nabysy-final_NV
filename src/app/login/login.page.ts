/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: '';
  password: '';
  toastController: any;


  constructor(
    private router: Router,
    private toasctrl: ToastController,
    private alertctrl: AlertController,
    private loadingctrl: LoadingController,
   private http: HttpClient,
    private navctrl: NavController
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
      const headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json' );
      const apiUrl=environment.endPoint+'auth.php?Login='+this.username+'&Password='+this.password;
      //console.log(apiUrl);
      environment.userName=this.username ;
      environment.passWord=this.password ;
      this.http.get(apiUrl).subscribe(async data => {
       console.log(data['Extra']);
       if (data['OK'] !== '0') {
         environment.tokenUser=data['Extra'] ;
         console.log(environment);
         this.router.navigate(['/home']);
          const toast = await this.toastController.create({
          message: 'Welcome!',
          duration: 2000
         });
         toast.present();
       }else{
          environment.userName='' ;
          environment.passWord='' ;
          const toast = await this.toastController.create({
            message: 'Username or password invalid',
            duration: 2000
          });
          toast.present();
       }
     });
    } else {
      const toast = await this.toastController.create({
        message: 'Vérifier votre connexion svp.',
        duration: 2000
      });
      toast.present();
    }

    this.username = '';
    this.password = '';
  };
}
