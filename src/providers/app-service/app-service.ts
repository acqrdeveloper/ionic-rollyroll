import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";
import {NotificationServiceProvider} from "../notification-service/notification-service";
import {Events} from "ionic-angular";
import {DialogServiceProvider} from "../dialog-service/dialog-service";
import {HttpClient} from "@angular/common/http";

/*
  Generated class for the AppServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppServiceProvider {

    private apiurl = "http://localhost:8000/";

    constructor(public storage: Storage,
                public event: Events,
                private http: HttpClient,
                public dialogService: DialogServiceProvider,
                public notifyService: NotificationServiceProvider) {

        // not implement

    }

    //Cart
    cleanStorage() {
        this.storage.clear().then(() => {
            this.notifyService.info("Storage cleaned successfully.");
            this.event.publish("eventLoadCart");
        })
    }

    loadCart(self) {
        this.storage.get("tempCart").then((data) => {
            if (data != null) {
                self.objCart = data;
            }
        });
    }

    addCart(self) {
        this.storage.get("tempCart")
            .then((data) => {
                if (data != null) {
                    self.objCart = data;
                }
                if (this.find(self, self.objProduct.id) != -1) {
                    this.notifyService.info("Item ya esta agregado.", 1500);
                } else {
                    self.objCart.cart.push({
                        "cart_item_id": self.objProduct.id,
                        "cart_item_image": self.objProduct.image,
                        "cart_item_name": self.objProduct.name,
                        "cart_item_price": Number(parseFloat(self.objProduct.price).toFixed(2)),
                        "cart_item_qty": 1
                    });
                    self.objCart.total_qty += 1;
                    self.objCart.total_amount += Number(parseFloat(self.objProduct.price).toFixed(2));
                    this.calcMount(self);
                    this.storage.set("tempCart", self.objCart)
                        .then(() => {
                            this.notifyService.info("Item agregado al carrito.", 1500);
                            this.event.publish("eventLoadCart");
                        })
                        .catch((error) => {
                            console.error(error);
                            this.notifyService.error("Error, Item no agregado.");
                        });
                }
            });
    }

    find(self, id) {
        let result = -1;
        for (let i = 0, len = self.objCart.cart.length; i < len; i++) {
            if (self.objCart.cart[i].cart_item_id === id) {
                result = i;
                break;
            }
        }
        return result;
    }

    dropCart(self, id) {
        this.dialogService.showLoading("Calculando...");
        let temp = self.objCart.cart[this.find(self, id)];//temporal
        self.objCart.total_qty -= 1;//recalcular items
        self.objCart.total_amount -= temp.cart_item_qty * temp.cart_item_price;//recalcular total
        this.calcMount(self);//recalcular IGV
        self.objCart.cart.splice(this.find(self, id), 1);//recalcular arreglo
        this.storage.set("tempCart", self.objCart).then(() => {
            this.notifyService.info("Item removido del carrito.");
            this.event.publish("eventLoadCart");
            this.dialogService.closeLoading();
        }).catch((error) => {
            this.dialogService.closeLoading();
            console.error(error);
            this.notifyService.error("Error, Item no removido.");
        })
    }

    incrementCart(self, id) {
        if (self.objCart.cart[this.find(self, id)].cart_item_qty <= 5) {
            this.dialogService.showLoading("Calculando...");
            self.objCart.cart[this.find(self, id)].cart_item_qty += 1;
            self.objCart.total_amount += Number(parseFloat(self.objCart.cart[this.find(self, id)].cart_item_price).toFixed(2));
            this.calcMount(self);
            this.storage.set("tempCart", self.objCart).then(() => {
                this.event.publish("eventLoadCart");
                this.dialogService.closeLoading();
            }).catch((error) => {
                this.dialogService.closeLoading();
                console.error(error);
                this.notifyService.error("Error, Item no se puede aumentar.");
            });
        } else {
            this.notifyService.info("Alcanzó el límite máximo de aumento.");
        }
    }

    decrementCart(self, id) {
        if (self.objCart.cart[this.find(self, id)].cart_item_qty !== 1) {
            this.dialogService.showLoading("Calculando...");
            self.objCart.cart[this.find(self, id)].cart_item_qty -= 1;
            self.objCart.total_amount -= Number(parseFloat(self.objCart.cart[this.find(self, id)].cart_item_price).toFixed(2));
            this.calcMount(self);
            this.storage.set("tempCart", self.objCart).then(() => {
                this.event.publish("eventLoadCart");
                this.dialogService.closeLoading();
            }).catch((error) => {
                this.dialogService.closeLoading();
                console.error(error);
                this.notifyService.error("Error, Item no se puede disminuir.");
            });
        }
    }

    private calcMount(self) {
        //NOTA: (Impuesto General a las Ventas)
        //Monto sin IGV = let igv = total_monto * 0.18
        //Monto con IGV = let neto = total_monto/1.18
        //Nuevo IGV let igv = total_monto - neto
        self.objCart.total_amount = Number(parseFloat(self.objCart.total_amount).toFixed(2));
        self.objCart.subtotal = Number(self.objCart.total_amount / 1.18);
        self.objCart.subtotal = Number(parseFloat(self.objCart.subtotal).toFixed(2));
        self.objCart.igv = Number(self.objCart.total_amount - self.objCart.subtotal);
        self.objCart.igv = Number(parseFloat(self.objCart.igv).toFixed(2));
    }

    //Product
    loadProducts(self) {
        this.dialogService.showLoading();
        self.objProducts = [];
        switch (self.params.data.id) {
            case 1:
                // self.objProducts = [
                //     {
                //         id: 1,
                //         name: "sashimi de osomaki",
                //         image: "assets/imgs/app/1.jpg",
                //         description: "40 pieza(s) + 4 trozo(s) de calamar dorado + 2 manzanas acaramelada(s).",
                //         price: "39.99",
                //         status: "A"
                //     },
                //     {
                //         id: 2,
                //         name: "tinaku minaku",
                //         image: "assets/imgs/app/2.jpg",
                //         description: "24 pieza(s) + 8 pierna(s) asadas de pollo + 8 trozos de calamar dorado.",
                //         price: "18.99",
                //         status: "A"
                //     },
                //     {
                //         id: 3,
                //         name: "maki solid shell",
                //         image: "assets/imgs/app/3.jpg",
                //         description: "12 pieza(s) + 1/4 de pollo a la brasa + 1 porcion de arroz + 1 porcion de papas + cremas + gaseosa o cafe.",
                //         price: "10.99",
                //         status: "A"
                //     },
                //     {
                //         id: 4,
                //         name: "nosaki oroyama",
                //         image: "assets/imgs/app/4.jpg",
                //         description: "64 pieza(s) + 1 gaseosa(s) + 1 porcion de papas + cremas + 2 manzana(s) acaramelada(s).",
                //         price: "99.00",
                //         status: "A"
                //     },
                //     {
                //         id: 5,
                //         name: "tairi ordo",
                //         image: "assets/imgs/app/5.jpg",
                //         description: "2 pieza(s) + 1 pollo a la brasa + 6 manzana(s) acaramelada(s).",
                //         price: "5.99",
                //         status: "A"
                //     }
                // ];
                this.productAll(self);
                break;
            case 2:
                self.objProducts = [
                    {
                        id: 1,
                        name: "1/4 de Pollo a la Brasa",
                        image: "assets/imgs/app/1.jpg",
                        description: "pollo + papas fritas + cremas + ensalada",
                        price: "16.99",
                        status: "A",
                    },
                    {
                        id: 2,
                        name: "1/2 Pollo a la Brasa",
                        image: "assets/imgs/app/1.jpg",
                        description: "pollo + papas fritas + cremas + ensalada",
                        price: "29.99",
                        status: "A",
                    },
                    {
                        id: 3,
                        name: "1 Pollo a la Brasa",
                        image: "assets/imgs/app/1.jpg",
                        description: "pollo + papas fritas + cremas + ensalada",
                        price: "59.99",
                        status: "A",
                    }
                ];
                break;
            case 3:
                console.log("parrilla");
                break;
            case 4:
                console.log("jugos");
                break;
        }
        this.dialogService.closeLoading();
    }

    private api(method: string, uri: string, params: any = null, headers: any = null) {
        // private api(objHttp: any = {method: "GET", url: "http", headers: {"X-CSRF-TOKEN":"hash"}, params: {data:"data"}}) {
        //Test:
        /*
         * https://httpbin.org/get
         * https://httpbin.org/post
         * https://httpbin.org/put
         * https://httpbin.org/delete
         */
        return new Promise(resolve => {
            switch (method) {
                case "PUT":
                    this.http.put(uri, {
                        headers: headers,
                        params: params
                    }).subscribe((data) => {
                        resolve(data);
                    }, (error) => {
                        console.error(error);
                    });
                    break;
                case "POST":
                    this.http.post(uri, {
                        headers: headers,
                        params: params
                    }).subscribe((data) => {
                        resolve(data);
                    }, (error) => {
                        console.error(error);
                    });
                    break;
                case "DELETE":
                    this.http.delete(uri, {
                        headers: headers,
                        params: params
                    }).subscribe((data) => {
                        resolve(data);
                    }, (error) => {
                        console.error(error);
                    });
                    break;
                default:
                    this.http.get(uri, {
                        headers: headers,
                        params: params
                    }).subscribe((data) => {
                        resolve(data);
                    }, (error) => {
                        console.error(error);
                    });
                    break;
            }
        });
    }

    private productAll(self) {
        return this.api("GET", this.apiurl + "product-all").then((rpta) => {
            console.log(rpta.data);
            self.objProducts = rpta.data;
        })
    }
}