import {CdModel} from "../modeles/Cd.model";
import {BookModel} from "../modeles/Book.model";
import {Subject} from "rxjs";

export class LendService {
  books : BookModel[] = [];
  cds : CdModel[] = [];
  books$ = new Subject<BookModel[]>();
  cds$ = new Subject<CdModel[]>();

  constructor() {
    this.initService();
  }
  initService() {
    this.cds = [
      { title : 'OverExposed',
        singer: 'Maroon5',
        isLent: true,
        nameLent: 'Jane Doe'},
      { title : 'Love On Top',
        singer: 'Beyoncé',
        isLent: false ,
        nameLent: ''},
      { title : 'Unplugged',
        singer: 'The Corrs',
        isLent: false,
        nameLent: ''},
    ];
    this.books = [
      { title : 'Orgeuil et Préjugés',
        author: 'Jane Austen',
        summary: 'Pourvus de cinq filles à marier, Mr et Mrs Bennett espèrent que l\'une d\'elles saura plaire à Mr Bingley , leur riche nouveau voisin. Malheureusement l\'orgueilleux Mr Darcy, ami influent de Bingley , voit d\'un très mauvais oeil son ami s\'éprendre de Jane Bennett',
        isLent: false,
        nameLent: ''},
      { title : 'Le cycle des robots, Tome 1',
        author: 'Isaac Asimov',
        summary: 'Susan Calvin est robopsychologue à l\'United States Robots, Inc. Née en 1982, elle a aujourd\'hui 75 ans. Ce livre relate ses souvenirs sur l\'évolution du robot dans l\'histoire humaine, depuis Robbie qui, en 1996, fut vendu comme bonne d\'enfants jusqu\'à Byerley qui devient président de la Fédération mondiale terrestre en 2044',
        isLent: true,
        nameLent: 'Mélanie'},

    ];
  }
  lentOrGiveBackBook(index : number , nameLent: string ) {
    this._lentOrGiveBack(this.books[index], nameLent);
  }
  lentOrGiveBackCd(index : number , nameLent: string ) {
    this._lentOrGiveBack(this.cds[index], nameLent);
  }
  private _lentOrGiveBack(object: BookModel | CdModel, nameLent: string) {
    object.isLent = !object.isLent;
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
}
