import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { PhaserScroller } from '../../directives/phaser';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  phaserScroller: any;

  constructor(public navCtrl: NavController,  public events: Events, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  ionViewDidEnter() {
    console.log("at ionViewDidEnter calling this.setPhaserScroller()");
    this.setPhaserScroller();
  }
  setPhaserScroller() {
    console.log("at setPhaserScroller");
    const self = this;
    if (!this.phaserScroller) {
      console.log("at setPhaserScroller, this.phaserScroller is falsy");
      self.phaserScroller = new PhaserScroller();
      self.phaserScroller.setGame();
    } else if (!this.phaserScroller.phaserObj) {
      console.log('at setPhaserScroller this.phaserScroller.phaserObj is falsy ');
      setTimeout(function () {
        self.phaserScroller.setGame();
      }, 300);
    } else {
      console.log('at setPhaserScroller this.phaserScroller.phaserObj is not null ', this.phaserScroller.phaserObj.id);

    }

  }

}
export interface ParentComponentApi {
  callParentMethod: (string) => void
}