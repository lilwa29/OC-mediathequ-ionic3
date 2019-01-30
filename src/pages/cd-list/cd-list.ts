import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuController, ModalController} from 'ionic-angular';
import {LendService} from "../../services/lend.service";
import {CdModel} from "../../modeles/Cd.model";
import {LendCdPage} from "./lend-cd/lend-cd";
import {Subscription} from "rxjs";

@Component({
  selector: 'page-cd-list',
  templateUrl: 'cd-list.html',
})
export class CdListPage implements OnInit, OnDestroy {
  cdsList: CdModel[];
  cdsSubscription : Subscription;

  constructor(private modalCtrl: ModalController,
              private lendService: LendService,
              private menuCtrl: MenuController) { }

  onToggleMenu(){
    this.menuCtrl.open();
  }

  ngOnInit(): void {
    this.cdsSubscription = this.lendService.cds$.subscribe(
      (cdsList) => {
        this.cdsList = cdsList;
      }
    );
    this.lendService.fetchDataFromStorage();
  }
  ngOnDestroy(): void {
    this.cdsSubscription.unsubscribe();
  }
  onLoadCd(index: number){
    let modal = this.modalCtrl.create(LendCdPage, {index: index});
    modal.present();
  }
}
