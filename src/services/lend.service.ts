import {CdModel} from "../modeles/Cd.model";
import {BookModel} from "../modeles/Book.model";
import {Subject} from "rxjs";
import * as firebase from "firebase";
import DataSnapshot = firebase.database.DataSnapshot;
import {Injectable} from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable()
export class LendService {
  books : BookModel[] = [];
  cds : CdModel[] = [];
  books$ = new Subject<BookModel[]>();
  cds$ = new Subject<CdModel[]>();

  constructor(private storage: Storage) { }

  // Rendre ou Récupérer un Livre
  lentOrGiveBackBook(index : number , isLent : boolean, nameLent: string ) {
    this._lentOrGiveBack(this.books[index], isLent, nameLent);
    this.saveBooksInStorage();
    this.emitBooksSubject();
  }

  // Rendre ou Récupérer un Cd
  lentOrGiveBackCd(index : number , isLent : boolean, nameLent: string ) {
    this._lentOrGiveBack(this.cds[index], isLent, nameLent);
    this.saveCdsInStorage();
    this.emitCdsSubject();
  }
  private _lentOrGiveBack(object: BookModel | CdModel, isLent : boolean, nameLent: string) {
    object.isLent = isLent;
    object.nameLent = nameLent;
  }
  emitBooksSubject() {
    this.books$.next(this.books.slice());
  }
  emitCdsSubject() {
    this.cds$.next(this.cds.slice());
  }

  // Envoyer une copie de l'objet CdModel désiré
  getCd(index: number) {
    return Object.assign({}, this.cds[index]);
  }
  // Envoyer une copie de l'objet BookModek désiré
  getBook(index: number) {
    return Object.assign({}, this.books[index]);
  }

  /**** STOCKAGE/RECUPERATION dans/depuis le STORAGE DU DEVICE ***/
  saveBooksInStorage(){
    this.storage.set('books', this.books);
  }
  saveCdsInStorage(){
    this.storage.set('cds', this.cds);
  }
  fetchDataFromStorage(){
    this.storage.get('books').then(
      (books) => {
        if (books && books.length) {
          this.books = books;
        }
        this.emitBooksSubject();
      }
    );
    this.storage.get('cds').then(
      (cds) => {
        if (cds && cds.length) {
          this.cds = cds;
        }
        this.emitCdsSubject();
      }
    );
  }

  /*** BACKEND BASE DE DONNEES FIREBASE ***/
  saveBooks() {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('books').set(this.books).then(
          (data: DataSnapshot) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
  saveCds() {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('cds').set(this.cds).then(
          (data: DataSnapshot) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
  saveData() {
    return new Promise(
      (resolve, reject) => {
        this.saveBooks().then(
          () => {
            this.saveCds().then(
              () => {
                resolve("Données sauvegardées");
              },
              (error) => {
                reject("Problème dans la sauvegarde des Cds : " + error);
              }
            )
          },
          (error) => {
            reject("Problème dans la sauvegarde des Livres : " + error);
          }
        );
      }
    );
  }
  fetchBooks() {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('books').once('value').then(
          (data: DataSnapshot) => {
            this.books = data.val();
            this.saveBooksInStorage();
            this.emitBooksSubject();
            resolve('Livres récupérés avec succès');
          }, (error) => {
            reject(error);
          }
        )
      }
    )
  }
  fetchCds() {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('cds').once('value').then(
          (data: DataSnapshot) => {
            this.cds = data.val();
            this.saveCdsInStorage();
            this.emitCdsSubject();
            resolve('Cds récupérés avec succès');
          }, (error) => {
            reject(error);
          }
        )
      }
    )
  }
  fetchData(){
    return new Promise(
      (resolve, reject) => {
        this.fetchBooks().then(
          () => {
            this.fetchCds().then(
              () => {
                resolve('Données récupérées');
              },
              (error) => {
                reject('Erreur dans la récupération des Cds : ' + error);
              });
          },
          (error) => {
            reject('Erreur dans la récupération des Livres : ' + error);
          });
      });
  }
}
