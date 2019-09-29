import Utils from '../helpers/Utils';

export default class Alert {
  public id: string = Utils.uuid();
  public type: string;
  public content: string;

  constructor(type: string, content: string) {
    this.type = type;
    this.content = content;
  }
}
