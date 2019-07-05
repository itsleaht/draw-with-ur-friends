export default class User {
  private id: string = '';
  private createdAt: number = Date.now();
  private name: string = 'johndoe';

  constructor({id}: {id: string}) {
    this.id = id;
  }

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getCreatedAt() {
    return this.createdAt;
  }
}
