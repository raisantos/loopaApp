import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhesAtendimentoPage } from './detalhes-atendimento';

@NgModule({
  declarations: [
    DetalhesAtendimentoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhesAtendimentoPage),
  ],
})
export class DetalhesAtendimentoPageModule {}
