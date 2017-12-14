import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {ScreenOrientation} from "@ionic-native/screen-orientation";
// import {SQLite, SQLiteObject} from "@ionic-native/sqlite";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController,
                private screenOrientation: ScreenOrientation,
                // private sqlite: SQLite,
                public platform: Platform) {

        // set to landscape
        // if (this.platform.is("android"))
        //     this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);


        // this.sqlite.create({name: 'data.db', location: 'default'})
        //     .then((db: SQLiteObject) => {
        //         db.executeSql("CREATE TABLE danceMoves(name VARCHAR(32))", {})
        //             .then(() => console.log('Executed SQL'))
        //             .catch((e) => console.error(e));
        //
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });

    }

}
