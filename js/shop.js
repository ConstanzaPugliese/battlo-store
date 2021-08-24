window.onload = function () {

////////////////////////////////////////////// V A R I A B L E S //////////////////////////////////////////////////////

let ProductsfromJson = localStorage.getItem(`products`)
let ProductsReady = JSON.parse(ProductsfromJson)
let shoppingCart = [];
let total = 0;
let DOMbuttonBag = document.querySelector(`.rounded-circle`);
let DOMmodalBody = document.querySelector(`.modal-body--shop`)
let DOMshoppingCart = document.querySelector(`.shoppingCart`);
let DOMtotal = document.querySelector(`.total`);
let DOMinstallmentValue = document.querySelector(`.installment-value`)
let DOMbuttonEmpty = document.querySelector(`.buttonEmpty`);
let DOMbuttonBuy = document.querySelector(`.buttonStart`);
let myLocalStorage = window.localStorage;
let defaultText = document.createElement (`p`)
defaultText.textContent = `Tu carrito de compras está vacío :(`;
DOMmodalBody.appendChild(defaultText)

////////////////////////////////////////////// F U N C I O N E S //////////////////////////////////////////////////////

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
    let shoppingCartNoDuplicate = [...new Set(shoppingCart)];
    // Nodos a partir de carrito
    shoppingCartNoDuplicate.forEach((item) => {
        // Item que necesito de la variable del JSON
        let myItem = ProductsReady.filter((e) => {
            // ¿Coincide las id? Solo puede existir un caso
            return e.id === parseInt(item);
        });
        // Cuento el número de veces que se repite el producto
        let amountItem = shoppingCart.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);
        // Nodo del item del carrito
        let myNode = document.createElement(`li`);
        myNode.classList.add(`list-group-item`, `text-right`, `mx-2`);
        myNode.textContent = `${amountItem} x ${myItem[0].name} - $${myItem[0].price}`;
        // Boton eliminar item
        let myButton = document.createElement(`button`);
        myButton.classList.add(`btn`, `border-0`, `mx-5`);
        myButton.dataset.item = item;
        myButton.addEventListener('click', deleteItemShoppingCart);
        myNode.appendChild(myButton);
        let icon = document.createElement(`img`)
        icon.setAttribute(`src`, `../assets/trash.svg`)
        //icon.setAttribute(`class`, `bag-style`)
        myButton.appendChild(icon)
        DOMshoppingCart.appendChild(myNode);
    });
    let div = document.createElement(`div`);
    div.setAttribute(`class`, `text-right mt-2`);
    DOMmodalBody.appendChild(div)
    let buttonEmpty = document.createElement(`button`);
    buttonEmpty.setAttribute(`class`, `buttonEmpty btn btn-dark`);
    buttonEmpty.textContent = `Vaciar`;
    div.appendChild(buttonEmpty);
    let hr = document.createElement(`hr`);
    DOMmodalBody.appendChild(hr);
    let h3 = document.createElement(`h3`);
    h3.setAttribute(`class`, `text-right`);
    h3.textContent = `Total: $`;
    DOMmodalBody.appendChild(h3);
    let h3Price = document.createElement(`h3`);
    h3Price.setAttribute(`class`, `total`);
    h3.appendChild(h3Price);
    let p = document.createElement(`p`);
    p.setAttribute(`class`,`text-right`);
    p.textContent = `0 a 6 cuotas sin interés de $`;
    DOMmodalBody.appendChild(p);
    let pPrice = document.createElement(`p`);
    pPrice.setAttribute(`class`, `installment-value`);
    p.appendChild(pPrice);
    let div2 = document.createElement(`div`);
    div2.setAttribute(`class`, `text-center mt-2`);
    DOMmodalBody.appendChild(div2);
    let buttonBuy = document.createElement(`button`);
    buttonBuy.setAttribute(`class`, `buttonStart btn btn-dark text-uppercase`);
    buttonBuy.textContent = `Iniciar compra`;
    div2.appendChild(buttonBuy);
    let div3 = document.createElement(`div`)
    div3.setAttribute(`class`, `text-center mt-2`);
    DOMmodalBody.appendChild(div3)
    let span = document.createElement(`span`);
    div3.appendChild(span);
    let link = document.createElement(`a`);
    link.setAttribute(`href`, `../pages/products.html`);
    link.textContent = `Ver más productos`;
    span.appendChild(link);
}
function deleteItemShoppingCart(event) {
    // Obtenemos el producto ID que hay en el boton pulsado
    let idItem = event.target.dataset.item;
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
        let myItem = ProductsReady.filter((e) => {
            return e.id === parseInt(item);
        });
        total = total + myItem[0].price;
    });
    DOMtotal.textContent = total.toFixed(2);
}
function calculateInstallment() {
    total = 0;
    shoppingCart.forEach((item) => {
        let myItem = ProductsReady.filter((e) => {
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

///////////////////////////////////////////////// L O G I C A /////////////////////////////////////////////////////////

uploadShoppingCartLocalStorage();
calculateTotal();
printShoppingCart();
DOMbuttonBag.addEventListener(`click`, addProductShoppingCart);
DOMbuttonEmpty.addEventListener(`click`, emptyShoppingCart);
DOMbuttonBuy.addEventListener(`click`, startPurchase);
}