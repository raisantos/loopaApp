import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtendimentosPage } from './atendimentos';

@NgModule({
  declarations: [
    AtendimentosPage,
  ],
  imports: [
    IonicPageModule.forChild(AtendimentosPage),
  ],
})
export class AtendimentosPageModule {}
