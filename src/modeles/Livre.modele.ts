export class LivreModele {
  isLent : boolean;
  constructor(public title: string, public author: string, public summary: string){
    this.isLent = false;
  }
}