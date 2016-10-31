
import { Injectable } from '@angular/core';
import {App} from 'ionic-angular';
import {DataService} from './data.service'

@Injectable()
export class AuthService {


  mail : string
  password : string

  constructor(private app: App, private data : DataService) {
    console.log('MyAuthService constructor')
  }


  //getHeroes(): void { alert('coucou');} // stub

  login(mail : string, password : string) : Promise<boolean> {

    //todo MLE implement
    console.log('MyAuthService.login('+mail+','+password+')');
    this.mail = mail;
    this.password = password;

    localStorage.setItem('tokenTodo',this.mail);


    return this.data.initDBWithLogin(mail, password);

    //return Promise.resolve(true); //logged in
  }

  isAuthenticated() : boolean {

    //return true;
    let token = localStorage.getItem('tokenTodo');
    return (token ? true : false);
  }

}

