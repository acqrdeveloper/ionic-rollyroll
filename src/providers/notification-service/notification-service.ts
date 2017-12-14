import { Injectable } from '@angular/core';
import {ToastController} from "ionic-angular";

/*
  Generated class for the NotificationServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationServiceProvider {

    public toast: any;

    constructor(public toastCtrl: ToastController) {}

    public info(message: string, duration: number = 3000, showButton: boolean = true): void {
        this.toast = this.toastCtrl.create({
            message: message,
            duration: duration,
            position: "bottom",
            showCloseButton: showButton,
            closeButtonText: "CERRAR",
        });

        // this.toast.onDidDismiss(() => {
        //     console.log("click cancel");
        // });

        this.toast.present();
    }

    public error(message: string): void {
        this.toast = this.toastCtrl.create({
            message: message,
            duration: 0,
            position: "bottom",
            showCloseButton: true,
            closeButtonText: "CERRAR",
        });
        this.toast.present();
    }

}
