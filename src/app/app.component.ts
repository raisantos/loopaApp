import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';

  role: string;

  pages: Array<{title: string, component: string, role: string}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public auth: AuthService,
    public events: Events,
    public storage: StorageService
    ) {
    this.initializeApp();

    events.subscribe('user:signedIn', (userEventData) => {
      this.role = storage.getAuthorith();
      console.log('role');
      console.log(this.role);
     });
    // used for an example of ngFor and navigation
    this.pages = [
      //{ title: 'Home', component: 'HomePage' }
      { title: 'Profile', component: 'ProfilePage', role: 'ROLE_CLIENTE' },
      { title: 'Profissionais', component: 'ProfissionaisPage', role: 'ROLE_CLIENTE' },
      { title: 'Busca', component: 'BuscaPage', role: 'ROLE_CLIENTE' },
      { title: 'Recomendações', component: 'RecomendacoesPage', role: 'ROLE_CLIENTE' },
      { title: 'Atendimentos', component: 'AtendimentosPage', role: 'ROLE_CLIENTE' },
      { title: 'Logout', component: '', role: 'ROLE_CLIENTE' },
      { title: 'Logout', component: '', role: 'ROLE_PROFISSIONAL' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page : {title: string, component: string}) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    switch (page.title){
      case 'Logout':
      this.auth.logout();
      this.nav.setRoot('HomePage');
      break;

      default:
      this.nav.setRoot(page.component);
    }
  }
}
