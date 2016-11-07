import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {AuthService} from "../../providers/auth.service";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public email: string;
  public password: string;

  constructor(public navCtrl: NavController, public authService : AuthService) {


  }

  login() {
    this.authService.login(this.email,this.password)
      .then( () => {



        this.navCtrl.pop();
        //this.navCtrl.push(HomePage)
      });

    //todo https://auth0.com/blog/ionic-2-authentication-how-to-secure-your-mobile-app-with-jwt/

  }

}
