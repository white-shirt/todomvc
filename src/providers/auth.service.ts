
import { Injectable } from '@angular/core';
import {App} from 'ionic-angular';
import {Miapp2Service} from '../../node_modules/miappio-sdk/dist/miapp.io'

@Injectable()
export class AuthService {


  mail : string
  password : string
  dataCacheOK : boolean

  constructor(private app: App, private miappService : Miapp2Service) {
    console.log('MyAuthService constructor');

    this.mail = localStorage.getItem('mail');
    this.password = localStorage.getItem('password');
    this.dataCacheOK = false;
  }

  login(mail? : string, password?: string) : Promise<any> {

    console.log('MyAuthService.login('+mail+','+password+')');
    if (this.dataCacheOK && !mail && !password)
      return Promise.resolve();

    if (mail && password) {
      this.mail = mail;
      localStorage.setItem('tokenTodo',this.mail);
      localStorage.setItem('mail',this.mail);
      this.password = password;
      localStorage.setItem('password',this.password);
    }

    this.dataCacheOK = true;
    return this.miappService.login(this.mail, this.password);
  }

  isAuthenticated() : boolean {

    //return true;
    let token = localStorage.getItem('tokenTodo');
    return (token ? true : false);
  }

}


