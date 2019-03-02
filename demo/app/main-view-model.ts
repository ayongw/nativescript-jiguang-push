import { Observable } from 'tns-core-modules/data/observable';
import { JiguangPush } from 'nativescript-jiguang-push';

export class HelloWorldModel extends Observable {
  public message: string;
  private jiguangPush: JiguangPush;
  private versionName: string;

  constructor() {
    super();

    this.jiguangPush = new JiguangPush();
    this.message = this.jiguangPush.message;

    this.versionName = this.jiguangPush.getVersion();
  }
}
