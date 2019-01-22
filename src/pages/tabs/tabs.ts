import { Component } from '@angular/core';
import {CdListPage} from "../cd-list/cd-list";
import {BookListPage} from "../book-list/book-list";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  cdListPage = CdListPage;
  bookListPage = BookListPage;
}
