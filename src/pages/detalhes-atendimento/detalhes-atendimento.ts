import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AtendimentoModel } from '../../models/atendimento.model';
import { AtendimentoService } from '../../services/domain/atendimento.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the DetalhesAtendimentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhes-atendimento',
  templateUrl: 'detalhes-atendimento.html',
})
export class DetalhesAtendimentoPage {

  atendimento: AtendimentoModel;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public atendimentoService: AtendimentoService,
    public alertCtrl: AlertController) {
      this.atendimento = this.navParams.get('atendimento');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhesAtendimentoPage');
  }

  confirmar(){
    console.log(this.atendimento.codigo);
    this.atendimentoService.update(this.atendimento.codigo)
      .subscribe(response => {
        this.showInsertOk();
      },
      error => {});
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Atendimento registrado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

}
