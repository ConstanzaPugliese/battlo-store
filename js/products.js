window.onload = function () {

/////////////////////////////////////// E N T I D A D E S ////////////////////////////////////////////////////////////

class Product {
    constructor (id, link, img, img_text, name, price, installment_value, stock, available, color, category, bag_category, bag_name) {
        this.id = id;
        this.link = link;
        this.img = img;
        this.img_text = img_text;
        this.name = name;
        this.price = price;
        this.installment_value = installment_value;
        this.stock = stock;
        this.available = available;
        this.color = color;
        this.category = category;
        this.bag_category = bag_category;
        this.bag_name = bag_name;
    }
    preSale (date, preStock) {
        this.img_text = `Pre venta ${date}`;
        this.stock = preStock;
        //pasada la fecha de entrega de las compras de pre venta, sacar jumbotron
        //enviar newsletter
        if (this.available === false) {
            this.available = true;
            //habilitar botón de compra
            //enviar mail al cliente interesado
        }
    }
    limitedEdition (setStock) {
        this.img_text = `Edición limitada`;
        /*let createJumbotron = document.getElementById(`createJumbotron`)
        let jumbotron = document.createElement(`div`)
        jumbotron.setAttribute(`class`, `jumbotron jumbotron-absolute`)
        createJumbotron.appendChild(jumbotron)
        let spanJumbotron = document.createElement(`span`)
        spanJumbotron.setAttribute(`class`, `text-uppercase`)
        jumbotron.appendChild(spanJumbotron)
        let boldSpanJumbotron = document.createElement(`b`)
        boldSpanJumbotron.textContent = `Edición limitada`
        spanJumbotron.prepend(boldSpanJumbotron)*/
        this.stock = setStock;
        //no permitir volver a cargar stock
        //enviar newsletter con conteo del stock en tiempo real
    }
    discount (percent, limit) {
        this.img_text = `${percent}% off`;
        let priceWithDiscount = this.price - ((this.price * percent) / 100);
        this.price = priceWithDiscount;
        this.installment_value = priceWithDiscount / 6;
        //tachar precio viejo
        //setear durante cuánto tiempo y/o artículos se venderán a ese precio
        //enviar newsletter
    }
    newStock(newStock) {
        let addStock = this.stock + newStock;
        this.stock = addStock;
        if (this.available === false) {
            this.available = true;
            this.img_text = `${this.category}`; //temporal hasta setear eliminar el jumbotron
            //habilitar botón de compra
            //enviar mail al cliente interesado
        }
    }
    newPrice(newPrice) {
        this.price = newPrice;
        this.installment_value = newPrice / 6;
        //actualizar precio etiqueta meta
    }
}

/////////////////////////////////////////////// V A R I A B L E S ////////////////////////////////////////////////////

const main = document.getElementById(`cardsProducts`)
const title = document.createElement(`h1`)
title.setAttribute(`class`, `col-lg-12 col-xs-12 my-4`)
title.textContent = `Productos`
main.prepend(title)
// P R O D U C T O S //
const Products = []
let kendall_barbiepink = new Product (1, `../pages/products/kendall_barbiepink.html`, `../assets/kendall_barbiepink.jpeg`, `Pre venta`, `Kendall Rosa Barbie`, 3190, 531.67, 10, true, `barbiepink`, `bags`, `minibags`, `Kendall`)
let kylie_barbiepink = new Product (2, `../pages/products/kylie_barbiepink.html`, `../assets/kylie_barbiepink.jpeg`, `Pre venta`, `Kylie Rosa Barbie`, 4990, 831.67, 10, true, `barbiepink`, `bags`, `minibags`, `Kylie`)
let kylie_bottlegreen_limitededition = new Product (3, `../pages/products/kylie_bottlegreen_limitededition.html`, `../assets/kylie_bottlegreen_limitededition.jpeg`, `Edición limitada`, `Kylie Verde Botella`, 4990, 831.67, 10, true, `bottlegreen`, `bags`, `minibags`, `Kylie`)
let kylie_cream = new Product (4, `../pages/products/kylie_cream.html`, `../assets/kylie_cream.jpeg`, `Pre venta`, `Kylie Crema`, 4990, 831.67, 10, true, `cream`, `bags`, `minibags`, `Kylie`)
let kim_tomato = new Product (5, `../pages/products/kim_tomato.html`, `../assets/kim_tomato.jpg`, `Pre venta`, `Kim Tomate`, 4990, 831.67, 10, true, `tomato`, `bags`, `minibags`, `Kim`)
let kylie_black_crocco_limitededition = new Product (6, `../pages/products/kylie_black_crocco_limitededition.html`, `../assets/kylie_black_crocco_limitededition.jpg`, `Edición limitada`, `Kylie Negra Crocco`, 4990, 831.67, 10, true, `black`, `bags`, `minibags`, `Kylie`)
let kim_chocolate_crocco = new Product (7, `../pages/products/kim_chocolate_crocco.html`, `../assets/kim_chocolate_crocco.jpg`, `Pre venta`, `Kim Chocolate Crocco`, 4990, 831.67, 10, true, `chocolate`, `bags`, `minibags`, `Kim`)
let kim_black_crocco = new Product (8, `../pages/products/kim_black_crocco.html`, `../assets/kim_black_crocco.jpg`, `Sin stock`, `Kim Negra Crocco`, 4990, 831.67, 0, false, `black`, `bags`, `minibags`, `Kim`)
let gigi_black_patent_crocco = new Product (9, `../pages/products/gigi_black_patent_crocco.html`, `../assets/gigi_black_patent_crocco`, `Pre venta`, `Gigi Negra Charol Crocco`, 5490, 915, 10, true, `black`, `bags`, `totebags`, `Gigi`)
let gigi_black_crocco = new Product (10, `../pages/products/gigi_black_crocco.html`, `../assets/gigi_black_crocco`, `Pre venta`, `Gigi Negra Crocco`, 5490, 915, 10, true, `black`, `bags`, `totebags`, `Gigi`)
let kendall_tomato = new Product (11, `../pages/products/kendall_tomato.html`, `../assets/kendall_tomato`, `Minibag`, `Kendall Tomate`, 3190, 531.67, 10, true, `tomato`, `bags`, `minibags`, `Kendall`)
let kendall_blue = new Product (12, `../pages/products/kendall_blue.html`, `../assets/kendall_blue`, `Minibag`, `Kendall Azul`, 3190, 531.67, 10, true, `blue`, `bags`, `minibags`, `Kendall`)
let kendall_navyblue = new Product (13, `../pages/products/kendall_navyblue.html`, `../assets/kendall_navyblue`, `Minibag`, `Kendall Azul Marino`, 3190, 531.67, 10, true, `navyblue`, `bags`, `minibags`, `Kendall`)
let west = new Product (14, `../pages/products/west.html`, `../assets/west`, `Cinto`, `West`, 2390, 398.33, 10, true, `black`, `belts`, `none`, `none`)
let cross = new Product (15, `../pages/products/cross.html`, `../assets/cross`, `Cinto`, `Cross`, 2390, 398.33, 10, true, `black`, `belts`, `none`, `none`)
let strap_baby = new Product (16, `../pages/products/strap_baby.html`, `../assets/strap_baby`, `Oro`, `Correa Baby`, 1290, 215, 10, true, `gold`, `straps`, `none`, `none`)
let baguette_black_patent = new Product (17, `../pages/products/the-baguette-bag_black_patent.html`, `../assets/the-baguette-bag_black_patent`, `Oro`, `The Baguette Bag Negra Charol`, 3890, 648.33, 10, true, `black`, `bags`, `minibags`, `The Baguette Bag`)
let baguette_bottlegreen = new Product (18, `../pages/products/the-baguette-bag_bottlegreen.html`, `../assets/the-baguette-bag_bottlegreen`, `Minibag`, `The Baguette Bag Verde Botella`, 3890, 648.33, 10, true, `bottlegreen`, `bags`, `minibags`, `The Baguette Bag`)
let hailey_black_nylon = new Product (19, `../pages/products/hailey_black_nylon.html`, `../assets/hailey_black_nylon.jpg`, `Minibag`, `Hailey Negra Nylon`, 3190, 531.67, 10, true, `black`, `bags`, `minibags`, `Hailey`)
let gigi_bottlegreen = new Product (20, `../pages/products/gigi_bottlegreen.html`, `../assets/gigi_bottlegreen.jpg`, `Totebag`, `Gigi Verde Botella`, 5490, 915, 10, true, `bottlegreen`, `bags`, `totebags`, `Gigi`)
let kendall_sole = new Product (21, `../pages/products/kendall_sole.html`, `../assets/kendall_sole.jpg`, `Minibag`, `Kendall Suela`, 3190, 531.67, 10, true, `sole`, `bags`, `minibags`, `Kendall`)
let kendall_bottlegreen = new Product (22, `../pages/products/kendall_bottlegreen.html`, `../assets/kendall_bottlegreen.jpg`, `Minibag`, `Kendall Verde Botella`, 3190, 531.67, 10, true, `bottlegreen`, `bags`, `minibags`, `Kendall`)
let kendall_black_matte = new Product (23, `../pages/products/kendall_black_matte.html`, `../assets/kendall_black_matte.jpg`, `Minibag`, `Kendall Negra Mate`, 3190, 531.67, 10, true, `black`, `bags`, `minibags`, `Kendall`)
let kendall_chocolate_matte = new Product (24, `../pages/products/kendall_chocolate_matte.html`, `../assets/kendall_chocolate_matte.jpg`, `Minibag`, `Kendall Chocolate Mate`, 3190, 531.67, 10, true, `chocolate`, `bags`, `minibags`, `Kendall`)
let baguette_black_matte = new Product (25, `../pages/products/the-baguette-bag_black_matte.html`, `../assets/the-baguette-bag_black_matte.jpg`, `Minibag`, `The Baguette Bag Negra Mate`, 3890, 648.33, 10, true, `black`, `bags`, `minibags`, `The Baguette Bag`)
let baguette_pistachio_crocco = new Product (26, `../pages/products/the-baguette-bag_pistachio_crocco.html`, `../assets/the-baguette-bag_pistachio_crocco.jpg`, `Minibag`, `The Baguette Bag Pistacho Crocco`, 3890, 648.33, 10, true, `pistachio`, `bags`, `minibags`, `The Baguette Bag`)
let hannah_black_patent_crocco = new Product (27, `../pages/products/hannah_black_patent_crocco.html`, `../assets/hannah_black_patent_crocco.jpg`, `Minibag`, `Hannah Negra Charol Crocco`, 3890, 648.33, 10, true, `black`, `bags`, `minibags`, `Hannah`)
let britney_black_patent_crocco = new Product (28, `../pages/products/britney_black_patent_crocco.html`, `../assets/britney_black_patent_crocco.jpeg`, `Pre venta`, `Britney Negra Charol Crocco`, 3990, 665, 10, true, `black`, `bags`, `crossbody`, `Britney`)
let kendall_pistachio_crocco = new Product (29, `../pages/products/kendall_pistachio_crocco.html`, `../assets/kendall_pistachio_crocco.jpg`, `Minibag`, `Kendall Pistacho Crocco`, 3190, 531.67, 10, true, `pistachio`, `bags`, `minibags`, `Kendall`)
let kendall_orange_crocco = new Product (30, `../pages/products/kendall_orange_crocco.html`, `../assets/kendall_orange_crocco.jpg`, `Minibag`, `Kendall Naranja Crocco`, 3190, 531.67, 10, true, `orange`, `bags`, `minibags`, `Kendall`)
let baguette_chocolate_crocco = new Product (31, `../pages/products/the-baguette-bag_chocolate_crocco.html`, `../assets/the-baguette-bag_chocolate_crocco.jpeg`, `Minibag`, `The Baguette Bag Chocolate Crocco`, 3190, 531.67, 10, true, `chocolate`, `bags`, `minibags`, `The Baguette Bag`)
let kendall_black_patent_crocco = new Product (32, `../pages/products/kendall_black_patent_crocco.html`, `../assets/kendall_black_patent_crocco.jpeg`, `Minibag`, `Kendall Negra Charol Crocco`, 3190, 531.67, 10, true, `black`, `bags`, `minibags`, `Kendall`)
let kendall_black_crocco = new Product (33, `../pages/products/kendall_black_crocco.html`, `../assets/kendall_black_crocco.jpg`, `Minibag`, `Kendall Negra Crocco`, 3190, 531.67, 10, true, `black`, `bags`, `minibags`, `Kendall`)
let strap_lilac = new Product (34, `../pages/products/strap_lilac.html`, `../assets/strap_lilac.jpg`, `Correa`, `Correa Acrílica Lila`, 790, 131.67, 10, true, `lilac`, `straps`, `none`, `none`)
let strap_cream = new Product (35, `../pages/products/strap_cream.html`, `../assets/strap_cream.jpg`, `Correa`, `Correa Acrílica Crema`, 790, 131.67, 10, true, `cream`, `straps`, `none`, `none`)
let strap_babyblue = new Product (36, `../pages/products/strap_babyblue.html`, `../assets/strap_babyblue.jpg`, `Correa`, `Correa Acrílica Azul Bebé`, 790, 131.67, 10, true, `babyblue`, `straps`, `none`, `none`)
let strap_babypink = new Product (37, `../pages/products/strap_babypink.html`, `../assets/strap_babypink.jpg`, `Correa`, `Correa Acrílica Rosa Bebé`, 790, 131.67, 10, true, `babypink`, `straps`, `none`, `none`)
let strap_mintgreen = new Product (38, `../pages/products/strap_mintgreen.html`, `../assets/strap_mintgreen.jpeg`, `Correa`, `Correa Acrílica Verde Menta`, 790, 131.67, 10, true, `mintgreen`, `straps`, `none`, `none`)
let strap_orange = new Product (39, `../pages/products/strap_orange.html`, `../assets/strap_orange.jpeg`, `Correa`, `Correa Acrílica Naranja`, 790, 131.67, 10, true, `orange`, `straps`, `none`, `none`)
let baguette_cow = new Product (40, `../pages/products/the-baguette-bag_cow.html`, `../assets/the-baguette-bag_cow.jpeg`, `Sin stock`, `The Baguette Bag Cow`, 3890, 648.33, 0, false, `cow`, `bags`, `minibags`, `The Baguette Bag`)
let baguette_black_patent_crocco = new Product (41, `../pages/products/the-baguette-bag_black_patent_crocco.html`, `../assets/the-baguette-bag_black_patent_crocco.jpeg`, `Minibag`, `The Baguette Bag Negra Charol Crocco`, 3890, 648.33, 10, true, `black`, `bags`, `minibags`, `The Baguette Bag`)
let baguette_offwhite_crocco = new Product (42, `../pages/products/the-baguette-bag_offwhite_crocco.html`, `../assets/the-baguette-bag_offwhite_crocco.jpeg`, `Minibag`, `The Baguette Off White Crocco`, 3890, 648.33, 10, true, `offwhite`, `bags`, `minibags`, `The Baguette Bag`)
let baguette_babyblue_crocco = new Product (43, `../pages/products/the-baguette-bag_babyblue_crocco.html`, `../assets/the-baguette-bag_babyblue_crocco.jpeg`, `26% off`, `The Baguette Bag Azul Bebé Crocco`, 2890, 481.67, 10, true, `babyblue`, `bags`, `minibags`, `The Baguette Bag`)
let strap_silverxl = new Product (44, `../pages/products/strap_silverxl.html`, `../assets/strap_silverxl.jpeg`, `Correa`, `Correa Acrílica Plata XL`, 1290, 215, 10, true, `silver`, `straps`, `none`, `none`)
let strap_goldxl = new Product (45, `../pages/products/strap_goldxl.html`, `../assets/strap_goldxl.jpeg`, `Correa`, `Correa Acrílica Oro Platino XL`, 1290, 215, 10, true, `gold`, `straps`, `none`, `none`)
let chloe_tomato = new Product (46, `../pages/products/chloe_tomato.html`, `../assets/chloe_tomato.jpg`, `Sin stock`, `Chloe Tomate`, 1490, 248.33, 0, false, `tomato`, `card-holders`, `none`, `none`)
let chloe_black_patent_crocco = new Product (47, `../pages/products/chloe_black_patent_crocco.html`, `../assets/chloe_black_patent_crocco.jpg`, `Sin stock`, `Chloe Negro Charol Crocco`, 1490, 248.33, 0, false, `black`, `card-holders`, `none`, `none`)
let chloe_bottlegreen = new Product (48, `../pages/products/chloe_bottlegreen.html`, `../assets/chloe_bottlegreen.jpg`, `Sin stock`, `Chloe Verde Botella`, 1490, 248.33, 0, false, `bottlegreen`, `card-holders`, `none`, `none`)
let chloe_silver = new Product (49, `../pages/products/chloe_silver.html`, `../assets/chloe_silver.jpg`, `Sin stock`, `Chloe Plata`, 1490, 248.33, 0, false, `silver`, `card-holders`, `none`, `none`)
let kim_blue = new Product (50, `../pages/products/kim_blue.html`, `../assets/kim_blue.jpg`, `Sin stock`, `Kim Azul`, 4990, 831.67, 0, false, `blue`, `bags`, `minibags`, `Kim`)
let kim_fuchsia_crocco = new Product (51, `../pages/products/kim_fuchsia_crocco.html`, `../assets/kim_fuchsia_crocco.jpg`, `Sin stock`, `Kim Fucsia Crocco`, 4990, 831.67, 0, false, `fuchsia`, `bags`, `minibags`, `Kim`)
let britney_bottlegreen_matte = new Product (52, `../pages/products/britney_bottlegreen_matte.html`, `../assets/britney_bottlegreen_matte.jpg`, `Sin stock`, `Britney Verde Botella Mate`, 3990, 665, 0, false, `bottlegreen`, `bags`, `crossbody`, `Britney`)
let kylie_bottlegreen = new Product (53, `../pages/products/kylie_bottlegreen.html`, `../assets/kylie_bottlegreen.jpg`, `Sin stock`, `Kylie Verde Botella`, 4990, 831.67, 0, false, `bottlegreen`, `bags`, `minibags`, `Kylie`)
let kim_bottlegreen = new Product (54, `../pages/products/kim_bottlegreen.html`, `../assets/kim_bottlegreen.jpg`, `Sin stock`, `Kim Verde Botella`, 4990, 831.67, 0, false, `bottlegreen`, `bags`, `minibags`, `Kim`)
let kim_cream = new Product (55, `../pages/products/kim_cream.html`, `../assets/kim_cream.jpg`, `Sin stock`, `Kim Crema`, 4990, 831.67, 0, false, `cream`, `bags`, `minibags`, `Kim`)
let hannah_bottlegreen_matte = new Product (56, `../pages/products/hannah_bottlegreen_matte.html`, `../assets/hannah_bottlegreen_matte`, `Sin stock`, `Hannah Verde Botella Mate`, 3890, 648.33, 0, false, `bottlegreen`, `bags`, `minibags`, `Hannah`)
let kendall_olivegreen = new Product (57, `../pages/products/kendall_olivegreen.html`, `../assets/kendall_olivegreen`, `Sin stock`, `Kendall Verde Oliva`, 3190, 531.67, 0, false, `olivegreen`, `bags`, `minibags`, `Kendall`)
let kendall_cream = new Product (58, `../pages/products/kendall_cream.html`, `../assets/kendall_cream`, `Sin stock`, `Kendall Crema`, 3190, 531.67, 0, false, `cream`, `bags`, `minibags`, `Kendall`)
let kendall_bottlegreen_matte = new Product (59, `../pages/products/kendall_bottlegreen_matte.html`, `../assets/kendall_bottlegreen_matte`, `Sin stock`, `Kendall Verde Botella Mate`, 3190, 531.67, 0, false, `bottlegreen`, `bags`, `minibags`, `Kendall`)
let strap_silver = new Product (60, `../pages/products/strap_silver.html`, `../assets/strap_silver`, `Sin stock`, `Correa Silver`, 1290, 215, 0, false, `silver`, `straps`, `none`, `none`)
let strap_lady = new Product (61, `../pages/products/strap_lady.html`, `../assets/strap_lady`, `Sin stock`, `Correa Lady`, 1290, 215, 0, false, `gold`, `straps`, `none`, `none`)
let gigi_cow = new Product (62, `../pages/products/gigi_cow.html`, `../assets/gigi_cow.jpg`, `Sin stock`, `Gigi Cow`, 5490, 915, 0, false, `cow`, `bags`, `totebags`, `Gigi`)
let kendall_black_patent = new Product (63, `../pages/products/kendall_black_patent.html`, `../assets/kendall_black_patent.jpg`, `Sin stock`, `Kendall Negra Charol Oro`, 3190, 531.67, 0, false, `black`, `bags`, `minibags`, `Kendall`)
let kendall_fuchsia_crocco = new Product (64, `../pages/products/kendall_fuchsia_crocco.html`, `../assets/kendall_fuchsia_crocco.jpg`, `Sin stock`, `Kendall Fucsia Crocco`, 3190, 531.67, 0, false, `fuchsia`, `bags`, `minibags`, `Kendall`)
let kendall_sand_crocco = new Product (65, `../pages/products/kendall_sand_crocco.html`, `../assets/kendall_sand_crocco.jpg`, `Sin stock`, `Kendall Arena Crocco`, 3190, 531.67, 0, false, `sand`, `bags`, `minibags`, `Kendall`)
let baguette_fuchsia_crocco = new Product (66, `../pages/products/the-baguette-bag_fuchsia_crocco.html`, `../assets/the-baguette-bag_fuchsia_crocco.jpg`, `Sin stock`, `The Baguette Bag Fucsia Crocco`, 3890, 648.33, 0, false, `fuchsia`, `bags`, `minibags`, `The Baguette Bag`)
let baguette_chocolate_matte = new Product (67, `../pages/products/the-baguette-bag_chocolate_matte.html`, `../assets/the-baguette-bag_chocolate_matte.jpg`, `Sin stock`, `The Baguette Bag Chocolate Mate`, 3890, 648.33, 0, false, `chocolate`, `bags`, `minibags`, `The Baguette Bag`)
let baguette_lilac = new Product (68, `../pages/products/the-baguette-bag_lilac.html`, `../assets/the-baguette-bag_lilac.jpg`, `Sin stock`, `The Baguette Bag Lila Oro`, 3890, 648.33, 0, false, `lilac`, `bags`, `minibags`, `The Baguette Bag`)
let baguette_orange_crocco = new Product (69, `../pages/products/the-baguette-bag_orange_crocco.html`, `../assets/the-baguette-bag_orange_crocco.jpg`, `Sin stock`, `The Baguette Bag Naranja Crocco`, 3890, 648.33, 0, false, `orange`, `bags`, `minibags`, `The Baguette Bag`)
let britney_offwhite_patent_crocco = new Product (70, `../pages/products/britney_offwhite_patent_crocco.html`, `../assets/britney_offwhite_patent_crocco.jpeg`, `Sin stock`, `Britney Off White Charol Crocco`, 3990, 665, 0, false, `offwhite`, `bags`, `crossbody`, `Britney`)
let kendall_cow = new Product (71, `../pages/products/kendall_cow.html`, `../assets/kendall_cow.jpeg`, `Sin stock`, `Kendall Cow`, 3190, 531.67, 0, false, `cow`, `bags`, `minibags`, `Kendall`)
let kendall_offwhite_patent_crocco = new Product (72, `../pages/products/kendall_offwhite_patent_crocco.html`, `../assets/kendall_offwhite_patent_crocco.jpg`, `Sin stock`, `Kendall Off White Charol Crocco`, 3190, 531.67, 0, false, `offwhite`, `bags`, `minibags`, `Kendall`)
let kendall_offwhite_crocco = new Product (73, `../pages/products/kendall_offwhite_crocco.html`, `../assets/kendall_offwhite_crocco.jpeg`, `Sin stock`, `Kendall Off White Crocco`, 3190, 531.67, 0, false, `offwhite`, `bags`, `minibags`, `Kendall`)
let baguette_offwhite_patent_crocco = new Product (74, `../pages/products/the-baguette-bag_offwhite_patent_crocco.html`, `../assets/the-baguette-bag_offwhite_patent_crocco.jpeg`, `Sin stock`, `The Baguette Bag Off White Charol Crocco`, 3890, 648.33, 0, false, `offwhite`, `bags`, `minibags`, `The Baguette Bag`)
let kendall_nude_crocco = new Product (75, `../pages/products/kendall_nude_crocco.html`, `../assets/kendall_nude_crocco.jpg`, `Sin stock`, `Kendall Nude Crocco`, 3190, 531.67, 0, false, `nude`, `bags`, `minibags`, `Kendall`)
let kendall_chocolate_crocco = new Product (76, `../pages/products/kendall_chocolate_crocco.html`, `../assets/kendall_chocolate_crocco.jpeg`, `Sin stock`, `Kendall Chocolate Crocco`, 3190, 531.67, 0, false, `chocolate`, `bags`, `minibags`, `Kendall`)
let kendall_lilac = new Product (77, `../pages/products/kendall_lilac.html`, `../assets/kendall_lilac.jpeg`, `Sin stock`, `Kendall Lila Oro`, 3190, 531.67, 0, false, `lilac`, `bags`, `minibags`, `Kendall`)
let hannah_babyblue_crocco = new Product (78, `../pages/products/hannah_babyblue_crocco.html`, `../assets/hannah_babyblue_crocco.jpeg`, `Sin stock`, `Hannah Azul Bebé Crocco`, 3890, 648.33, 0, false, `babyblue`, `bags`, `minibags`, `Hannah`)
let strap_black_matte = new Product (79, `../pages/products/strap_black_matte.html`, `../assets/strap_black_matte.jpg`, `Sin stock`, `Correa Acrílica Negra Mate`, 990, 165, 0, false, `black`, `straps`, `none`, `none`)
let strap_gold = new Product (80, `../pages/products/strap_gold.html`, `../assets/strap_gold.jpeg`, `Sin stock`, `Cadena Oro`, 1190, 198.33, 0, false, `gold`, `straps`, `none`, `none`)
let baguette_black_crocco = new Product (81, `../pages/products/the-baguette-bag_black_crocco.html`, `../assets/the-baguette-bag_black_crocco.jpg`, `Sin stock`, `The Baguette Bag Negra Crocco`, 3890, 648.33, 0, false, `black`, `bags`, `minibags`, `The Baguette Bag`)
let baguette_nude_crocco = new Product (82, `../pages/products/the-baguette-bag_nude_crocco.html`, `../assets/the-baguette-bag_nude_crocco.jpg`, `Sin stock`, `The Baguette Bag Nude Crocco Oro`, 3890, 648.33, 0, false, `nude`, `bags`, `minibags`, `The Baguette Bag`)
let hannah_black_crocco = new Product (83, `../pages/products/hannah_black_crocco.html`, `../assets/hannah_black_crocco.jpeg`, `Sin stock`, `Hannah Negra Crocco`, 3890, 648.33, 0, false, `black`, `bags`, `minibags`, `Hannah`)
let hannah_offwhite_crocco = new Product (84, `../pages/products/hannah_offwhite_crocco.html`, `../assets/hannah_offwhite_crocco.jpg`, `Sin stock`, `Hannah Off White Crocco Oro`, 3890, 648.33, 0, false, `offwhite`, `bags`, `minibags`, `Hannah`)
// C A R R I T O //
let shoppingCart = [];
let total = 0;
const DOMtext = document.getElementById(`text`);
const DOMshoppingCart = document.getElementById(`shoppingCart`);
const DOMbuttonEmpty = document.getElementById(`buttonEmpty`);
const DOMtotal = document.getElementById(`total`);
const DOMinstallmentValue = document.getElementById(`installmentValue`);
const DOMbuttonBuy = document.getElementById(`buttonBuy`);
const myLocalStorage = window.localStorage;
DOMtext.textContent = `Tu carrito de compras está vacío :(`;

/////////////////////////////////////////////// F U N C I O N E S ////////////////////////////////////////////////////

// P R O D U C T O S //
function saveLocal () {
    const toJson = JSON.stringify(Products)
    localStorage.setItem(`products`, toJson)
}
function printProducts () {
    const cards = document.getElementById(`cardsProducts`)
    Products.forEach (e => {
        const div = document.createElement(`div`)
        div.setAttribute(`class`, `mb-4 col-lg-3 col-xs-12`)
        cards.appendChild(div)
        const card = document.createElement(`div`)
        card.setAttribute(`class`, `card text-center`)
        div.appendChild(card)
        const cardContainer = document.createElement(`div`)
        cardContainer.setAttribute(`class`, `card-container`)
        cardContainer.setAttribute(`id`, `createJumbotron`)
        card.appendChild(cardContainer)
        const imgLink = document.createElement(`a`)
        imgLink.setAttribute(`href`, `${e.link}`)
        cardContainer.appendChild(imgLink)
        const img = document.createElement(`img`)
        img.setAttribute(`src`, `${e.img}`)
        img.setAttribute(`class`, `card-img-top`)
        img.setAttribute(`alt`, `${e.name}`)
        imgLink.appendChild(img)
        const jumbotron = document.createElement(`div`)
        jumbotron.setAttribute(`class`, `jumbotron jumbotron-absolute`)
        cardContainer.appendChild(jumbotron)
        const spanJumbotron = document.createElement(`span`)
        spanJumbotron.setAttribute(`class`, `text-uppercase`)
        jumbotron.appendChild(spanJumbotron)
        const boldSpanJumbotron = document.createElement(`b`)
        boldSpanJumbotron.textContent = `${e.img_text}`
        spanJumbotron.prepend(boldSpanJumbotron)
        const button = document.createElement(`button`)
        //button.setAttribute(`type`, `button`)
        button.setAttribute(`class`, `btn btn-dark rounded-circle`)
        button.setAttribute(`marcador`, `${e.id}`)
        //button.setAttribute(`data-target`, `#addModal`)
        button.addEventListener(`click`, addProductShoppingCart);
        cardContainer.appendChild(button)
        const icon = document.createElement(`img`)
        icon.setAttribute(`src`, `../assets/bag.svg`)
        icon.setAttribute(`class`, `bag-style`)
        button.appendChild(icon)
        const cardBody = document.createElement(`div`)
        cardBody.setAttribute(`class`, `card-body`)
        card.appendChild(cardBody)
        const nameLink = document.createElement(`a`)
        nameLink.setAttribute(`href`, `${e.link}`)
        cardBody.appendChild(nameLink)
        const name = document.createElement(`h4`)
        name.textContent = `${e.name}`
        nameLink.appendChild(name)
        const price = document.createElement(`p`)
        cardBody.appendChild(price)
        const boldPrice = document.createElement(`b`)
        boldPrice.textContent = `$${e.price}`
        price.appendChild(boldPrice)
        const installment = document.createElement(`span`)
        installment.textContent = `cuotas sin interés de `
        cardBody.appendChild(installment)
        const installmentNumber = document.createElement(`b`)
        installmentNumber.textContent = `6 `
        installment.prepend(installmentNumber)
        const installmentValue = document.createElement(`b`)
        installmentValue.textContent = `$${e.installment_value}`
        installment.appendChild(installmentValue)
    })
}
// C A R R I T O //
//restar stock y bloquear boton compra cuando llegue a 0, jumbotron sin stock ¿sacar el resto de jumbotrons?
function addProductShoppingCart(event) {
    shoppingCart.push(event.target.getAttribute(`marcador`));
    calculateTotal();
    calculateInstallment();
    // Actualizo el carrito
    printShoppingCart();
    saveShoppingCartLocalStorage();
}
function block () {
    const div1 = document.getElementById(`noneBlock`)
    div1.style.display = `block`;
}
function none () {
    const div2 = document.getElementById(`noneBlock`)
    div2.style.display = `none`;
}
function printShoppingCart() {
    block();
    DOMtext.textContent = `Éstos son los productos que elegiste:`;
    // Vacio todo el html
    DOMshoppingCart.textContent = ``;
    // Quito los duplicados
    const shoppingCartNoDuplicate = [...new Set(shoppingCart)];
    // Nodos a partir de carrito
    shoppingCartNoDuplicate.forEach((item) => {
        // Item que necesito de la variable del JSON
        const myItem = Products.filter((e) => {
            // ¿Coincide las id? Solo puede existir un caso
            return e.id === parseInt(item);
        });
        // Cuento el número de veces que se repite el producto
        const amountItem = shoppingCart.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);
        // Nodo del item del carrito
        const myNode = document.createElement(`li`);
        myNode.setAttribute(`class`, `list-group-item mx-1`);
        myNode.textContent = `${amountItem} x ${myItem[0].name} - $${myItem[0].price}`;
        // Boton eliminar item
        const myButton = document.createElement(`button`);
        myButton.setAttribute(`class`, `btn border-0 mx-5`);
        myButton.dataset.item = item;
        myButton.addEventListener(`click`, deleteItemShoppingCart);
        myNode.appendChild(myButton);
        const icon = document.createElement(`img`)
        icon.setAttribute(`src`, `../assets/trash.svg`)
        //icon.setAttribute(`class`, `bag-style`)
        myButton.appendChild(icon)
        DOMshoppingCart.appendChild(myNode);
    });
}
function deleteItemShoppingCart(event) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = event.target.dataset.item;
    // Borramos todos los productos
    shoppingCart = shoppingCart.filter((shoppingCartId) => {
        return shoppingCartId !== id;
    });
    printShoppingCart();
    calculateTotal();
    calculateInstallment();
    saveShoppingCartLocalStorage();
}
function calculateTotal() {
    total = 0;
    shoppingCart.forEach((shoppingCart) => {
        const myItem = Products.filter((e) => {
            return e.id === parseInt(shoppingCart);
        });
        total = total + myItem[0].price;
    });
    DOMtotal.textContent = total.toFixed(2);
}
function calculateInstallment() {
    total = 0;
    shoppingCart.forEach((item) => {
        const myItem = Products.filter((e) => {
            return e.id === parseInt(item);
        });
        total = total + myItem[0].installment_value;
    });
    DOMinstallmentValue.textContent = total.toFixed(2);
}
function emptyShoppingCart() {
    shoppingCart = [];
    printShoppingCart();
    calculateTotal();
    calculateInstallment();
    none();
    DOMtext.textContent = `Tu carrito de compras está vacío :(`;
    localStorage.clear();
}
function startPurchase() {
    shoppingCart = [];
    printShoppingCart();
    calculateTotal();
    calculateInstallment();
    none();
    DOMtext.textContent = `Gracias por tu compra ;)`;
    localStorage.clear();
}
function saveShoppingCartLocalStorage() {
    myLocalStorage.setItem(`shoppingCart`, JSON.stringify(shoppingCart))
}
function uploadShoppingCartLocalStorage() {
    if (myLocalStorage.getItem(`shoppingCart`) !== null) {
        shoppingCart = JSON.parse(myLocalStorage.getItem(`shoppingCart`));
    }
}
//a los 60 productos va el botón de cargar más productos //
/*scrollTopButton('.scroll-top-btn');

function scrollTopButton(btn){
    const $ScrollBtn = $(btn);
    
    $(window).scroll(function(){
        let scrollTop = $(this).scrollTop();
        console.log(scrollTop);
        //Operador ternario sustituyendo al if{} else{} 
        scrollTop > 700 ? $ScrollBtn.removeClass('hidden') : $ScrollBtn.addClass('hidden');
    })

    $ScrollBtn.click(function(){
        window.scrollTo({
            behavior: 'smooth',
            top: 0
        })
    })
}*/

//////////////////////////////////////////////////// L O G I C A /////////////////////////////////////////////////////

// C A R R I T O   Y   P R O D U C T O S //
// Eventos
DOMbuttonEmpty.addEventListener(`click`, emptyShoppingCart);
DOMbuttonBuy.addEventListener(`click`, startPurchase);
// Pusheo cada producto al array
Products.push(kendall_barbiepink)
Products.push(kylie_barbiepink)
Products.push(kylie_bottlegreen_limitededition)
Products.push(kylie_cream)
Products.push(kim_tomato)
Products.push(kylie_black_crocco_limitededition)
Products.push(kim_chocolate_crocco)
Products.push(kim_black_crocco)
Products.push(gigi_black_patent_crocco)
Products.push(gigi_black_crocco)
Products.push(kendall_tomato)
Products.push(kendall_blue)
Products.push(kendall_navyblue)
Products.push(west)
Products.push(cross)
Products.push(strap_baby)
Products.push(baguette_black_patent)
Products.push(baguette_bottlegreen)
Products.push(hailey_black_nylon)
Products.push(gigi_bottlegreen)
Products.push(kendall_sole)
Products.push(kendall_bottlegreen)
Products.push(kendall_black_matte)
Products.push(kendall_chocolate_matte)
Products.push(baguette_black_matte)
Products.push(baguette_pistachio_crocco)
Products.push(hannah_black_patent_crocco)
Products.push(britney_black_patent_crocco)
Products.push(kendall_pistachio_crocco)
Products.push(kendall_orange_crocco)
Products.push(baguette_chocolate_crocco)
Products.push(kendall_black_patent_crocco)
Products.push(kendall_black_crocco)
Products.push(strap_lilac)
Products.push(strap_cream)
Products.push(strap_babyblue)
Products.push(strap_babypink)
Products.push(strap_mintgreen)
Products.push(strap_orange)
Products.push(baguette_cow)
Products.push(baguette_black_patent_crocco)
Products.push(baguette_offwhite_crocco)
Products.push(baguette_babyblue_crocco)
Products.push(strap_silverxl)
Products.push(strap_goldxl)
Products.push(chloe_tomato)
Products.push(chloe_black_patent_crocco)
Products.push(chloe_bottlegreen)
Products.push(chloe_silver)
Products.push(kim_blue)
Products.push(kim_fuchsia_crocco)
Products.push(britney_bottlegreen_matte)
Products.push(kylie_bottlegreen)
Products.push(kim_bottlegreen)
Products.push(kim_cream)
Products.push(hannah_bottlegreen_matte)
Products.push(kendall_olivegreen)
Products.push(kendall_cream)
Products.push(kendall_bottlegreen_matte)
Products.push(strap_silver)
Products.push(strap_lady)
Products.push(gigi_cow)
Products.push(kendall_black_patent)
Products.push(kendall_fuchsia_crocco)
Products.push(kendall_sand_crocco)
Products.push(baguette_fuchsia_crocco)
Products.push(baguette_chocolate_matte)
Products.push(baguette_lilac)
Products.push(baguette_orange_crocco)
Products.push(britney_offwhite_patent_crocco)
Products.push(kendall_cow)
Products.push(kendall_offwhite_patent_crocco)
Products.push(kendall_offwhite_crocco)
Products.push(baguette_offwhite_patent_crocco)
Products.push(kendall_nude_crocco)
Products.push(kendall_chocolate_crocco)
Products.push(kendall_lilac)
Products.push(hannah_babyblue_crocco)
Products.push(strap_black_matte)
Products.push(strap_gold)
Products.push(baguette_black_crocco)
Products.push(baguette_nude_crocco)
Products.push(hannah_black_crocco)
Products.push(hannah_offwhite_crocco)
// Cargo los productos del carrito del local storage
uploadShoppingCartLocalStorage();
// Imprimo los productos
printProducts()
// Guardo productos en el local storage
saveLocal()
// Calculo los precios totales del carrito
calculateTotal();
calculateInstallment();
// Imprimo los productos del carrito
printShoppingCart();
}