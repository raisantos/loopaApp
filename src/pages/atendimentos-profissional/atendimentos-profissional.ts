import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AtendimentoService } from '../../services/domain/atendimento.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the AtendimentosProfissionalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-atendimentos-profissional',
  templateUrl: 'atendimentos-profissional.html',
})
export class AtendimentosProfissionalPage {

  codigo: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public atendimentoService: AtendimentoService,
    public alertCtrl: AlertController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AtendimentosProfissionalPage');
  }

  confirmar(){
    console.log(this.codigo);
    this.atendimentoService.update(this.codigo)
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
            //this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
}
