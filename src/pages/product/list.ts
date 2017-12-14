import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {ProductSublistPage} from "./sublist";

@Component({
    selector: "page-list",
    templateUrl: "list.html"
})
export class ProductListPage {

    items: Array<{ id: number, title: string, image: string, description: string, category: string, status: string }> = [];

    constructor(public navCtrl: NavController) {
        this.items = [
            {
                id: 1,
                title: "sushi",
                image: "assets/imgs/app/1.jpg",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet asperiores cumque eius explicabo fugiat id inventore, labore laborum magni minima molestias odio placeat possimus, reprehenderit saepe vero? Deleniti, soluta!",
                category: "comida",
                status: "A"
            },
            {
                id: 2,
                title: "brasa",
                image: "assets/imgs/app/b.jpg",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet asperiores cumque eius explicabo fugiat id inventore, labore laborum magni minima molestias odio placeat possimus, reprehenderit saepe vero? Deleniti, soluta!",
                category: "comida",
                status: "A"
            },
            {
                id: 3,
                title: "parrilla",
                image: "assets/imgs/app/a.jpg",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet asperiores cumque eius explicabo fugiat id inventore, labore laborum magni minima molestias odio placeat possimus, reprehenderit saepe vero? Deleniti, soluta!",
                category: "comida",
                status: "A"
            },
            {
                id: 4,
                title: "jugos",
                image: "assets/imgs/app/c.jpg",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet asperiores cumque eius explicabo fugiat id inventore, labore laborum magni minima molestias odio placeat possimus, reprehenderit saepe vero? Deleniti, soluta!",
                category: "bebida",
                status: "A"
            },
            // {title:"Bocadillo, Torta, Keke",image:"assets/imgs/app/3.jpg",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet asperiores cumque eius explicabo fugiat id inventore, labore laborum magni minima molestias odio placeat possimus, reprehenderit saepe vero? Deleniti, soluta!",category:"postre",status:"A"},
            // {title:"menu",image:"https://www.whitneyupdate.com/wp-content/uploads/2013/10/slider-sushi-mon-sushi-11.jpg",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet asperiores cumque eius explicabo fugiat id inventore, labore laborum magni minima molestias odio placeat possimus, reprehenderit saepe vero? Deleniti, soluta!",category:"comida",status:"A"},
            // {title:"soda",image:"https://www.whitneyupdate.com/wp-content/uploads/2013/10/slider-sushi-mon-sushi-11.jpg",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet asperiores cumque eius explicabo fugiat id inventore, labore laborum magni minima molestias odio placeat possimus, reprehenderit saepe vero? Deleniti, soluta!",category:"bebida",status:"A"},
            // {title:"jugo",image:"https://www.whitneyupdate.com/wp-content/uploads/2013/10/slider-sushi-mon-sushi-11.jpg",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet asperiores cumque eius explicabo fugiat id inventore, labore laborum magni minima molestias odio placeat possimus, reprehenderit saepe vero? Deleniti, soluta!",category:"bebida",status:"A"},
            // {title:"filtrante",image:"https://www.whitneyupdate.com/wp-content/uploads/2013/10/slider-sushi-mon-sushi-11.jpg",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet asperiores cumque eius explicabo fugiat id inventore, labore laborum magni minima molestias odio placeat possimus, reprehenderit saepe vero? Deleniti, soluta!",category:"bebida",status:"A"},
            // {title:"keke",image:"https://www.whitneyupdate.com/wp-content/uploads/2013/10/slider-sushi-mon-sushi-11.jpg",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet asperiores cumque eius explicabo fugiat id inventore, labore laborum magni minima molestias odio placeat possimus, reprehenderit saepe vero? Deleniti, soluta!",category:"postre",status:"A"},
            // {title:"bocadillo",image:"https://www.whitneyupdate.com/wp-content/uploads/2013/10/slider-sushi-mon-sushi-11.jpg",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet asperiores cumque eius explicabo fugiat id inventore, labore laborum magni minima molestias odio placeat possimus, reprehenderit saepe vero? Deleniti, soluta!",category:"postre",status:"A"},
            // {title:"pastel",image:"https://www.whitneyupdate.com/wp-content/uploads/2013/10/slider-sushi-mon-sushi-11.jpg",description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet asperiores cumque eius explicabo fugiat id inventore, labore laborum magni minima molestias odio placeat possimus, reprehenderit saepe vero? Deleniti, soluta!",category:"postre",status:"A"},
        ];
    }

    fnOpenSublist(objeto) {

        this.navCtrl.push(ProductSublistPage, objeto);
    }
}