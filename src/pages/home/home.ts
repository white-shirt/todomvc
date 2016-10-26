import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {AuthService} from "../../providers/auth.service";
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
  // Wait for the components in MyApp's template to be initialized
  // In this case, we are waiting for the Nav with id="my-nav"
  ngAfterViewInit() {
    // Let's navigate from TabsPage to Page1
    console.log('home view init ?');
    //this.navCtrl.push(LoginPage);
    //console.log('home view init ?....');
  }

  login(){
    this.navCtrl.push(LoginPage)
  }

}
