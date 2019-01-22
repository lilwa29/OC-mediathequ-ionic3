import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})
export class BookListPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
