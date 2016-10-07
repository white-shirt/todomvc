import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {AuthService} from "../../app/auth.service";
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public authService : AuthService) {

    //console.log('check auth : '+this.mail);
    //authService.checkAuthentication(); //todo on each modules ? in constructor ?
    //if (this.authService.isAuthenticated()) return;
    //this.navCtrl.push(LoginPage);


  }

}
