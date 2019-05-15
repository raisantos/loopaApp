import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ProfissionalService } from '../../services/domain/profissional.service';
import { ProfissionalModel } from '../../models/profissional.model';
import { StorageService } from '../../services/storage.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the CheckinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html',
})
export class CheckinPage {

  latitude: number;
  longitude: number;
  checkInButtonDisable: boolean;
  checkOutButtonDisable: boolean;
  profissional: ProfissionalModel;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private geolocation: Geolocation,
    public storage: StorageService,
    public profissionalService: ProfissionalService) {
  
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.profissionalService.findByEmail(localUser.email)
      .subscribe(response => {
        console.log(response);
        this.profissional = response;
        if(this.profissional.status == 'ativo'){
          this.checkInButtonDisable = true;
          this.checkOutButtonDisable = false;
        }
        else{
          this.checkInButtonDisable = false;
          this.checkOutButtonDisable = true;
        }
      },
      error => {
        if(error.status == 403){
          this.navCtrl.setRoot('HomePage');
        }
      });
    }
    else{
      this.navCtrl.setRoot('HomePage');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckinPage');
  }

  checkIn(){
    this.geolocation.getCurrentPosition()
    .then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      console.log(this.latitude);
      console.log(this.longitude);

      this.profissionalService.checkIn(this.latitude, this.longitude)
      .subscribe(response => {
        console.log('checkin realizado');
        this.checkInButtonDisable = true;
        this.checkOutButtonDisable = false;

        let alert = this.alertCtrl.create({
          title: 'Check-In',
          message: 'Seu check-in foi realizado com sucesso. Seu perfil será exibido nos resultados ' +
          'de buscas de clientes.',
          enableBackdropDismiss: false,
          buttons: [
              {
                  text: 'Ok'
              }
          ]
        });
        alert.present();
      
      }, error => {});
    }).catch((error) => {
      console.log('Erro ao recuperar sua posição', error);
    });
  }

  checkOut(){
    this.profissionalService.checkOut()
      .subscribe(response => {
        console.log('checkout realizado');
        this.checkInButtonDisable = false;
        this.checkOutButtonDisable = true;

        let alert = this.alertCtrl.create({
          title: 'Check-Out',
          message: 'Seu check-out foi realizado com sucesso. Seu perfil não será exibido nos resultados ' +
          'de buscas de clientes.',
          enableBackdropDismiss: false,
          buttons: [
              {
                  text: 'Ok'
              }
          ]
        });
        alert.present();
      }, error => {})
  }
}
