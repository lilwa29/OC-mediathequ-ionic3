import { Component } from '@angular/core';
import {MenuController, ModalController} from 'ionic-angular';
import {LendService} from "../../services/lend.service";
import {CdModel} from "../../modeles/Cd.model";
import {LendCdPage} from "./lend-cd/lend-cd";

@Component({
  selector: 'page-cd-list',
  templateUrl: 'cd-list.html',
})
export class CdListPage {
  cdsList: CdModel[];

  constructor(private modalCtrl: ModalController,
              private lendService: LendService,
              private menuCtrl: MenuController) { }

  onToggleMenu(){
    this.menuCtrl.open();
  }

  ionViewWillEnter(){
    this.cdsList = this.lendService.cds.slice();
  }
  onLoadCd(index: number){
    let modal = this.modalCtrl.create(LendCdPage, {index: index});
    modal.present();
  }
}
