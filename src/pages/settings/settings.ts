import { Component } from '@angular/core';
import {LoadingController, MenuController, ToastController} from 'ionic-angular';
import {LendService} from "../../services/lend.service";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public menuCtrl: MenuController,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private lendService: LendService) { }

  onToggleMenu(){
    this.menuCtrl.open();
  }
  onFetchData() {
    let loader = this.loadingCtrl.create({
      content: 'Récupération en cours...'
    });
    loader.present();

    this.lendService.fetchData().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message: 'Données récupérées !',
          duration: 3000,
          position: 'bottom'
        }).present();
      },
      (error) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        }).present();
      });
  }
  onSaveData() {
    let loader = this.loadingCtrl.create({
      content: 'Sauvegarde en cours...'
    });
    loader.present();

    this.lendService.saveData().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message: 'Données Sauvegardés ! ',
          duration: 3000,
          position: 'bottom'
        }).present();
      },
      (error) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        }).present();
      });
  }
}
