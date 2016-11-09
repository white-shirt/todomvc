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


  ngAfterViewInit() {
    console.log('login.Check authentification');
    if (this.authService.isAuthenticated()) {
      console.log('login.Logged in.');
      this.navCtrl.pop();
      //this.navCtrl.push(HomePage)
    }
  }

  login() {
    this.authService.login(this.email,this.password)
      .then((msg) => {
        console.log('login.Logged in ? ' + msg);
        if (this.authService.isAuthenticated()) {
          console.log('login.Logged in.');
          this.navCtrl.pop();
          //this.navCtrl.push(HomePage)
        }
      })
      .catch((err) => {
        console.log('login.login pb : ' + err);
      });


  }

}
