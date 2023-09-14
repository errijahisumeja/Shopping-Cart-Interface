
// json data include all products on page
const product = [
    {
        id: 0,
        image: 'shirt2.jpg',
        title: 'T-shirt',
        category: 'women',
        price: 40,
    },
    {
        id: 1,
        image: 'hoodie1.jpg',
        title: 'Black hoodie',
        category: 'men',
        price: 50,
    },
    {
        id: 2,
        image: 'airpods.jpg',
        title: 'Airpods',
        category: 'accessories',
        price: 129,
    },
    {
        id: 3,
        image: 'phonecase.jpg',
        title: 'Minecraft Phone case ',
        category: 'accessories',
        price: 35,
    },
    {
        id: 4,
        image: 'samsungS21.jpg',
        title: 'Samsung S21',
        category: 'mobile',
        price: 700,
    },
    {
        id: 5,
        image: 'sneakers.jpg',
        title: 'Sneakers for men',
        category: 'shoes',
        price: 60,
    },
    {
        id: 6,
        image: 'socks1.jpg',
        title: 'Socks',
        category: 'accessories',
        price: 13,
    },
    {
        id: 7,
        image: 'necklace.jpg',
        title: "Golden Necklace",
        category: 'accessories',
        price: 120,
    },
    {
        id: 8,
        image: 'sunglasses.jpg',
        title: "Cat Eye Oval Goggles Sunglasses",
        category: 'accessories',
        price: 20,
    },
    {
        id: 9,
        image: 'nike.jpg',
        title: "Nike shoes",
        category: 'shoes',
        price: 120,
    },
    {
        id: 10,
        image: 'iphone.jpg',
        title: "iPhone 14 Plus 512GB (PRODUCT)RED",
        category: 'mobile',
        price: 1779,
    },
    {
        id: 11,
        image: 'primo.jpg',
        title: "'PRIMO' T-shirt",
        category: 'men',
        price: 70,
    }
];


const rootElement = document.getElementById('root');
const selectElement = document.getElementById("select");



const categories = [...new Set(product.map((item)=>
    {return item}))]
    let i = 0;
document.getElementById('root').innerHTML = categories.map((item)=>
{
    var {image, title, price} = item;
    return(
        `<div class='box'>
            <div class='img-box'>
                <img class='images' src=${image}></img>
            </div>
        <div class='bottom'>
        <p>${title}</p>
        <h2>$ ${price}.00</h2>` +
        "<button onclick='addtocart(" +  (i++) + ")'>Add to cart</button>" +
        `</div>
        </div>`        
    )
}).join('')

//This function provide filtering product bz it's categories
const buttons = document.querySelectorAll('.button-value');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('category');
        const filteredProducts = category === 'all' ?
            product : product.filter(item => item.category === category);


        updateDisplay(filteredProducts);
       
       
        let storeFilter = JSON.stringify(filteredProducts)
        localStorage.setItem("sorted", storeFilter);        
    });
});



//array for storing all products which are added to cart 

var cart = []

//funtion to add wanted product to cart
function addtocart(a) {
    
    const selectedProduct = categories.find(item => item.id === a);// search if there are any item with the same id as selected product
  
    if (selectedProduct) { 
      cart.push({ ...selectedProduct});
      displaycart();//funtion to display all products in the cart after 
    }
  }
  
//delete product from cart 
function delElement(a){
    cart.splice(a, 1);
    displaycart();
}





//with this funtion sorting by price is done
function sortProducts(option){
    let sortedProducts = [...product];

    switch(option){
        case "LowToHigh":
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case "HighToLow":
            sortedProducts.sort((a, b) => (b.price - a.price));
            break;
    }
    updateDisplay(sortedProducts);
}

//this function also does the sorting by price but just by one category of products
function sortProduct(option){
    const sort = JSON.parse(localStorage.getItem("sorted")); //I used local storage in case to set and get json data which are filtered   
    let sortedProduct = [...sort];

    switch(option){
        case "LowToHigh":
            sortedProduct.sort((a, b) => a.price - b.price);
            break;
        case "HighToLow":
            sortedProduct.sort((a, b) => (b.price - a.price));
            break;
    }
    updateDisplay(sortedProduct);
}

//goes through an array of products and displays it 
function displaycart(a){
    let j = 0, total = 0;
    document.getElementById('count').innerHTML = cart.length;
    if (cart.length == 0){
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById('total').innerHTML = "$ " + 0 + ".00"; 
    }
    else{
        document.getElementById("cartItem").innerHTML = cart.map((items)=>
        {
            var {image, title, price} = items;
            total = total + price; //sum all the prices in cart
            document.getElementById('total').innerHTML = "$ " + total + ".00"; 
            return(
                `<div class='cart-item'>
                <div class='row-img'>
                    <img class='rowimg' src=${image}>
                </div>
                <p style='font-size: 12px;'>${title}</p>
                <h2 style='font-size: 15px;'>$ ${price}.00</h2>` +
                "<i class='fa-solid fa-trash' onclick='delElement(" + (j++) + ")'></i></div>"
            );
        }).join('');
    }
}

//waiting for some change

selectElement.addEventListener("change", event => {
    const selectedOption = event.target.value;
    sortProducts(selectedOption);
  });

  selectElement.addEventListener("change", event => {
    const selectedOption = event.target.value;
    sortProduct(selectedOption);
  });


     

//this one goes through all sorted products in case to displays it on the page

function updateDisplay(sortedProducts) {
    rootElement.innerHTML = "";

    sortedProducts.forEach(item => {
        const { image, title, price, id } = item;

        rootElement.innerHTML += `
            <div class='box'>
                <div class='img-box'>
                    <img class='images' src=${image}></img>
                </div>
                <div class='bottom'>
                    <p>${title}</p>
                    <h2>$ ${price}.00</h2>
                    <button onclick='addtocart(${id})'>Add to cart</button>
                </div>
            </div>`;
    });
}

updateDisplay(product);









//this part of code is for validation form

const form = document.getElementById('form');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const address = document.getElementById('address');



form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};


//it checks if the email is valid
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


//sets limitations in terms of mandatory data
const validateInputs = () => {
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const addressValue = address.value.trim();
    const nameOnCardValue = nameOnCard.value.trim();
    const creditCardNumberValue = creditCardNumber.value.trim();
    const expirationValue = expiration.value.trim();
    const cvvValue = cvv.value.trim();

    if(firstNameValue === '') {
        setError(firstName, 'First name is required');
    } else {
        setSuccess(firstName);
    }

    if(lastNameValue === '') {
        setError(lastName, 'Last name is required');
    } else {
        setSuccess(lastName);
    }

    if (addressValue == ''){
        setError(address, "Address is required")
    }else{
        setSuccess(address)
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Please enter valid email');
    } else {
        setSuccess(email);
    }
    if(nameOnCardValue === '') {
        setError(nameOnCard, 'Name on card is required');
    } else {
        setSuccess(nameOnCard);
    }
    if(creditCardNumberValue === '') {
        setError(creditCardNumber, 'Credit card number is required');
    } else {
        setSuccess(creditCardNumber);
    }
    if(expirationValue === '') {
        setError(expiration, 'Expiration date is required');
    } else {
        setSuccess(expiration);
    }
    if(cvvValue === '') {
        setError(cvv, 'CVV is required');
    } else {
        setSuccess(cvv);
    }

};

