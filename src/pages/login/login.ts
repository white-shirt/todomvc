import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {AuthService} from "../../app/auth.service";
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public authService : AuthService) {


  }

  login_(){
    alert('Login //todo');
  }

  login() {
    this.authService.login('my_mail','mY_password')
      .then( () => {

        this.navCtrl.pop();
        //this.navCtrl.push(HomePage)
      })

    //todo https://auth0.com/blog/ionic-2-authentication-how-to-secure-your-mobile-app-with-jwt/

  }

}
