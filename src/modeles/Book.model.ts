export class BookModel {
  isLent : boolean;
  constructor(public title: string,
              public author: string,
              public summary: string,
              public nameLent: string){
    this.isLent = false;

  }
}
