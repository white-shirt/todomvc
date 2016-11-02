import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {AuthService} from "../../providers/auth.service";
import {DataService} from "../../providers/data.service";
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public authService : AuthService, public dataService : DataService) {
  }

  ngAfterViewInit() {
    console.log('Check authentification');
    this.authService.login()
      .catch((err)=>{
        alert(err);
        this.login();
      });
  }

  login(){
    this.navCtrl.push(LoginPage)
  }


}
