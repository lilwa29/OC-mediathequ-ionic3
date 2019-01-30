import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {BookModel} from "../../../modeles/Book.model";
import {LendService} from "../../../services/lend.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'page-lend-book',
  templateUrl: 'lend-book.html',
})
export class LendBookPage implements OnInit {
  book : BookModel;
  bookForm: FormGroup;
  index : number;

  constructor(public navParams: NavParams,
              private viewCtrl: ViewController,
              private lendService: LendService,
              private formBuilder: FormBuilder,
              private navCtrl: NavController) { }
  ngOnInit(){
    this.index = this.navParams.get('index');
    this.book = this.lendService.getBook(+this.index);
    this.initForm();
  }
  dismissModal(){
    this.viewCtrl.dismiss();
  }
  onToggleBook() {
    this.book.isLent = !this.book.isLent;
  }
  initForm(){
    this.bookForm = this.formBuilder.group({
      nameLent : ['', Validators.required]
    });
  }
  onSubmitForm(){
    let nameLent = '';
    if(this.book.isLent) {
      nameLent = this.bookForm.get('nameLent').value;
    }
    this.lendService.lentOrGiveBackBook(this.index, this.book.isLent, nameLent);
    this.navCtrl.pop();
  }
}
