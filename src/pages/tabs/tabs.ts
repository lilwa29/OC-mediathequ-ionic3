import { Component } from '@angular/core';
import {MenuController} from 'ionic-angular';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  constructor(public menuCtrl: MenuController) { }


}
