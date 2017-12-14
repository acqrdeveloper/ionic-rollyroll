import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';


import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AppServiceProvider} from '../providers/app-service/app-service';
import {DialogServiceProvider} from '../providers/dialog-service/dialog-service';
import {NotificationServiceProvider} from '../providers/notification-service/notification-service';
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {CatalogoPage} from "../pages/catalogo/catalogo";
import {ProductListPage} from "../pages/product/list";
import {ProductSublistPage} from "../pages/product/sublist";
import {ProductDetailPage} from "../pages/product/detail";
import {ProductFilterModal} from "../modals/product/filter";
import {IonicStorageModule} from "@ionic/storage";
import {HttpClientModule} from "@angular/common/http";

import {CartPage} from "../modals/cart/cart";
import {CartHelpModal} from "../modals/cart/help";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        CatalogoPage,
        ProductListPage,
        ProductSublistPage,
        ProductDetailPage,
        ProductFilterModal,
        CartPage,
        CartHelpModal,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot({
            name: '__mydb',
            driverOrder: ['indexeddb', 'sqlite', 'websql']
        }),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage,
        CatalogoPage,
        ProductListPage,
        ProductSublistPage,
        ProductDetailPage,
        ProductFilterModal,
        CartPage,
        CartHelpModal,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ScreenOrientation,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AppServiceProvider,
        DialogServiceProvider,
        NotificationServiceProvider,
    ]
})
export class AppModule {
}
