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
    console.log('Check authentification');
    this.authService.login()
      .then((user) => {
        console.log('Authentified !');
        console.log(user);
      })
      .catch((err)=>{
        console.log('Not authentified : ' + err);
        this.login();
      });
  }

  login(){
    this.navCtrl.push(LoginPage)
  }


}
