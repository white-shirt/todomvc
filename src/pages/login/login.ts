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
      .then((msg) => {

        console.log(msg);

        this.navCtrl.pop();
        //this.navCtrl.push(HomePage)
      });


  }

}
