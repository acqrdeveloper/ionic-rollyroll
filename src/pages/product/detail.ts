import {Component} from "@angular/core";
import {NavController, NavParams, ViewController} from "ionic-angular";
import {AppServiceProvider} from "../../providers/app-service/app-service";

@Component({
    selector: "page-detail",
    templateUrl: "detail.html"
})
export class ProductDetailPage {

    public objCart: any = {cart: [], total_amount: 0, total_qty:0,igv:0,subtotal:0};
    public objProduct: any;

    constructor(public navCtrl: NavController,
                public viewCtrl: ViewController,
                public appService: AppServiceProvider,
                public navParams: NavParams) {

        this.objProduct = this.navParams.data.producto_detalle;

    }

    addCart() {
        this.appService.addCart(this);
    }

}