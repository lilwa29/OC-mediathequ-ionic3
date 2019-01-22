import {Component, OnInit} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {BookModel} from "../../../modeles/Book.model";
import {LendService} from "../../../services/lend.service";

@Component({
  selector: 'page-lend-book',
  templateUrl: 'lend-book.html',
})
export class LendBookPage implements OnInit {
  book : BookModel;
  index : number;

  constructor(public navParams: NavParams,
              private viewCtrl: ViewController,
              private lendService: LendService) {
  }
  ngOnInit(){
    this.index = this.navParams.get('index');
    console.log("Index recu " + this.index);
    this.book = this.lendService.books[+this.index];
    console.log("Book " + this.book);
  }
  dismissModal(){
    this.viewCtrl.dismiss();
  }
  onToggleBook() {
    this.book.isLent = !this.book.isLent;
  }
}
