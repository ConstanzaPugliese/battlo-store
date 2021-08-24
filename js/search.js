/////////////////////////////////////////////// V A R I A B L E S ////////////////////////////////////////////////////

const body = document.body
let main = document.createElement(`main`)
main.setAttribute(`class`, `row`)
main.setAttribute(`id`, `cardsSearch`)
body.appendChild(main)
let title = document.createElement(`h1`)
title.setAttribute(`class`, `col-lg-12 col-xs-12 mb-4`)
main.prepend(title)
// P R O D U C T O S //
const fromJson = localStorage.getItem(`products`)
const Products = JSON.parse(fromJson)
let ProductsFilter = []
//a los 60 productos va el botón//

/////////////////////////////////////////////// F U N C I O N E S ////////////////////////////////////////////////////

function searchProducts() {
    let search = $(`.textSearch`).value
    search.toLowerCase
    removeAllChildNodes(search);
    title.textContent = `Resultados de la búsqueda ${search}`
    let filter = Products.filter (Product => Product.name == search)
    //color, categoria, bag category, bag name
    ProductosFilter = filter;
    //No hubo resultados para tu búsqueda. Quizás te interesen los siguientes productos... Best sellers
}
function printProducts(i) {
    i.preventDefault()
    searchProducts()
    let cards = document.getElementById(`cardsSearch`)
    ProductsFilter.forEach (e => {
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
//////////////////////////////////////////////////// L O G I C A /////////////////////////////////////////////////////
// E V E N T O //
$(`.search`).click(printProducts)