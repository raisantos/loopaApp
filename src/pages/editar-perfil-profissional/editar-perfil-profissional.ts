import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfissionalModel } from '../../models/profissional.model';
import { ProfissionalService } from '../../services/domain/profissional.service';

/**
 * Generated class for the EditarPerfilProfissionalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-perfil-profissional',
  templateUrl: 'editar-perfil-profissional.html',
})
export class EditarPerfilProfissionalPage {

  profissional: ProfissionalModel;
  formGroup: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public profissionalService: ProfissionalService) {

  this.profissional = this.navParams.get('profissional');
  this.createForm();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarPerfilProfissionalPage');
  }

  createForm(){
    this.formGroup = this.formBuilder.group({
      nome: [this.profissional.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      email: [this.profissional.email, [Validators.required, Validators.email]],
      endereco: [this.profissional.endereco, []],
      telefone: [this.profissional.telefone, [Validators.required]]
    });
  }

  salvar(){
    console.log(this.formGroup.value);
    this.profissionalService.update(this.profissional.id, this.formGroup.value)
      .subscribe(response => {
        this.navCtrl.setRoot('ProfileProfissionalPage');
      },
      error => {});
  }

}
