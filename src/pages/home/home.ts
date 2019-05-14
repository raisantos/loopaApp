import { Component } from '@angular/core';
import { NavController, IonicPage, Events } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisModel } from '../../models/credenciais.model';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisModel = {email : "", senha : ""};

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    public auth: AuthService,
    public storage: StorageService,
    public events: Events) {

  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false)
  }

  ionViewDidLeave(){
    this.menu.swipeEnable(true)
  }

  ionViewDidEnter(){
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('ProfissionaisPage');
      }, 
      error => {});
  }

  login(){
    console.log(this.creds);
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        console.log(response);
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.auth.getAuthorith()
          .subscribe(response => {
            console.log(response);
            console.log(response.authorities[0].authority);
            this.storage.setAuthorith(response.authorities[0].authority);
            console.log(this.storage.getAuthorith());
            console.log(this.storage.getLocalUser());

            this.events.publish('user:signedIn', this.storage.getAuthorith);  
          }, error => {});
        this.navCtrl.setRoot('ProfissionaisPage');
      }, 
      error => {});
  }

  signup(){
    this.navCtrl.push('SignupPage');
  }
}
