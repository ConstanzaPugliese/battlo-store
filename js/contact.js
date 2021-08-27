window.onload = function () {

/////////////////////////////////////////////// E N T I D A D E S ////////////////////////////////////////////////////
class Contact {
    constructor (name, email, mobile, message) {
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.message = message;
    }
}

/////////////////////////////////////////////// V A R I A B L E S ////////////////////////////////////////////////////

// P R O D U C T O S //
const fromJson = localStorage.getItem(`products`)
const Products = JSON.parse(fromJson)
// C A R R I T O //
let shoppingCart = [];
let total = 0;
const DOMtext = document.getElementById(`textContact`);
const DOMshoppingCart = document.getElementById(`shoppingCartContact`);
const DOMbuttonEmpty = document.getElementById(`buttonEmptyContact`);
const DOMtotal = document.getElementById(`totalContact`);
const DOMinstallmentValue = document.getElementById(`installmentValueContact`);
const DOMbuttonBuy = document.getElementById(`buttonBuyContact`);
const myLocalStorage = window.localStorage;
DOMtext.textContent = `Tu carrito de compras está vacío :(`;

/////////////////////////////////////////////// F U N C I O N E S ////////////////////////////////////////////////////

function uploadProductsLocalStorage() {
    const fromJson = localStorage.getItem(`products`);
    const Products = JSON.parse(fromJson);
}
function print(e) {
    e.preventDefault()
    let contacts = new Contact($(`#nameContact`).val(), $(`#emailContact`).val(), $(`#mobileContact`).val(), $(`#messageContact`).val());
    sessionStorage.setItem(`contacts`, JSON.stringify(contacts));
    let answer = $(`#answer`).textContent
    answer = `En las próximas horas nos vamos a estar comunicando con vos :)`;
    $(`#answer`).append(answer);
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
    const div1 = document.getElementById(`noneBlockContact`)
    div1.style.display = `block`;
}
function none () {
    const div2 = document.getElementById(`noneBlockContact`)
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
//Eventos
$(`#sendContact`).click(print)
// C A R R I T O   Y   P R O D U C T O S //
DOMbuttonEmpty.addEventListener(`click`, emptyShoppingCart);
DOMbuttonBuy.addEventListener(`click`, startPurchase);
// Cargo los productos del local storage
uploadProductsLocalStorage();
// Cargo los productos del carrito del local storage
uploadShoppingCartLocalStorage();
// Calculo los precios totales del carrito
calculateTotal();
calculateInstallment();
// Imprimo los productos del carrito
printShoppingCart();
}