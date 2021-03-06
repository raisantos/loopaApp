import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProfissionalService } from '../services/domain/profissional.service';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { ClienteService } from '../services/domain/cliente.service';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { BuscaService } from '../services/domain/busca.service';
import { RecomendacaoService } from '../services/domain/recomendacao.service';
import { ServicoService } from '../services/domain/servico.service';
import { AvaliacaoService } from '../services/domain/avaliacao.service';
import { Geolocation } from '@ionic-native/geolocation';
import { AtendimentoService } from '../services/domain/atendimento.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProfissionalService,
    AuthService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    StorageService,
    ClienteService,
    BuscaService,
    RecomendacaoService,
    ServicoService,
    AvaliacaoService,
    AtendimentoService,
    Geolocation
  ]
})
export class AppModule {}
