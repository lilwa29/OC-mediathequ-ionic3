import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {LendService} from "../../../services/lend.service";
import {CdModel} from "../../../modeles/Cd.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'page-lend-cd',
  templateUrl: 'lend-cd.html',
})
export class LendCdPage {
  cd : CdModel;
  cdForm: FormGroup;
  index : number;

  constructor(public navParams: NavParams,
              private viewCtrl: ViewController,
              private lendService: LendService,
              private formBuilder: FormBuilder,
              private navCtrl: NavController) { }
  ngOnInit(){
    this.index = this.navParams.get('index');
    this.cd = this.lendService.getCd(+this.index);
    this.initForm();
  }
  dismissModal(){
    this.viewCtrl.dismiss();
  }
  onToggleCd() {
    this.cd.isLent = !this.cd.isLent;
  }
  initForm(){
    this.cdForm = this.formBuilder.group({
      nameLent : ['', Validators.required]
    });
  }
  onSubmitForm(){
    let nameLent = '';
    if(this.cd.isLent) {
      nameLent = this.cdForm.get('nameLent').value;
    }
    this.lendService.lentOrGiveBackCd(this.index, this.cd.isLent, nameLent);
    this.navCtrl.pop();
  }
}
