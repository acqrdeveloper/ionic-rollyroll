import {Component} from "@angular/core";
import {ViewController} from "ionic-angular";

@Component({
    templateUrl: "filter.html"
})
export class ProductFilterModal {
    constructor(public viewCtrl: ViewController,) {

    }

    back() {
        this.viewCtrl.dismiss();
    }

}