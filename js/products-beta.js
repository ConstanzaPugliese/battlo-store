//Entidades//
class Product {
    constructor (link, img, name, price, discount, payment, installments_number, installment_value, interest, without_interest, total_value, buy, stock, available, color, category, bag_category, slider, description, quantity, shipping) {
        this.link = link;
        this.img = img;
        this.name = name;
        this.price = price;
        this.discount = discount;
        this.payment = payment;
        this.installments_number = installments_number;
        this.installment_value = installment_value;
        this.interest = interest;
        this.without_interest = without_interest;
        this.total_value = total_value;
        this.buy = buy;
        this.stock = stock;
        this.available = available;
        this.color = color;
        this.category = category;
        this.bag_category = bag_category;
        this.slider = slider;
        this.description = description;
        this.quantity = quantity;
        this.shipping = shipping;
    }
}

//Funciones//
function saveLocal (Products) {
    /*let setLocal = []
    setLocal.push(Product)*/
    let toJson = JSON.stringify(Products)
    localStorage.setItem(`products`, toJson)
}

scrollTopButton('.scroll-top-btn');

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
}