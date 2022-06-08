// 1.  start by creating an array of objects that will hold the products that we will have. We will also show these products in the browser:
var products = [{
        name: "Orchid",
        image: "https://cdn.pixabay.com/photo/2018/04/15/23/07/orchid-3323148__340.jpg",
        price: 50.99,
        qtty: 1,
    },
    {
        name: "Rose",
        image: "https://cdn.pixabay.com/photo/2018/01/29/07/11/flower-3115353__340.jpg",
        price: 43.99,
        qtty: 1,
    },
    {
        name: "Lotus",
        image: "https://cdn.pixabay.com/photo/2013/10/17/20/58/flower-197197__340.jpg",
        price: 25.99,
        qtty: 1,
    },
];

// why[0]???because:
// let mona = document.getElementsByClassName("products");
// console.log(mona);

for (let val of products) {
    document.getElementsByClassName(
        "products"
    )[0].innerHTML += `<div class="product col-12 col-md-6 col-lg-4 text-center fw-bold">
            <p class ="product-title h3 m-3">${val.name}</p>
            <img class ="product-image" src="${val.image}" width="200"  height="200">
            <div class="product-details" >
                <p class="product-price h4 m-3">${val.price} €</p>
                <button class="btn btn-primary product-button"  type="button">ADD  TO CART</button>
            </div>
            </div>
            `;
}

let btns = document.getElementsByClassName("product-button");

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        addToCart(products[i]);
    });
}

let cart = [];

function addToCart(product) {
    // cart.push(product);
    let item = cart.find((val) => val.name == product.name);
    if (item) {
        item.qtty++;
    } else {
        cart.push(product);
    }
    // console.table(cart);
    createRows();

    Total();
}

function createRows() {
    var result = "";

    for (let val of cart) {
        result += `
         <div class="cart-row row d-flex">
            <div class="cart-item col-6 my-3 ">
                <img class="cart-item-image" src="${val.image}" width="100" height="100">
                <span class="cart-item-title h5 ">${val.name}</span>
            </div>
            <span class="cart-price col-3 h4 my-3">${val.price} €</span>
            <div class="cart-qtty-action col-3 d-flex">
                <i class="minus fa fa-minus-circle my-auto" ></i>
                <div class="cart-quantity p-4 h4">${val.qtty}</div>
                <i class="plus fa fa-plus-circle my-auto"></i>
                <button class="del btn btn-danger rounded-circle  my-auto ms-3 fw-bold" type="button"> X </button>
            </div>
         </div>
         `;
    }
    document.getElementById("cart-items").innerHTML = result;
    let plus = document.getElementsByClassName("plus");
    let minus = document.getElementsByClassName("minus");
    let del = document.getElementsByClassName("del");

    for (let i = 0; i < plus.length; i++) {
        plus[i].addEventListener("click", function() {
            plusQtty(i);
            Total();
        });
        minus[i].addEventListener("click", function() {
            minusQtty(i);
            Total();
        });
        del[i].addEventListener("click", function() {
            deleteItem(i);
            Total();
        });
    }
}

function Total() {
    let total = 0;
    for (let val of cart) {
        total = total + val.price * val.qtty;
    }
    if ()
        document.querySelector("#price").innerHTML = "€ " + total.toFixed(2);
}

function plusQtty(i) {
    cart[i].qtty++;
    document.getElementsByClassName("cart-quantity")[i].innerHTML = cart[i].qtty;
}

function minusQtty(i) {
    if (cart[i].qtty == 1) {
        cart.splice(i, 1);
        createRows();
    } else {
        cart[i].qtty -= 1;
        document.getElementsByClassName("cart-quantity")[i].innerHTML =
            cart[i].qtty;
    }
}

function deleteItem(i) {
    cart[i].qtty = 1;
    cart.splice(i, 1);
    createRows();
}

// 2. When we print the products, we create a button with the class “product-button”. We can select all this elements and add an event to each button by making a loop:
// let btns = document.getElementsByClassName("product-button");
// for (let i = 0; i < btns.length; i++) {
//     btns[i].addEventListener("click", function() {
//         // ***call the below function here:
//         addToCart(products[i], i);
//     });
// }

// // 3. At the moment, the addToCart function does not exist so, let’s create it:
// var cart = [];

// // ***call this function above
// // function addToCart(product, index) {
// //     cart.push(product);
// //     console.table(cart);
// // }

// // 4.  If you click on the button “ADD TO CART” now, you will be able to see the cart array in the console with the product that you clicked on. Every time you click on the button, the object itself will be added to the cart array. The index will refer to the index of the element (each product), which we will use later.
// // // Although we have all the information we need from the item, we should push each product only once. When clicking a second time, the product shouldn’t be added again, but instead, the quantity should increase by one. If the product doesn’ t exist in the cart, it will be pushed to it.
// function addToCart(product, index) {
//     if (cart.length == 0) {
//         cart.push(product);
//     } else if (cart.find((val) => val.name == product.name)) {
//         product.qtty++;
//     } else {
//         cart.push(product);
//     }
//     // console.table(cart);

//     createRows();
//     Total();
// }

// // 5.  We will now create the function createRows() which will show the items in the cart. This function will go through the elements inside the cart array and print them in the div with id “cart-items”:
// // The function will create the rows of the elements that we have in the cart and print them in the browser.

// function createRows() {
//     var result = "";

//     for (let val of cart) {
//         result += `
//      <div class="cart-row row d-flex">
//         <div class="cart-item col-6 my-3 ">
//             <img class="cart-item-image" src="${val.image}" width="100" height="100">
//             <span class="cart-item-title h5 ">${val.name}</span>
//         </div>
//         <span class="cart-price col-3 h4 my-3">${val.price} €</span>
//         <div class="cart-qtty-action col-3 d-flex">
//             <i class="minus fa fa-minus-circle my-auto" ></i>
//             <div class="cart-quantity p-4 h4">${val.qtty}</div>
//             <i class="plus fa fa-plus-circle my-auto"></i>
//             <button class="del btn btn-danger rounded-circle  my-auto ms-3 fw-bold" type="button"> X </button>
//         </div>
//      </div>
//      `;
//     }
//     document.getElementById("cart-items").innerHTML = result;

//     // 7. Using the same procedure, we will first loop through the pluses and minuses buttons available at the moment on the screen and add an event to them.Then we will create functions for each event, to increase or decrease the quantity.Let's do the button plus first.
//     let plus = document.getElementsByClassName("plus");
//     // 10. Similarly to the adding buttons, we will add the events for the minus buttons on the same loop:    var result = "" ;
//     let minus = document.getElementsByClassName("minus");
//     // Now the delete action will remove a selected item from the cart. We can add an event on the “x” button, and when that button is clicked, the product will be removed from the cart.
//     // 13. The first step is the same as before, all the buttons with the class “del” need to be selected, and then an event calling the function deleteItem() needs to be added to the buttons:
//     let del = document.getElementsByClassName("del");

//     // 8. button plus
//     for (let i = 0; i < plus.length; i++) {
//         plus[i].addEventListener("click", function() {
//             plusQtty(i);
//             Total();
//         });

//         // 11. buttons minus
//         minus[i].addEventListener("click", function() {
//             minusQtty(i);
//             Total();
//         });
//         // 14. buttons minus delete
//         del[i].addEventListener("click", function() {
//             deleteItem(i);
//             Total();
//         });
//     }
// }

// // 6. Next, we will build a function to calculate the total price of the elements in the cart. We can call it Total() and it will look like the code bellow:
// function Total() {
//     let total = 0;

//     for (let val of cart) {
//         total = total + val.price * val.qtty;
//     }
//     document.getElementById("price").innerHTML = total.toFixed(2) + " €";
// }

// // 9. In each iteration, a new event will be added to each button, which will call the function plusQtty() (defined below, in charge of increasing the quantity by 1). In order to increase this quantity, we need to know the index of the element.The plusQtty() function will look as follows: The (i) parameter will help us know which quantity of the product needs to be increased, as well as display the new value of the quantity for that product.
// function plusQtty(i) {
//     cart[i].qtty++;
//     document.getElementsByClassName("cart-quantity")[i].innerHTML = cart[i].qtty;
// }

// // 12. Since the length of the plus buttons is the same as the minus buttons, we don’t need to make another loop in order to go for each minus button. The next step is to create the minusQtty function: This function will first check if the product quantity is equal to one. If yes, the splice method will be used to remove the element from the cart array, and then the createRows() function needs to be called in order to rebuild the HTML. If not, the quantity will decrease by one, and the quantity on the browser will be updated.
// function minusQtty(i) {
//     if (cart[i].qtty == 1) {
//         cart.splice(i, 1);
//         createRows();
//     } else {
//         cart[i].qtty -= 1;
//         document.getElementsByClassName("cart-quantity")[i].innerHTML =
//             cart[i].qtty;
//     }
// }

// // 15. Now the deleteItem() function will look like the code below:
// function deleteItem(i) {
//     cart[i].qtty = 1;
//     cart.splice(i, 1);
//     createRows();
// }