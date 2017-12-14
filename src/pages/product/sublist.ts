import {Component, OnDestroy} from "@angular/core";
import {Events, ModalController, NavController, NavParams} from "ionic-angular";
import {ProductDetailPage} from "./detail";
import {ProductFilterModal} from "../../modals/product/filter";
import {CartPage} from "../../modals/cart/cart";
import {AppServiceProvider} from "../../providers/app-service/app-service";

@Component({
    selector: "page-sublist",
    templateUrl: "sublist.html"
})
export class ProductSublistPage implements OnDestroy{

    ngOnDestroy(): void {
        this.event.unsubscribe("eventLoadCart");
        console.log("events destroyed successfully!");
    }

    public objProducts: Array<{ id: number, name: string, image: string, description: string, price: any, status: string }> = [];
    public objCart: any = {cart: [], total_amount:0, total_qty: 0};
    public categoria:any;

    constructor(public modalCtrl: ModalController,
                public appService: AppServiceProvider,
                public event:Events,
                public params:NavParams,
                public navCtrl: NavController) {

        this.categoria = this.params.data;

        this.appService.loadCart(this);
        this.appService.loadProducts(this);

        this.event.subscribe("eventLoadCart",() => {
            this.appService.loadCart(this);
        });

    }

    openModalDetail(objeto) {
        this.navCtrl.push(ProductDetailPage, {producto_detalle: objeto});
    }

    openModalFilter() {
        (this.modalCtrl.create(ProductFilterModal)).present();
    }

    openModalCart() {
        this.navCtrl.push(CartPage);
    }

}