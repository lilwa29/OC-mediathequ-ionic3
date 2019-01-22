import { Component } from '@angular/core';
import {MenuController, ModalController} from 'ionic-angular';
import {BookModel} from "../../modeles/Book.model";
import {LendService} from "../../services/lend.service";
import {LendBookPage} from "./lend-book/lend-book";

@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})
export class BookListPage {

  booksList: BookModel[];

  constructor(private modalCtrl: ModalController,
              private lendService: LendService,
              private menuCtrl: MenuController) { }

  onToggleMenu(){
    this.menuCtrl.open();
  }

  ionViewWillEnter(){
    this.booksList = this.lendService.books.slice();
  }
  onLoadBook(index: number){
    let modal = this.modalCtrl.create(LendBookPage, {index: +index});
    modal.present();
  }

}
