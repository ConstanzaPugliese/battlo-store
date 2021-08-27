window.onload = function () {

/////////////////////////////////////////////// V A R I A B L E S ////////////////////////////////////////////////////

let main = document.getElementById(`cardsBags`)
let title = document.createElement(`h1`)
title.setAttribute(`class`, `col-lg-12 col-xs-12 my-4`)
title.textContent = `Carteras`
main.prepend(title)
// P R O D U C T O S //
const fromJson = localStorage.getItem(`products`)
const Products = JSON.parse(fromJson)
let ProductsCategory = []
let currentCategory = `bags`
// C A R R I T O //
let shoppingCart = [];
let total = 0;
const DOMtext = document.getElementById(`textBags`);
const DOMshoppingCart = document.getElementById(`shoppingCartBags`);
const DOMbuttonEmpty = document.getElementById(`buttonEmptyBags`);
const DOMtotal = document.getElementById(`totalBags`);
const DOMinstallmentValue = document.getElementById(`installmentValueBags`);
const DOMbuttonBuy = document.getElementById(`buttonBuyBags`);
const myLocalStorage = window.localStorage;
DOMtext.textContent = `Tu carrito de compras está vacío :(`;

/////////////////////////////////////////////// F U N C I O N E S ////////////////////////////////////////////////////

function uploadProductsLocalStorage() {
    const fromJson = localStorage.getItem(`products`);
    const Products = JSON.parse(fromJson);
}

function filterCategory () {
    let category = Products.filter(Product => Product.category == currentCategory);
    ProductsCategory = category
}
function printProducts() {
    filterCategory()
    let cards = document.getElementById(`cardsBags`)
    ProductsCategory.forEach (e => {
        const div = document.createElement(`div`)
        div.setAttribute(`class`, `mb-4 col-lg-3 col-xs-12`)
        cards.appendChild(div)
        const card = document.createElement(`div`)
        card.setAttribute(`class`, `card text-center`)
        div.appendChild(card)
        const cardContainer = document.createElement(`div`)
        cardContainer.setAttribute(`class`, `card-container`)
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
        button.setAttribute(`type`, `button`)
        button.setAttribute(`class`, `btn btn-dark rounded-circle`)
        button.setAttribute(`marcador`, `${e.id}`)
        button.setAttribute(`data-target`, `#addModal`)
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
    const div1 = document.getElementById(`noneBlockBags`)
    div1.style.display = `block`;
}
function none () {
    const div2 = document.getElementById(`noneBlockBags`)
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
        const myItem = ProductsCategory.filter((e) => {
            return e.id === parseInt(shoppingCart);
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
// Cargo los productos del local storage
uploadProductsLocalStorage();
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