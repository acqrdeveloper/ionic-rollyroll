import {Injectable} from '@angular/core';
import {AlertController, AlertOptions, LoadingController} from "ionic-angular";

/*
  Generated class for the DialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DialogServiceProvider {

    public loading: any;
    public alert: any;

    constructor(public alertCtrl: AlertController,
                public loadingCtrl: LoadingController) {
    }

    public dialogNotification(message: string, btnOut ?: Function): void {
        this.alert = this.alertCtrl.create({
            title: "Warning",
            message: message,
            buttons: [
                {
                    text: "Aceptar",
                    role: "cancel",
                    handler: typeof (btnOut) === "function" ? btnOut : () => {
                    }
                }
            ]
        } as AlertOptions);
        this.alert.present();
    }

    public dialogQuestion(title: string = "Alert", message: string, btnYes: Function, btnNot?: Function): void {
        this.alert = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: [
                {
                    text: "Aceptar",
                    handler: typeof (btnYes) === "function" ? btnYes : () => {
                    }
                },
                {
                    text: "Cancelar",
                    role: "cancel",
                    handler: typeof (btnNot) === "function" ? btnNot : () => {
                    }
                }
            ]
        } as AlertOptions);
        this.alert.present();
    }

    public showLoading(content: string = "Cargando espere por favor...") {
        this.loading = this.loadingCtrl.create({
            content: content
        });
        this.loading.present();
    }

    public closeLoading() {
        this.loading.dismiss();
    }

}
