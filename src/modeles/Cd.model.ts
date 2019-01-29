export class CdModel {
  isLent: boolean;
  constructor(public title: string,
              public singer: string,
              public nameLent: string){
    this.isLent = false;
  }
}
