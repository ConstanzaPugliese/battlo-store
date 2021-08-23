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

//////////////////////////////////////////////////// L O G I C A /////////////////////////////////////////////////////
printBestSellers()
// E V E N T O S //
$(`#sendLead`).click(print)