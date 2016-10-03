import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {AuthService} from "../../app/auth.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private authService : AuthService) {

  }

  testLogin() {
    this.authService.getHeroes();//('mail','password');
  }
}
