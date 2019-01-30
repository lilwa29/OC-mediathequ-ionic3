import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {TabsPage} from "../pages/tabs/tabs";
import {SettingsPage} from "../pages/settings/settings";
import * as firebase from "firebase";
import {AuthPage} from "../pages/auth/auth";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage: any = TabsPage;
  settingsPage: any = SettingsPage;
  authPage: any = AuthPage;
  isAuth: boolean;
  @ViewChild('content') content: NavController;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private menuCtrl: MenuController) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      let config = {
        apiKey: "AIzaSyAHLc-dkucEMEC_gVocpTF5nKezgtoRPFE",
        authDomain: "oc-ionic-e5528.firebaseapp.com",
        databaseURL: "https://oc-ionic-e5528.firebaseio.com",
        projectId: "oc-ionic-e5528",
        storageBucket: "oc-ionic-e5528.appspot.com",
        messagingSenderId: "251206443630"
      };
      firebase.initializeApp(config);
      firebase.auth().onAuthStateChanged(
        (user) => {
          if (user) {
            this.isAuth = true ;
            this.content.setRoot(TabsPage);
          } else {
            this.isAuth = false ;
            this.content.setRoot(AuthPage, {mode: 'connect'});
          }
        }
      );
    });
  }
  onNavigate(page: any, data?: {}){
    this.content.setRoot(page, data ? data : null);
    this.menuCtrl.close();
  }
  onDisconnect() {
    firebase.auth().signOut();
    this.menuCtrl.close();
  }
}

