import { Component } from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {LendService} from "../../../services/lend.service";
import {CdModel} from "../../../modeles/Cd.model";

@Component({
  selector: 'page-lend-cd',
  templateUrl: 'lend-cd.html',
})
export class LendCdPage {
  cd : CdModel;
  index : number;

  constructor(public navParams: NavParams,
              private viewCtrl: ViewController,
              private lendService: LendService) {
  }
  ngOnInit(){
    this.index = this.navParams.get('index');
    this.cd = this.lendService.cds[this.index];
  }
  dismissModal(){
    this.viewCtrl.dismiss();
  }
  onToggleCd() {
    this.lendService.preterOuRendre(this.cd);
  }
}
