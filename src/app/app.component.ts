import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {ProductListPage} from "../pages/product/list";
import {Storage} from "@ionic/storage";
import {SHARED_PREFERENCES} from "./shared-preferences";
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {CartPage} from "../modals/cart/cart";

@Component({
    selector:"page-app",
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;
    pages: Array<{ title: string, icon: string, component: any, status: boolean }>;
    activePage: any;
    SP: any;

    constructor(public platform: Platform,
                public statusBar: StatusBar,
                public splashScreen: SplashScreen,
                private screenOrientation: ScreenOrientation,
                private storage: Storage) {

        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            {title: 'Home', icon: "fa-home", component: HomePage, status: false},
            {title: 'Producto', icon: "fa-cutlery", component: ProductListPage, status: false},
            // {title: 'Productos Destacados', icon: "fa-cutlery", component: ListPage},
            {title: 'Cesta', icon: "fa-shopping-cart", component: CartPage,status:false},
            // {title: 'Delivery', icon: "fa-truck", component: ListPage},
            // {title: 'Visa', icon: "fa-credit-card", component: ListPage},
            // {title: 'Cliente Plus', icon: "fa-cart-plus", component: ListPage},
            {title: 'Historial', icon: "fa-history", component: ListPage, status: false},
            {title: 'Locales', icon: "fa-map-marker", component: ListPage, status: false},
        ];

        this.activePage = this.pages[0];

        this.storage.get("SP").then((data) => {
            if (data != null) {
                this.SP = data;
                console.log("Loaded shared preferences cache!");
                this.storage.set("SP", SHARED_PREFERENCES).then((data) => {
                    this.SP = data;
                    console.log("Set new shared preferences!");
                })
            }
        });
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // if(this.platform.is("android")){
            //     this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
            // }
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
        this.activePage = page;
    }

    checkActive(page) {
        page.status = false;
        if (page == this.activePage) {
            return page.status = true;
        }
    }
}
