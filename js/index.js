window.onload = function () {

/////////////////////////////////////// E N T I D A D E S ////////////////////////////////////////////////////////////
class Lead {
    constructor (name, email) {
        this.name = name;
        this.email = email;
    }
}

/////////////////////////////////////////////// V A R I A B L E S ////////////////////////////////////////////////////

// P R O D U C T O S //
const fromJson = localStorage.getItem(`products`)
const Products = JSON.parse(fromJson)
let sectionBS = document.getElementById(`cardsBestSellers`)
let titleBS = document.createElement(`h1`)
titleBS.setAttribute(`class`, `text-uppercase mb-4`)
titleBS.textContent = `Best sellers`
sectionBS.prepend(titleBS)
let BestSellers = []
// C A R R I T O //
let shoppingCart = [];
let total = 0;
const DOMtext = document.getElementById(`textIndex`);
const DOMshoppingCart = document.getElementById(`shoppingCartIndex`);
const DOMbuttonEmpty = document.getElementById(`buttonEmptyIndex`);
const DOMtotal = document.getElementById(`totalIndex`);
const DOMinstallmentValue = document.getElementById(`installmentValueIndex`);
const DOMbuttonBuy = document.getElementById(`buttonBuyIndex`);
const myLocalStorage = window.localStorage;
DOMtext.textContent = `Tu carrito de compras está vacío :(`;

/////////////////////////////////////////////// F U N C I O N E S ////////////////////////////////////////////////////

// H E A D E R //
$(window).scroll(function(){
    if ($(window).scrollTop() >= 540) {
        $(`.header--index`).addClass(`fixed-header`);
    }
    else {
        $(`.header--index`).removeClass(`fixed-header`);
    }
});
// B E S T    S E L L E R S //
function filterBestSellers() {}
function printBestSellers() {
    filterBestSellers()
    let cards = document.getElementById(`cardsBestSellers`)
    BestSellers.forEach (e => {
        let div = document.createElement(`div`)
        div.setAttribute(`class`, `mb-4 col-lg-3 col-xs-12`)
        cards.appendChild(div)
        let card = document.createElement(`div`)
        card.setAttribute(`class`, `card text-center`)
        div.appendChild(card)
        let cardContainer = document.createElement(`div`)
        cardContainer.setAttribute(`class`, `card-container`)
        card.appendChild(cardContainer)
        let imgLink = document.createElement(`a`)
        imgLink.setAttribute(`href`, `${e.link}`)
        cardContainer.appendChild(imgLink)
        let img = document.createElement(`img`)
        img.setAttribute(`src`, `${e.img}`)
        img.setAttribute(`class`, `card-img-top`)
        img.setAttribute(`alt`, `${e.name}`)
        imgLink.appendChild(img)
        let jumbotron = document.createElement(`div`)
        jumbotron.setAttribute(`class`, `jumbotron jumbotron-absolute`)
        cardContainer.appendChild(jumbotron)
        let spanJumbotron = document.createElement(`span`)
        spanJumbotron.setAttribute(`class`, `text-uppercase`)
        jumbotron.appendChild(spanJumbotron)
        let boldSpanJumbotron = document.createElement(`b`)
        boldSpanJumbotron.textContent = `${e.img_text}`
        spanJumbotron.prepend(boldSpanJumbotron)
        let button = document.createElement(`button`)
        button.setAttribute(`type`, `button`)
        button.setAttribute(`class`, `btn btn-dark rounded-circle`)
        button.setAttribute(`data-target`, `#addModal`)
        cardContainer.appendChild(button)
        let icon = document.createElement(`img`)
        icon.setAttribute(`src`, `../assets/bag.svg`)
        icon.setAttribute(`class`, `bag-style`)
        button.appendChild(icon)
        let cardBody = document.createElement(`div`)
        cardBody.setAttribute(`class`, `card-body`)
        card.appendChild(cardBody)
        let nameLink = document.createElement(`a`)
        nameLink.setAttribute(`href`, `${e.link}`)
        cardBody.appendChild(nameLink)
        let name = document.createElement(`h4`)
        name.textContent = `${e.name}`
        nameLink.appendChild(name)
        let price = document.createElement(`p`)
        cardBody.appendChild(price)
        let boldPrice = document.createElement(`b`)
        boldPrice.textContent = `$${e.price}`
        price.appendChild(boldPrice)
        let installment = document.createElement(`span`)
        installment.textContent = `cuotas sin interés de `
        cardBody.appendChild(installment)
        let installmentNumber = document.createElement(`b`)
        installmentNumber.textContent = `6 `
        installment.prepend(installmentNumber)
        let installmentValue = document.createElement(`b`)
        installmentValue.textContent = `$${e.installment_value}`
        installment.appendChild(installmentValue)
    })
}
// N E W S L E T T E R //
function print(e) {
    e.preventDefault()
    let nameLead = $(`#nameLead`).val()
    let leads = new Lead(nameLead, $(`#emailLead`).val());
    const toJson = JSON.stringify(leads);
    sessionStorage.setItem(`leads`, toJson);
    thanks = $(`#thanks`).textContent
    thanks = `${nameLead} ya formás parte de nuestra comunidad ;)`;
    $(`#thanks`).append(thanks);
}
// P R O D U C T O S //
function uploadProductsLocalStorage() {
    const fromJson = localStorage.getItem(`products`);
    const Products = JSON.parse(fromJson);
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
    const div1 = document.getElementById(`noneBlockIndex`)
    div1.style.display = `block`;
}
function none () {
    const div2 = document.getElementById(`noneBlockIndex`)
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

//////////////////////////////////////////////////// L O G I C A /////////////////////////////////////////////////////

// Eventos
$(`#sendLead`).click(print)
// C A R R I T O   Y   P R O D U C T O S //
DOMbuttonEmpty.addEventListener(`click`, emptyShoppingCart);
DOMbuttonBuy.addEventListener(`click`, startPurchase);
// Cargo los productos del local storage
uploadProductsLocalStorage();
// Cargo los productos del carrito del local storage
uploadShoppingCartLocalStorage();
// Imprimo los productos
//printProducts();
// Calculo los precios totales del carrito
calculateTotal();
calculateInstallment();
// Imprimo los productos del carrito
printShoppingCart();
}