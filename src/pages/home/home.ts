import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {AuthService} from "../../providers/auth.service";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public authService: AuthService) {
  }

  ngAfterViewInit() {
    console.log('home.Check authentification');
    if (!this.authService.isAuthenticated()) {
      console.log('home.Not authentified');
      this.login();
    }
  }

  login(){
    this.navCtrl.push(LoginPage)
  }


}
