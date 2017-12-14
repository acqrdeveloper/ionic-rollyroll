import {Component} from '@angular/core';
import {ModalController, NavController, NavParams, ViewController} from 'ionic-angular';

@Component({
    selector: "modal-help",
    templateUrl: "help.html",
})
export class CartHelpModal{

    constructor(
        public navCtrl: NavController,
        public viewCtrl: ViewController,
        public navParams: NavParams) {
        //implement
    }

    back(){
        this.viewCtrl.dismiss();
    }



}