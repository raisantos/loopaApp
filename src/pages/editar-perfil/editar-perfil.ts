import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteModel } from '../../models/cliente.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../../services/domain/cliente.service';

/**
 * Generated class for the EditarPerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-perfil',
  templateUrl: 'editar-perfil.html',
})
export class EditarPerfilPage {

  cliente: ClienteModel;
  formGroup: FormGroup;

  constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      public formBuilder: FormBuilder,
      public clienteService: ClienteService) {
  
    this.cliente = this.navParams.get('cliente');
    this.createForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarPerfilPage');
  }

  createForm(){
    this.formGroup = this.formBuilder.group({
      nome: [this.cliente.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      email: [this.cliente.email, [Validators.required, Validators.email]],
      endereco: [this.cliente.endereco, []],
      telefone: [this.cliente.telefone, [Validators.required]]
    });
  }

  salvar(){
    console.log(this.formGroup.value);
    this.clienteService.update(this.cliente.id, this.formGroup.value)
      .subscribe(response => {
        this.navCtrl.setRoot('ProfilePage');
      },
      error => {});
  }

}
