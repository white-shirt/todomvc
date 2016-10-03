import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
<<<<<<< HEAD:src/app/app.component.ts
import { AuthService } from './auth.service';
=======
>>>>>>> b952d87b97b8ba73b15ebcd3e35e74232865c800:src/app/app.component.ts


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;

<<<<<<< HEAD:src/app/app.component.ts
  constructor(platform: Platform, private authService: AuthService) {
=======
  constructor(platform: Platform) {
>>>>>>> b952d87b97b8ba73b15ebcd3e35e74232865c800:src/app/app.component.ts
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
