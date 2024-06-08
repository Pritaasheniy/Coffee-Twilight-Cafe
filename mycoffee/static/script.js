document.addEventListener('DOMContentLoaded', function() {
    const product = {
        coffeeTypes: [
            { id: 0, image: '/mycoffee/static/images/flatwhite.jpg', title: 'Flat White', price: 12 },
            { id: 1, image: '/mycoffee/static/images/cappuchino.jpg', title: 'Cappuchino', price: 13 },
            { id: 2, image: '/mycoffee/static/images/frappuchino.jpg', title: 'Frappuchino', price: 14 },
            { id: 3, image: '/mycoffee/static/images/latte.jpg', title: 'Latte', price: 12 },
            { id: 4, image: '/mycoffee/static/images/mocha.jpg', title: 'Mocha', price: 12 },
        ],
        cupSizes: [
            { id: 5, image: '/mycoffee/static/images/smallcup.png', title: 'Small(10oz)', price: 1 },
            { id: 6, image: '/mycoffee/static/images/mediumcup.png', title: 'Regular(12oz)', price: 1 },
            { id: 7, image: '/mycoffee/static/images/largecup.png', title: 'Large(16oz)', price: 1 },
        ],
        temperatures: [
            { id: 8, image: '/mycoffee/static/images/hot.png', title: 'Hot', price: 1 },
            { id: 9, image: '/mycoffee/static/images/cold.png', title: 'Cold', price: 1 },
        ],
        coffeeBeans: [
            { id: 10, image: '/mycoffee/static/images/arabica.jpg', title: 'Arabica', price: 0.0 },
            { id: 11, image: '/mycoffee/static/images/robusta.jpg', title: 'Robusta', price: 0.0 },
            { id: 12, image: '/mycoffee/static/images/excelsa.jpg', title: 'Excelsa', price: 0.0 },
            { id: 13, image: '/mycoffee/static/images/liberica.jpg', title: 'Liberica', price: 0.0 },
        ],
        milkTypes: [
            { id: 14, image: '/mycoffee/static/images/coconutmilk.png', title: 'Coconut Milk', price: 1 },
            { id: 15, image: '/mycoffee/static/images/freshmilk.png', title: 'Fresh Milk', price: 1 },
            { id: 16, image: '/mycoffee/static/images/creammilk.png', title: 'Cream Milk', price: 1 },
        ],
        blendingOptions: [
            { id: 17, image: '/mycoffee/static/images/almond.png', title: 'Almond', price: 1.00 },
            { id: 18, image: '/mycoffee/static/images/hazelnut.png', title: 'Hazelnut', price: 1 },
            { id: 19, image: '/mycoffee/static/images/cinnamon.png', title: 'Cinnamon', price: 1 },
            { id: 20, image: '/mycoffee/static/images/vanilla.png', title: 'Vanilla', price: 1 },
        ],
        toppings: [
            { id: 21, image: '/mycoffee/static/images/whippedcream.png', title: 'Whipped Cream', price: 0.0 },
            { id: 22, image: '/mycoffee/static/images/chocolatesyrup.png', title: 'Chocolate Syrup', price: 0.0 },
            { id: 23, image: '/mycoffee/static/images/chocolatechip.png', title: 'Chocolate Chip', price: 0.0 },
            { id: 24, image: '/mycoffee/static/images/caramel.png', title: 'Caramel Drizzle', price: 0.0 },
        ]
    };

    let cart = [];
    let finalizedCart = [];

    function addtocart(index, type) {
        const existingItemIndex = cart.findIndex(item => item.category === type);
        if (existingItemIndex !== -1) {
            alert(`You can only add one item from the ${type} category to the cart.`);
        } else {
            cart.push({ ...product[type][index], category: type });
            displaycart();
        }
    }

    function delElement(index) {
        cart.splice(index, 1);
        displaycart();
    }

    function calculateTotal() {
        return cart.reduce((total, item) => total + item.price, 0);
    }

    function displaycart() {
        const cartItem = document.getElementById('cartItem');
        const totalElement = document.getElementById('total');

        if (cart.length === 0) {
            cartItem.innerHTML = "Your cart is empty";
            totalElement.innerHTML = "$0.00";
        } else {
            cartItem.innerHTML = cart.map((item, index) => {
                const { image, title, price } = item;
                return `
                    <div class='cart-item'>
                        <div class='row-img'>
                            <img class='rowimg' src='${image}'></img>
                        </div>
                        <p style='font-size:12px;'>${title}</p>
                        <h2 style='font-size: 15px;'>$ ${price}.00</h2>
                        <button class="delete-btn" data-index="${index}"><i class="fa fa-trash"></i></button>
                    </div>`;
            }).join('');
            totalElement.innerHTML = `Total: $${calculateTotal()}.00`;
        }

        // Event listener for Delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                delElement(index);
            });
        });
    }

    function finalizeCart() {
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        // Create a group item representing all items in the cart
        const groupItem = {
            id: new Date().getTime(),
            title: 'Custom Coffee Order',
            items: [...cart],
            price: calculateTotal()
        };

        finalizedCart.push(groupItem);

        // Update the icon with the count of group items
        const icon = document.querySelector('.icon');
        icon.innerHTML = `
            <div class="cart"><i class="fa-solid fa-cart-shopping"></i><p id="count">${finalizedCart.length}</p></div>
        `;

        // Reset the cart
        cart = [];
        displaycart();
    }

    function renderProductCategory(category, categoryName) {
        return `
            <div class='product-category'>
                <h2>${categoryName}</h2>
                ${category.map((item, index) => {
                    const { image, title, price } = item;
                    return `
                        <div class='box'>
                            <div class='img-box'>
                                <img class='images' src='${image}'></img>
                            </div>
                            <div class='bottom'>
                                <p>${title}</p>
                                <h2>$ ${price}.00</h2>
                                <button class="add-to-cart-btn" data-index="${index}" data-type="${categoryName.toLowerCase().replace(/ /g, '')}">Add to cart</button>
                            </div>
                        </div>`;
                }).join('')}
            </div>
        `;
    }

    function renderProducts(products) {
        const root = document.getElementById('root');
        root.innerHTML = '';
        products.forEach(item => {
            const { image, title, price, type } = item;
            root.innerHTML += `
            <div class='box'>
                <div class='img-box'>
                    <img class='images' src='${image}'></img>
                </div>
                <div class='bottom'>
                    <p>${title}</p>
                    <h2>$ ${price}.00</h2>
                    <button class="add-to-cart-btn" data-index="${item.id}" data-type="${type}">Add to cart</button>
                </div>
            </div>`; 
        });
    }

    function filterProducts(searchTerm) {
        const filteredProducts = [];
        Object.keys(product).forEach(key => {
            product[key].forEach(item => {
                if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                    filteredProducts.push({ ...item, type: key });
                }
            });
        });
        renderProducts(filteredProducts);
        addEventListeners();
    }

    function addEventListeners() {
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const type = this.getAttribute('data-type');
                addtocart(index, type);
            });
        });
    }

    document.getElementById('search-box').addEventListener('input', function() {
        filterProducts(this.value);
    });

    const root = document.getElementById('root');
    root.innerHTML = `
        ${renderProductCategory(product.coffeeTypes, 'Coffee Types')}
        ${renderProductCategory(product.cupSizes, 'Cup Sizes')}
        ${renderProductCategory(product.temperatures, 'Temperatures')}
        ${renderProductCategory(product.coffeeBeans, 'Coffee Beans')}
        ${renderProductCategory(product.milkTypes, 'Milk Types')}
        ${renderProductCategory(product.blendingOptions, 'Blending Options')}
        ${renderProductCategory(product.toppings, 'Toppings')}
    `;

    addEventListeners();

    document.getElementById('addButton').addEventListener('click', finalizeCart);

    displaycart();
});
