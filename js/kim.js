window.onload = function () {

/////////////////////////////////////////////// V A R I A B L E S ////////////////////////////////////////////////////

let main = document.getElementById(`cardsKim`)
let title = document.createElement(`h1`)
title.setAttribute(`class`, `col-lg-12 col-xs-12 my-4`)
title.textContent = `Kim Minibag`
main.prepend(title)
// P R O D U C T O S //
const fromJson = localStorage.getItem(`products`)
const Products = JSON.parse(fromJson)
let ProductsCategory = []
let currentCategory = `Kim`
// C A R R I T O //
let shoppingCart = [];
let total = 0;
const DOMmodalBody = document.getElementById(`shopModalBody`);
const DOMshoppingCart = document.getElementById(`shoppingCart`);
const DOMbuttonEmpty = document.getElementById(`buttonEmpty`);
const DOMtotal = document.getElementById(`total`);
const DOMinstallmentValue = document.getElementById(`installmentValue`);
const DOMbuttonBuy = document.getElementById(`buttonBuy`);
const myLocalStorage = window.localStorage;
const defaultText = document.createElement (`p`)
defaultText.textContent = `Tu carrito de compras está vacío :(`;
DOMmodalBody.appendChild(defaultText)

/////////////////////////////////////////////// F U N C I O N E S ////////////////////////////////////////////////////

function filterCategory () {
    let category = Products.filter(Product => Product.bag_name == currentCategory);
    ProductsCategory = category
}
function printProducts() {
    filterCategory()
    let cards = document.getElementById(`cardsKim`)
    ProductsCategory.forEach (e => {
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
        button.setAttribute(`marcador`, `${e.id}`)
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
function printShoppingCart() {
    // Vacio todo el html
    DOMmodalBody.textContent = ``;
    DOMshoppingCart.textContent = ``;
    // Quito los duplicados
    const shoppingCartNoDuplicate = [...new Set(shoppingCart)];
    // Nodos a partir de carrito
    shoppingCartNoDuplicate.forEach((item) => {
        // Item que necesito de la variable del JSON
        const myItem = ProductsCategory.filter((e) => {
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
        myNode.classList.add(`list-group-item`, `text-right`, `mx-2`);
        myNode.textContent = `${amountItem} x ${myItem[0].name} - $${myItem[0].price}`;
        // Boton eliminar item
        const myButton = document.createElement(`button`);
        myButton.setAttribute(`btn`, `border-0`, `mx-5`);
        myButton.dataset.item = item;
        myButton.addEventListener(`click`, deleteItemShoppingCart);
        myNode.appendChild(myButton);
        const icon = document.createElement(`img`)
        icon.setAttribute(`src`, `../assets/trash.svg`)
        //icon.setAttribute(`class`, `bag-style`)
        myButton.appendChild(icon)
        DOMshoppingCart.appendChild(myNode);
    });
    /*const div = document.createElement(`div`);
    div.setAttribute(`class`, `text-right mt-2`);
    DOMmodalBody.appendChild(div)
    const buttonEmpty = document.createElement(`button`);
    buttonEmpty.setAttribute(`class`, `btn btn-dark`);
    buttonEmpty.textContent = `Vaciar`;
    buttonEmpty.addEventListener(`click`, emptyShoppingCart);
    div.appendChild(buttonEmpty);
    const hr = document.createElement(`hr`);
    DOMmodalBody.appendChild(hr);
    const h3 = document.createElement(`h3`);
    h3.setAttribute(`class`, `text-right`);
    h3.textContent = `Total: $`;
    DOMmodalBody.appendChild(h3);
    const h3Price = document.createElement(`h3`);
    h3Price.setAttribute(`id`, `total`);
    h3.appendChild(h3Price);
    const p = document.createElement(`p`);
    p.setAttribute(`class`,`text-right`);
    p.textContent = `0 a 6 cuotas sin interés de $`;
    DOMmodalBody.appendChild(p);
    const pPrice = document.createElement(`p`);
    pPrice.setAttribute(`id`, `installment-value`);
    p.appendChild(pPrice);
    const div2 = document.createElement(`div`);
    div2.setAttribute(`class`, `text-center mt-2`);
    DOMmodalBody.appendChild(div2);
    const buttonBuy = document.createElement(`button`);
    buttonBuy.setAttribute(`class`, `btn btn-dark text-uppercase`);
    buttonBuy.textContent = `Iniciar compra`;
    buttonBuy.addEventListener(`click`, startPurchase);
    div2.appendChild(buttonBuy);
    const div3 = document.createElement(`div`)
    div3.setAttribute(`class`, `text-center mt-2`);
    DOMmodalBody.appendChild(div3)
    const span = document.createElement(`span`);
    div3.appendChild(span);
    const link = document.createElement(`a`);
    link.setAttribute(`href`, `../pages/products.html`);
    link.textContent = `Ver más productos`;
    span.appendChild(link);*/
}
function deleteItemShoppingCart(event) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const idItem = event.target.dataset.item;
    // Borramos todos los productos
    shoppingCart = shoppingCart.filter((shoppingCartId) => {
        return shoppingCartId !== idItem;
    });
    printShoppingCart();
    calculateTotal();
    calculateInstallment();
    saveShoppingCartLocalStorage();
}
function calculateTotal() {
    total = 0;
    shoppingCart.forEach((item) => {
        const myItem = ProductsCategory.filter((e) => {
            return e.id === parseInt(item);
        });
        total = total + myItem[0].price;
    });
    DOMtotal.textContent = total.toFixed(2);
}
function calculateInstallment() {
    total = 0;
    shoppingCart.forEach((item) => {
        const myItem = ProductsCategory.filter((e) => {
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
    localStorage.clear();
    DOMmodalBody.appendChild(defaultText);
}
function startPurchase() {
    shoppingCart = [];
    printShoppingCart();
    calculateTotal();
    calculateInstallment();
    localStorage.clear();
    let text = document.createElement(`p`)
    text.textContent = `Gracias por tu compra ;)`;
    DOMmodalBody.appendChild(text)
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

// C A R R I T O   Y   P R O D U C T O S //
// Eventos
DOMbuttonEmpty.addEventListener(`click`, emptyShoppingCart);
DOMbuttonBuy.addEventListener(`click`, startPurchase);
// Cargo los productos del carrito del local storage
uploadShoppingCartLocalStorage();
// Imprimo los productos
printProducts()
// Calculo los precios totales del carrito
calculateTotal();
calculateInstallment();
// Imprimo los productos del carrito
printShoppingCart();
}