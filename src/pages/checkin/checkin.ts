import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ProfissionalService } from '../../services/domain/profissional.service';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private geolocation: Geolocation,
    public profissionalService: ProfissionalService) {
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
      }, error => {});
    }).catch((error) => {
      console.log('Erro ao recuperar sua posição', error);
    });
  }

  checkOut(){

  }
}
