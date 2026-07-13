let tabs = document.querySelector(".main-tabs");
let left = document.querySelector(".left");
let right = document.querySelector(".right");
let sidebar = document.querySelector(".sidebar");
let filterbtn = document.querySelectorAll(".main-tabs div");
let filtercard = document.querySelectorAll(".main-card .catagores");
let sidebarclose = document.querySelector(".sidebar-close");
let customer = document.querySelector(".customer-sidebar");
let customerclose = document.querySelector(".customer-close");
let customeropen = document.querySelector(".customer-open");
let cards = document.querySelectorAll(".main-items .cards");
let chectoutcards = document.querySelectorAll(".checkout-cards");
let cardsbtn = document.querySelectorAll(".card-btn");
let orderbtn = document.querySelector(".sidebar-btn");
let productdetalis = document.querySelector(".product-detail")
let layer = document.querySelector(".layer");
let mobilebtn = document.querySelector(".mobile-btn");
let customerdetailsform = document.querySelector("#customer-details-form");
let customerlayer = document.querySelector(".customer-layer");
let caution = document.querySelector(".caution");
let namecaution = document.querySelector(".Name-caution");
let numbercaution = document.querySelector(".Number-caution");
let formcaution = document.querySelector(".form-caution");
let addresscaution = document.querySelector(".address-caution");
let tost = document.querySelector(".tost");
let totaldiv = document.querySelector(".total-div");
let area = document.querySelector("#Area");
let backcustomerdetails = document.querySelector(".back-btn");
// Catagory Section
let handles = (e) => {
    let scrollval = tabs.scrollLeft
    let maxscrollval = tabs.scrollWidth - tabs.clientWidth
    left.style.display = scrollval > 0 ? "block" : "none"
    right.style.display = maxscrollval > scrollval ? "block" : "none"
}
right.addEventListener("click", () => {
    tabs.scrollLeft += 300
    setTimeout(() => {
        handles(right)
    }, 50);
})
left.addEventListener("click", () => {
    tabs.scrollLeft += -300
    setTimeout(() => {
        handles(left)
    }, 50);
})
// Checkout Sidebar
function Checkoutopen() {
    sidebar.classList.toggle("sidebar-open")
    sidebarclose.classList.toggle("sidebar-open")
    layer.classList.add("layer-open")
    document.body.style.overflow = "hidden"
}
function Checkoutclose() {
    sidebar.classList.remove("sidebar-open")
    sidebarclose.classList.add("sidebar-close")
    layer.classList.remove("layer-open")
    document.body.style.overflow = "auto"
}
document.addEventListener("keydown", function close(event) {
    if (event.key === "Escape") {
        Checkoutclose()
    }
})
// Customer to checkout back btn
backcustomerdetails.addEventListener("click", () => {
    Customerclose()
    Checkoutopen()
})
// // Customer Sidebar
function Customeropen() {
    customer.classList.add("customer-open")
    customerclose.classList.toggle("customer-open")
    customerlayer.classList.add("layer-open")
    document.body.style.overflow = "hidden"
}
function Customerclose() {
    customer.classList.remove("customer-open")
    customerclose.classList.add("customer-close")
    customerlayer.classList.remove("layer-open")
    document.body.style.overflow = "auto"
}
document.addEventListener("keydown", function close(event) {
    if (event.key === "Escape") {
        Customerclose()
    }
})
// Filter Section
let filter = (btn) => {
    document.querySelector(".active").classList.remove("active")
    btn.target.classList.add("active")

    filtercard.forEach(card => {
        card.classList.add("hide")
        if (btn.target.dataset.name === card.dataset.name || btn.target.dataset.name === "All") {
            card.classList.remove("hide")
        }
    })
}
filterbtn.forEach(btn => {
    btn.addEventListener("click", filter)
});
// Order Process
let cart = JSON.parse(localStorage.getItem("cart")) || []
cardsbtn.forEach(btn => {
    btn.addEventListener("click", (btn) => {
        let title = btn.target.parentElement.children[0].children[0].textContent
        let prize = btn.target.parentElement.children[0].children[2].children[0].textContent
        let img = btn.target.parentElement.parentElement.children[0].querySelector("img").src
        checkout(title, prize, img)
    })
})
let checkout = (title, prize, img) => {
    let exest = cart.find(item =>
        item.title === title
    )
    if (exest) {
        tost.classList.toggle("tost-show")
        setTimeout(() => {
            tost.classList.toggle("tost-show")
        }, 3000);
        return
    }
    else {
        cart.push({
            title,
            prize,
            img,
            quantity: 1,
        })
    }
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    )
    cardsrendreing()
}
let cardsrendreing = () => {
    chectoutcards[0].innerHTML = "";
    totlaprize()
    cart.forEach((order, index) => {
        chectoutcards[0].innerHTML += `
        <div class="product-card">
                 <div class="product-img">
                    <img width="100%" height="100%" src="${order.img}" alt="Order-img"> </div>
                <div> <div class="product-details">
                    <h3>${order.title}</h3>
                     <h4>Prize: <span>${order.prize}</span></h4>
                 </div> <div class="quantity-capsule"> <svg onclick="incres(${index})"xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#000000"> <path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z" /> </svg>
                         <div class="quantity">${order.quantity}</div>
                         <svg onclick="decre(${index})" xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#000000"> <path d="M232-444v-72h496v72H232Z" /> </svg> </div>
                 </div>
             </div
        `
    })

}
let incres = (index) => {
    cart[index].quantity++
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
    cardsrendreing()
}
let decre = (index) => {
    cart[index].quantity--

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
    cardsrendreing()
    totlaprize()
}
let deliverychargers = {
    "Please choose your area": 0,
    "Satellite Town": 50,
    "University Road": 100,
    "Alif Chowk": 70,
    "49 Tail": 120,
    "Far Area": 150
}
let subtotla
function totlaprize() {
    let totalprize = 0
    let deliverycharg = 0

    cart.forEach(item => {
        let prize = Number(item.prize.replace(",", ""))
        totalprize += prize * item.quantity
    })
    if (cart.length === 0) {
        productdetalis.children[2].children[0].textContent = totalprize
        return
    }
    else {
        productdetalis.children[2].children[0].textContent = totalprize
        totaldiv.children[0].children[0].textContent = totalprize
        totaldiv.children[2].children[0].textContent = total

        totaldiv.children[3].children[0].textContent = totalprize
        totaldiv.children[3].style.display = "none"
        return totalprize
    }
}
let Area
let deliverycharge
let total = 0
area.addEventListener("change", () => {
    Area = area.value
    deliverycharge = deliverychargers[area.value]
    totaldiv.children[1].children[0].textContent = deliverycharge
    if (deliverycharge) {
        total = totlaprize() + deliverycharge
        totaldiv.children[2].children[0].textContent = total
        return Area, deliverycharge, total
    }
})
let delivery = () => {
    let DeliveryStates
    let pick = document.getElementById(`Pick up`)
    let Delivery = document.getElementById(`Cash on Delivery`)
    if (pick.checked) {
        DeliveryStates = pick.id
        if (DeliveryStates === "Pick up") {
            customerdetailsform.children[6].style.display = "none"
            customerdetailsform.children[7].style.display = "none"
            customerdetailsform.children[8].style.display = "none"
            customerdetailsform.children[9].style.display = "none"
            customerdetailsform.children[10].style.display = "none"
            customerdetailsform.children[11].style.display = "none"
            customerdetailsform.children[5].required = false
            customerdetailsform.children[6].required = false
            customerdetailsform.children[7].required = false
            customerdetailsform.children[8].required = false
            customerdetailsform.children[9].required = false
            customerdetailsform.children[10].required = false
            totaldiv.children[0].style.display = "none"
            totaldiv.children[1].style.display = "none"
            totaldiv.children[2].style.display = "none"
            totaldiv.children[3].style.display = "block"
            console.log(DeliveryStates)
        }
    } else if (Delivery.checked) {
        DeliveryStates = Delivery.id
        if (DeliveryStates === "Cash on Delivery") {
            customerdetailsform.children[6].style.display = "block"
            customerdetailsform.children[7].style.display = "block"
            customerdetailsform.children[8].style.display = "block"
            customerdetailsform.children[9].style.display = "block"
            customerdetailsform.children[10].style.display = "block"
            customerdetailsform.children[5].required = true
            customerdetailsform.children[6].required = true
            customerdetailsform.children[7].required = true
            customerdetailsform.children[8].required = true
            customerdetailsform.children[9].required = true
            totaldiv.children[0].style.display = "block"
            totaldiv.children[1].style.display = "block"
            totaldiv.children[2].style.display = "block"
            totaldiv.children[3].style.display = "none"
            console.log(DeliveryStates)
        }
    }
    return DeliveryStates
}
let Order = () => {
    if (cart.length === 0) {
        caution.innerHTML = "Enter items in your Cart."
    } else if (delivery() === undefined) {
        caution.textContent = "Select your delivery option."
    }
    else {
        Checkoutclose()
        Customeropen()
    }
}
orderbtn.addEventListener("click", Order)

function massage() {
    let massage = "------------------------------\nCustomer Details\n------------------------------\n"
    if (delivery() === 'Cash on Delivery' && customerdata.massage === '') {
        massage += `Name: ${customerdata.Name}\n`
        massage += `PhoneNumber: ${customerdata.number}\n`
        massage += `Area: ${Area}\n`
        massage += `Full Address: ${customerdata.address}\n\n`
    } else if (delivery() === 'Cash on Delivery' && customerdata.massage !== '') {
        massage += `Name: ${customerdata.Name}\n`
        massage += `PhoneNumber: ${customerdata.number}\n`
        massage += `Area: ${Area}\n`
        massage += `Full Address: ${customerdata.address}\n`
        massage += `Massage: ${customerdata.massage}\n\n`
    }
    if (delivery() === 'Pick up' && customerdata.massage === '') {
        massage += `Name: ${customerdata.Name}\n`
        massage += `PhoneNumber: ${customerdata.number}\n\n`
    } else if (delivery() === 'Pick up' && customerdata.massage !== '') {
        massage += `Name: ${customerdata.Name}\n`
        massage += `PhoneNumber: ${customerdata.number}\n`
        massage += `Massage: ${customerdata.massage}\n\n`
    }
    massage += "------------------------------\nNew Order\n------------------------------\n"
    cart.forEach((items, index) => {
        massage +=
            `${index + 1}.${items.title}
    Quantity:${items.quantity}
    Prize:${items.prize}\n\n`
    })
    massage += "------------------------------\nDilivery Details\n------------------------------\n"
    if (delivery() === 'Pick up' && customerdata.massage === '') {
        massage += `Delivery States: ${delivery()}\n`
        massage += `Total: Rs${totlaprize()}\n\n`
        
    } else if (delivery() === 'Pick up' && customerdata.massage !== '') {
        massage += `Delivery States: ${delivery()}\n`
        massage += `Total: Rs${totlaprize()}\n\n`
    }
    if (delivery() === 'Cash on Delivery' && customerdata.massage === '') {
        massage += `Delivery States: ${delivery()}\n`
        massage += `Subtotal: ${totlaprize()}\n`
        massage += `Delivery-charges: ${deliverycharge}\n`
        massage += `Total: Rs${total}\n\n`
        
    } else if (delivery() === 'Cash on Delivery' && customerdata.massage !== '') {
        massage += `Delivery States: ${delivery()}\n`
        massage += `Subtotal: ${totlaprize()}\n`
        massage += `Delivery-charges: ${deliverycharge}\n`
        massage += `Total: Rs${total}\n\n`
    }
    massage += `Note: Resturent can always rematch the items name and his prize and also recalculate total prize.`
    return massage
}
let customerdata;
let cautions = {
    1: "Please enter your Full Name.",
    2: "Please enter your PhoneNumber",
    3: "Please enter your Area.",
    4: "Please enter your Full Address.",
}
customerdetailsform.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    let formProps = Object.fromEntries(formData);
    customerdata = formProps
    if (customerdata.Name.length < 3) {
        namecaution.textContent = cautions[1]
        return
    }else if (customerdata.number == '') {
        numbercaution.textContent = cautions[2]
        return
    }else if (delivery() === 'Cash on Delivery' && area.value === "Please choose your area") {
        formcaution.textContent = cautions[3]
        return
    } else if (delivery() === 'Cash on Delivery' && customerdata.address == '') {
        addresscaution.textContent = cautions[4]
        return
    }
        let whatsapp = `https://wa.me/923069832964?text=${encodeURIComponent(massage())}`
        window.open(whatsapp, "_blank")
    return customerdata
});
cardsrendreing()
