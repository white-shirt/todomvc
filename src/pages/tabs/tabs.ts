
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { TodoListPage } from '../todo-list/todo-list';
import {AuthService} from "../../providers/auth.service";
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = ContactPage;
  tab4Root: any = TodoListPage;

  constructor(public navCtrl: NavController, public authService : AuthService) {

  }

  //ngOnInit() {

    //console.log('check auth : '+this.mail);
    //authService.checkAuthentication(); //todo on each modules ? in constructor ?
    //if (this.authService.isAuthenticated()) return;

    //this.navCtrl.push(LoginPage);

  //}

  // Wait for the components in MyApp's template to be initialized
  // In this case, we are waiting for the Nav with id="my-nav"
  ngAfterViewInit() {
    // Let's navigate from TabsPage to Page1
    console.log('tabs view init ?');
    if (this.authService.isAuthenticated()) return;

    this.navCtrl.push(LoginPage);
    console.log('tabs view init ?....');
  }
}
