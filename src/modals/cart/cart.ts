import {Component, ComponentFactory, NgModule, ViewChild} from '@angular/core';
import {AlertController, LoadingController, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {AppServiceProvider} from "../../providers/app-service/app-service";
import {Storage} from "@ionic/storage";
import {PayPal, PayPalConfiguration, PayPalPayment} from "@ionic-native/paypal";
import {CartHelpModal} from "./help";

/**
 * Generated class for the ShoppingCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-cart',
    templateUrl: 'cart.html',
    providers: [PayPal]
})
export class CartPage {

    public objCart: any = {cart: [], total_amount: 0, total_qty: 0, igv: 0, subtotal: 0};
    public objProduct: any;
    SP: any;

    constructor(public navCtrl: NavController,
                public viewCtrl: ViewController,
                public alertCtrl: AlertController,
                public modalCtrl: ModalController,
                public appService: AppServiceProvider,
                private storage: Storage,
                private payPal: PayPal,
                private loadingCtrl: LoadingController,
                public navParams: NavParams) {

        this.load();

        this.storage.get("SP").then((data) => {
            this.SP = data;
        });

        // setTimeout(()=>{
        //     this.storage.remove("tempCart").then(()=>{
        //         console.log("Se ah eliminado el carrito temporal!");
        //     })
        // },(4.5 * 60000 /* ejecucion en horas */ ))

    }

    help() {
        (this.modalCtrl.create(CartHelpModal)).present();
    }

    load() {
        this.appService.loadCart(this);
    }

    drop(id) {
        this.appService.dropCart(this, id)
    }

    clean() {
        this.appService.cleanStorage();
    }

    increment(id) {
        this.appService.incrementCart(this, id);
    }

    decrement(id) {
        this.appService.decrementCart(this, id);
    }

    toDecimal(value) {
        return parseFloat(value).toFixed(2);
    }

    alertFormasdePago() {
        let alert = this.alertCtrl.create();
        alert.setTitle("Formas de Pago");
        alert.addInput({
            type: 'radio',
            label: 'Con Paypal',
            value: 'paypal',
            checked: this.SP.PAYPAL
        });
        alert.addInput({
            type: 'radio',
            label: 'Con POS al entregar',
            value: 'pos',
            checked: this.SP.POS
        });
        alert.addButton('Cancelar');
        alert.addButton({
            text: 'Aceptar',
            handler: (value) => {
                if (value == "paypal") {
                    this.SP.PAYPAL = true;
                    this.SP.POS = false;
                } else if (value == "pos") {
                    this.SP.POS = true;
                    this.SP.PAYPAL = false;
                }
                this.storage.set("SP", this.SP).then((data) => {
                    console.log(data);
                    console.log("Updated shared preferences");
                    this.pay();
                })
            }
        });
        alert.present();
    }

    private pay() {
        this.payPal.init({
            PayPalEnvironmentProduction: '',
            PayPalEnvironmentSandbox: 'AUsujy3H6a6r7TgArG1tNAONQIzkP0arNAy2qcMbbNjONwKzTIpYbaoGPk51OFA5MNNAba0Gy9GS7t5K'
        }).then(() => {
            // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
            this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
                // Only needed if you get an "Internal Service Error" after PayPal login!
                //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
            })).then(() => {
                let payment = new PayPalPayment('3.33', 'USD', 'Description', 'sale');
                this.payPal.renderSinglePaymentUI(payment).then((response) => {

                    // alert(`Successfully paid. Status = ${response.response.state}`);
                    console.log(response);

                    // Successfully paid

                    // Example sandbox response
                    //
                    // {
                    //   "client": {
                    //     "environment": "sandbox",
                    //     "product_name": "PayPal iOS SDK",
                    //     "paypal_sdk_version": "2.16.0",
                    //     "platform": "iOS"
                    //   },
                    //   "response_type": "payment",
                    //   "response": {
                    //     "id": "PAY-1AB23456CD789012EF34GHIJ",
                    //     "state": "approved",
                    //     "create_time": "2016-10-03T13:33:33Z",
                    //     "intent": "sale"
                    //   }
                    // }
                }, () => {
                    console.error('Error or render dialog closed without being successful');
                    // Error or render dialog closed without being successful
                });
            }, () => {
                console.error('Error in configuration');
                // Error in configuration
            });
        }, () => {
            console.error('Error in initialization, maybe PayPal isn\'t supported or something else');
            // Error in initialization, maybe PayPal isn't supported or something else
        });
    }

}