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
    console.log('Check authentification');
    this.authService.login()
      .then((user) => {
        console.log('Authentified after loading !');
        console.log(user);
        this.navCtrl.pop();
      })
      .catch((err)=> {
        console.log('Still not authentified : ' + err);
      });
  }

  login() {
    this.authService.login(this.email,this.password)
      .then((msg) => {
        console.log('Logged in : ' + msg);
        this.navCtrl.pop();
        //this.navCtrl.push(HomePage)
      })
      .catch((err) => {
        console.log('login pb : ' + err);
      });


  }

}
