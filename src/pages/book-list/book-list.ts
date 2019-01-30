import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuController, ModalController} from 'ionic-angular';
import {BookModel} from "../../modeles/Book.model";
import {LendService} from "../../services/lend.service";
import {LendBookPage} from "./lend-book/lend-book";
import {Subscription} from "rxjs";

@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})
export class BookListPage implements OnInit, OnDestroy {

  booksList: BookModel[];
  booksSubscription : Subscription;

  constructor(private modalCtrl: ModalController,
              private lendService: LendService,
              private menuCtrl: MenuController) { }

  onToggleMenu(){
    this.menuCtrl.open();
  }

  ngOnInit(): void {
    this.booksSubscription = this.lendService.books$.subscribe(
      (booksList) => {
        this.booksList = booksList;
      }
    );
    this.lendService.fetchDataFromStorage();
  }

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
  }

  onLoadBook(index: number){
    let modal = this.modalCtrl.create(LendBookPage, {index: +index});
    modal.present();
  }
}
