import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ProfissionalService } from '../../services/domain/profissional.service';
import { ServicoService } from '../../services/domain/servico.service';
import { ServicoModel } from '../../models/servico.model';

/**
 * Generated class for the SignupProfissionalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup-profissional',
  templateUrl: 'signup-profissional.html',
})
export class SignupProfissionalPage {

  formGroup: FormGroup;
  servicos: ServicoModel[];

  constructor(
    public navCtrl: NavController, 
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public profissionalService: ProfissionalService,
    public alertCtrl: AlertController,
    public servicoService: ServicoService) {

      this.formGroup = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required]],
        endereco: ['', []],
        telefone: ['', [Validators.required]],
        servico: [null, [Validators.required]]
      });
  }

  signupUser(){
    console.log(this.formGroup.value);
    this.profissionalService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
      error => {});
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupProfissionalPage');
    this.servicoService.findAll()
      .subscribe(response => {
        this.servicos = response;
        this.formGroup.controls.servico.setValue(this.servicos[0].idServico);
      },
      error => {});
  }

}
