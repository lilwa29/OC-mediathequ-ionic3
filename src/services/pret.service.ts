import {CdModele} from "../modeles/Cd.modele";
import {LivreModele} from "../modeles/Livre.modele";

export class PretService {
  livres : LivreModele[] = [];
  cds : CdModele[] = [];
  constructor(){
    this.initService();
  }
  initService(){
    this.cds = [
      { title : 'OverExposed',
        singer: 'Maroon5',
        isLent: true },
      { title : 'Love On Top',
        singer: 'Beyoncé',
        isLent: false },
      { title : 'Unplugged',
        singer: 'The Corrs',
        isLent: false }
    ];
    this.livres = [
      { title : 'Orgeuil et Préjugés',
        author: 'Jane Austen',
        summary: 'Pourvus de cinq filles à marier, Mr et Mrs Bennett espèrent que l\'une d\'elles saura plaire à Mr Bingley , leur riche nouveau voisin. Malheureusement l\'orgueilleux Mr Darcy, ami influent de Bingley , voit d\'un très mauvais oeil son ami s\'éprendre de Jane Bennett',
        isLent: false },
      { title : 'Le cycle des robots, Tome 1',
        author: 'Isaac Asimov',
        summary: 'Susan Calvin est robopsychologue à l\'United States Robots, Inc. Née en 1982, elle a aujourd\'hui 75 ans. Ce livre relate ses souvenirs sur l\'évolution du robot dans l\'histoire humaine, depuis Robbie qui, en 1996, fut vendu comme bonne d\'enfants jusqu\'à Byerley qui devient président de la Fédération mondiale terrestre en 2044',
        isLent: true },

    ];

  }
}
