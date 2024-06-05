document.addEventListener('DOMContentLoaded', function() {
    const product = {
        coffeeTypes: [
            { id: 0, image: 'static/images/flatwhite.jpg', title: 'Flat White', price: 15.00 },
            { id: 1, image: 'static/images/cappuchino.jpg', title: 'Cappuchino', price: 14.00 },
            { id: 2, image: 'static/images/frappuchino.jpg', title: 'Frappuchino', price: 18.00 },
            { id: 3, image: 'static/images/latte.jpg', title: 'Latte', price: 16.00 },
            { id: 4, image: 'static/images/mocha.jpg', title: 'Mocha', price: 17.00 },
        ],
        cupSizes: [
            { id: 5, image: 'static/images/smallcup.png', title: 'Small(10oz)', price: 1.00 },
            { id: 6, image: 'static/images/mediumcup.png', title: 'Regular(12oz)', price: 2.00 },
            { id: 7, image: 'static/images/largecup.png', title: 'Large(16oz)', price: 3.00 },
        ],
        temperatures: [
            { id: 8, image: 'static/images/hot.png', title: 'Hot', price: 0.20 },
            { id: 9, image: 'static/images/cold.png', title: 'Cold', price: 0.50 },
        ],
        coffeeBeans: [
            { id: 10, image: 'static/images/arabica.jpg', title: 'Arabica', price: 0.05},
            { id: 11, image: 'static/images/robusta.jpg', title: 'Robusta', price: 0.05},
            { id: 12, image: 'static/images/excelsa.jpg', title: 'Excelsa', price: 0.05},
            { id: 13, image: 'static/images/liberica.jpg', title: 'Liberica', price: 0.05},
        ],
        milkTypes: [
            { id: 14, image: 'static/images/coconutmilk.png', title: 'Coconut Milk', price: 1.00 },
            { id: 15, image: 'static/images/freshmilk.png', title: 'Fresh Milk', price: 2.00 },
            { id: 16, image: 'static/images/creammilk.png', title: 'Cream Milk', price: 2.50 },
        ],
        blendingOptions: [
            { id: 17, image: 'static/images/almond.png', title: 'Almond', price: 2.00 },
            { id: 18, image: 'static/images/hazelnut.png', title: 'Hazelnut', price: 2.00 },
            { id: 19, image: 'static/images/cinnamon.png', title: 'Cinnamon', price: 1.00 },
            { id: 20, image: 'static/images/vanilla.png', title: 'Vanilla', price: 1.30 },
        ],
        toppings: [
            { id: 21, image: 'static/images/whippedcream.png', title: 'Whipped Cream', price: 0.20 },
            { id: 22, image: 'static/images/chocolatesyrup.png', title: 'Chocolate Syrup', price: 0.60 },
            { id: 23, image: 'static/images/chocolatechip.png', title: 'Chocolate Chip', price: 0.50 },
            { id: 24, image: 'static/images/caramel.png', title: 'Caramel Drizzle', price: 0.20 },
        ]
    };

    let cart = [];

    function addtocart(index, type) {
        const selectedItem = { ...product[type][index], type };
        const isItemInCart = cart.some(item => item.type === type);

        if (!isItemInCart) {
            cart.push(selectedItem);
            displaycart();
        } else {
            console.log(`An item has been added to cart from this category.`);
            alert(`An item has been added to cart from this category.`);
        }
    }

    function delElement(index) {
        cart.splice(index, 1);
        displaycart();
    }

    function calculateTotalPrice() {
        return cart.reduce((total, item) => total + item.price, 0);
    }

    function displaycart() {
        const cartItem = document.getElementById('cartItem');

        if (cart.length === 0) {
            cartItem.innerHTML = "Your cart is empty";
        } else {
            cartItem.innerHTML = cart.map((item, index) => {
                const { image, title, price, type } = item;
                return `
                    <div class='cart-item'>
                        <div class='row-img'>
                            <img class='rowimg' src='${image}'></img>
                        </div>
                        <p style='font-size:12px;'>${title}</p>
                        <h2 style='font-size: 15px;'>$ ${price}</h2>
                        <p style='font-size: 12px;'>Type: ${type}</p>
                        <button class="delete-btn" data-index="${index}"><i class="fa fa-trash"></i></button>
                    </div>`;
                   
            }).join('');

            const totalPrice = calculateTotalPrice();
            cartItem.innerHTML += `
                <div class='cart-total'>
                    <h2>Total Price: $ ${totalPrice}</h2>
                </div>`;
        }

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                delElement(index);
            });
        });
    }

    const root = document.getElementById('root');
    root.innerHTML = `
        <div class='product-category'>
            <h2>Coffee Types</h2>
            ${product.coffeeTypes.map((item, index) => {
                const { image, title, price } = item;
                return `
                    <div class='box'>
                        <div class='img-box'>
                            <img class='images' src='${image}'></img>
                        </div>
                        <div class='bottom'>
                            <p>${title}</p>
                            <h2>$ ${price}</h2>
                            <button class="add-to-cart-btn" data-index="${index}" data-type="coffeeTypes">Add to cart</button>
                        </div>
                    </div>`;
            }).join('')}
        </div>
    
        <div class='product-category'>
            <h2>Cup Size</h2>
            ${product.cupSizes.map((item, index) => {
                const { image, title, price } = item;
                return `
                    <div class='box'>
                        <div class='img-box'>
                            <img class='images' src='${image}'></img>
                        </div>
                        <div class='bottom'>
                            <p>${title}</p>
                            <h2>$ ${price}</h2>
                            <button class="add-to-cart-btn" data-index="${index}" data-type="cupSizes">Add to cart</button>
                        </div>
                    </div>`;
            }).join('')}
        </div>

        <div class='product-category'>
            <h2>Temperature</h2>
            ${product.temperatures.map((item, index) => {
                const { image, title, price } = item;
                return `
                    <div class='box'>
                        <div class='img-box'>
                            <img class='images' src='${image}'></img>
                        </div>
                        <div class='bottom'>
                            <p>${title}</p>
                            <h2>$ ${price}</h2>
                            <button class="add-to-cart-btn" data-index="${index}" data-type="temperatures">Add to cart</button>
                        </div>
                    </div>`;
            }).join('')}
        </div>

        <div class='product-category'>
            <h2>Type of Coffee Beans</h2>
            ${product.coffeeBeans.map((item, index) => {
                const { image, title, price } = item;
                return `
                    <div class='box'>
                        <div class='img-box'>
                            <img class='images' src='${image}'></img>
                        </div>
                        <div class='bottom'>
                            <p>${title}</p>
                            <h2>$ ${price}</h2>
                            <button class="add-to-cart-btn" data-index="${index}" data-type="coffeeBeans">Add to cart</button>
                        </div>
                    </div>`;
            }).join('')}
        </div>

        <div class='product-category'>
            <h2>Type of Milk</h2>
            ${product.milkTypes.map((item, index) => {
                const { image, title, price } = item;
                return `
                    <div class='box'>
                        <div class='img-box'>
                            <img class='images' src='${image}'></img>
                        </div>
                        <div class='bottom'>
                            <p>${title}</p>
                            <h2>$ ${price}</h2>
                            <button class="add-to-cart-btn" data-index="${index}" data-type="milkTypes">Add to cart</button>
                        </div>
                    </div>`;
            }).join('')}
        </div>

        <div class='product-category'>
            <h2>Blending Options</h2>
            ${product.blendingOptions.map((item, index) => {
                const { image, title, price } = item;
                return `
                    <div class='box'>
                        <div class='img-box'>
                            <img class='images' src='${image}'></img>
                        </div>
                        <div class='bottom'>
                            <p>${title}</p>
                            <h2>$ ${price}</h2>
                            <button class="add-to-cart-btn" data-index="${index}" data-type="blendingOptions">Add to cart</button>
                        </div>
                    </div>`;
            }).join('')}
        </div>

        <div class='product-category'>
            <h2>Toppings</h2>
            ${product.toppings.map((item, index) => {
                const { image, title, price } = item;
                return `
                    <div class='box'>
                        <div class='img-box'>
                            <img class='images' src='${image}'></img>
                        </div>
                        <div class='bottom'>
                            <p>${title}</p>
                            <h2>$ ${price}</h2>
                            <button class="add-to-cart-btn" data-index="${index}" data-type="toppings">Add to cart</button>
                        </div>
                    </div>`;
            }).join('')}
        </div>
    `;

    root.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const type = this.getAttribute('data-type');
            addtocart(index, type);
        });
    });

    displaycart();
});


