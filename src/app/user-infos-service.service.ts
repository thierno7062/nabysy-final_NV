import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserInfosServiceService {

  constructor(private http: HttpClient) { }

  getUserProfile(){
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json' );
    // eslint-disable-next-line max-len
    const apiUrl=environment.endPoint+'nabysy_action.php?Action=OPEN_SESSION&User='+environment.userName+'&Password='+environment.passWord;
    console.log(apiUrl);
    return this.http.get(apiUrl);
  }

}
