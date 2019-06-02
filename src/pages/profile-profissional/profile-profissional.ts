import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ProfissionalService } from '../../services/domain/profissional.service';
import { ProfissionalModel } from '../../models/profissional.model';

/**
 * Generated class for the ProfileProfissionalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-profissional',
  templateUrl: 'profile-profissional.html',
})
export class ProfileProfissionalPage {

  profissional: ProfissionalModel;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public profissionalService: ProfissionalService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.profissionalService.findByEmail(localUser.email)
      .subscribe(response => {
        this.profissional = response;
        //buscar imagem
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

  editar(){
    this.navCtrl.push('EditarPerfilProfissionalPage', {profissional: this.profissional});
  }
}
