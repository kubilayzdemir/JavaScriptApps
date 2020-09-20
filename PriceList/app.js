// Storage Controller
const storageController = (function () {

return{
    storeProduct : function(product){
        let products;
        if (localStorage.getItem('products') === null) {
            products = [];
            products.push(product);
        }else{
            products = JSON.parse(localStorage.getItem('products'));
            products.push(product);
        }
        localStorage.setItem('products',JSON.stringify(products));
    },
    getProducts : function(){
        let products;
        if (localStorage.getItem('products') === null) {
            products = [];
        }else{
            products = JSON.parse(localStorage.getItem('products'))
        }
        return products;
    }, 
    updateProduct : function(product){
        let products = JSON.parse(localStorage.getItem('products'))

        products.forEach(function(prd,index){
            if (product.id == prd.id) {
                products.splice(index,1,product);
            }
        });
        localStorage.setItem('products',JSON.stringify(products))
    },
    deleteProduct : function(id){
        let products = JSON.parse(localStorage.getItem('products'))

        products.forEach(function(prd,index){
            if (id == prd.id) {
                products.splice(index,1);
            }
        });
        localStorage.setItem('products',JSON.stringify(products))

    }
}

})()



// Product Controller
const ProductController = (function () {

    const Product = function (id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    const data = {
        products: storageController.getProducts(),
        selectedProduct: null,
        totalPrice: 0
    }

    return {
        getProducts: function () {
            return data.products;
        },
        getData: function () {
            return data;
        },
        getProductById: function (id) {
            let product = null;
            data.products.forEach(prd => {
                if (prd.id == id) {
                    product = prd;
                }
            })
            return product;
        },
        setCurrentProduct: function (product) {
            data.selectedProduct = product
        },
        getCurrentProduct: function () {
            return data.selectedProduct;
        },
        addProduct: function (name, price) {
            let id;
            if (data.products.length > 0) {
                id = data.products.length;
            } else {
                id = 0;
            }
            const newProduct = new Product(id, name, parseFloat(price));
            data.products.push(newProduct)
            return newProduct
        },
        updateProduct: function (name, price) {
            let product = null;

            data.products.forEach(prd => {
                if (data.selectedProduct.id == prd.id){
                    prd.name = name;
                    prd.price = parseFloat(price);
                    product = prd
                }

            })
            return product;
        },
        deleteProduct: function (product) {

            data.products.forEach(function (prd, index) {
                if (prd.id == product.id) {
                    data.products.splice(index, 1)
                }
            })
        },
        getTotal: function (products) {
            let total = 0;
            data.products.forEach(product => {
                total += product.price;
            });
            data.totalPrice = total;
            return data.totalPrice;
        }
    }
})()

// UI Controller
const UIController = (function () {

    const Selectors = {
        productList: "#item-list",
        productListItems: '#item-list tr',
        addButton: '#addBtn',
        updateButton: '.updateBtn',
        cancelButton: '.cancelBtn',
        deleteButton: '.deleteBtn',
        productName: '#productName',
        productPrice: '#productPrice',
        productCard: '#productCard',
        totalTL: '#total-tl',
        totalUSD: '#total-usd'
    }

    return {
        createProductList: function (products) {
            let html = ''

            products.forEach(product => {
                html += `
                <tr id="item-list tr">
                    <td>${product.id + 1}</td>
                    <td>${product.name}</td>
                    <td>${product.price} $</td>
                    <td class="text-right"> 
                        <i class="far fa-edit edit-product">Edit</i>
                    </td>
                </tr>`
            });

            document.querySelector(Selectors.productList).innerHTML = html
        },
        getSelectors: function () {
            return Selectors;
        },
        addProduct: function (newProduct) {
            document.querySelector(Selectors.productCard).style.display = 'block'
            var item = `
            <tr id="item-list tr">
                <td>${newProduct.id + 1}</td>
                <td>${newProduct.name}</td>
                <td>${newProduct.price} $</td>
                <td class="text-right"> 
                    <i class="far fa-edit edit-product">Edit</i>
                </td>
            </tr>
            `
            document.querySelector(Selectors.productList).innerHTML += item;
        },
        updateProduct: function (prd) {
            let updatedItem = null
            let items = document.querySelectorAll(Selectors.productListItems);
            items.forEach(item => {
                if (item.classList.contains('bg-warning')) {
                    item.children[1].textContent = prd.name;
                    item.children[2].textContent = prd.price + ' $'
                    updatedItem = item;

                }
            })

            return updatedItem
        },
        clearInputs: function () {
            document.querySelector(Selectors.productName).value = '';
            document.querySelector(Selectors.productPrice).value = '';
        },
        clearWarnings: function () {
            const items = document.querySelectorAll(Selectors.productListItems)
            items.forEach(item => {
                if (item.classList.contains('bg-warning')) {
                    item.classList.remove('bg-warning')
                }
            });
        },
        hideCard: function () {
            document.querySelector(Selectors.productCard).style.display = 'none'
        },
        showTotal: function (total) {
            document.querySelector(Selectors.totalUSD).textContent = total;
            document.querySelector(Selectors.totalTL).textContent = parseFloat(total * (7.56)).toFixed(2)
        },
        addProductToForm: function () {
            const selectedProduct = ProductController.getCurrentProduct();
            document.querySelector(Selectors.productName).value = selectedProduct.name;
            document.querySelector(Selectors.productPrice).value = selectedProduct.price;

        },
        deleteProduct: function () {
            let items = document.querySelectorAll(Selectors.productListItems);
            items.forEach(element => {
                if (element.classList.contains('bg-warning')) {
                    element.remove();
                }
            });
        },
        addingState: function () {
            UIController.clearWarnings();
            UIController.clearInputs();
            document.querySelector(Selectors.addButton).style.display = 'inline';
            document.querySelector(Selectors.updateButton).style.display = 'none';
            document.querySelector(Selectors.deleteButton).style.display = 'none';
            document.querySelector(Selectors.cancelButton).style.display = 'none';
        },
        editState: function (tr) {
            tr.classList.add('bg-warning');
            document.querySelector(Selectors.addButton).style.display = 'none';
            document.querySelector(Selectors.updateButton).style.display = 'inline';
            document.querySelector(Selectors.deleteButton).style.display = 'inline';
            document.querySelector(Selectors.cancelButton).style.display = 'inline';

        }

    }

})()

// App Controller
const AppController = (function (ProductCtrl, UICtrl,StorageCtlr) {

    const UISelectors = UICtrl.getSelectors();

    // Load Event Listeners
    const loadEventListeners = function (e) {

        //add product event
        document.querySelector(UISelectors.addButton).addEventListener('click', ProductAddSubmit)

        // edit product
        document.querySelector(UISelectors.productList).addEventListener('click', productEditClick)

        // save changes
        document.querySelector(UISelectors.updateButton).addEventListener('click', editProductSubmit)

        // cancel button cick
        document.querySelector(UISelectors.cancelButton).addEventListener('click', cancelUpdate)

        // delete product
        document.querySelector(UISelectors.deleteButton).addEventListener('click', deleteProductSubmit)
    }

    // add product button clicked
    const ProductAddSubmit = function (e) {

        const productName = document.querySelector(UISelectors.productName).value;
        const productPrice = document.querySelector(UISelectors.productPrice).value

        if (productName !== '' && productPrice !== '' ) {
            // add product
            const newProduct = ProductController.addProduct(productName, productPrice)

            // add item to list
            UICtrl.addProduct(newProduct);

            // add product to LS
            StorageCtlr.storeProduct(newProduct)
            // get total
            const total = ProductCtrl.getTotal();

            // showTotal
            UICtrl.showTotal(total);

            // clear inputs
            UICtrl.clearInputs();
        } else {

        }

        e.preventDefault();
    }

    const productEditClick = function (e) {

        if (e.target.classList.contains('edit-product')) {
            const id = (e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.textContent) - 1

            // get selected product
            const product = ProductCtrl.getProductById(id)

            // set current product
            ProductCtrl.setCurrentProduct(product);

            UICtrl.clearWarnings();

            // add product to UI
            UICtrl.addProductToForm();

            UICtrl.editState(e.target.parentNode.parentNode);
        }
        e.preventDefault();
    }
    const editProductSubmit = function (e) {
        const productName = document.querySelector(UISelectors.productName).value;
        const productPrice = document.querySelector(UISelectors.productPrice).value;
        if (productName !== '' && productPrice !== '') {
            // update product
            const updatedProduct = ProductCtrl.updateProduct(productName, productPrice)

            // update UI
            let item = UICtrl.updateProduct(updatedProduct);
            // get total
            const total = ProductCtrl.getTotal();
            // showTotal
            UICtrl.showTotal(total);

            // update LS
            StorageCtlr.updateProduct(updatedProduct)
            UICtrl.addingState()

        }



        e.preventDefault();
    }

    const cancelUpdate = function (e) {
        UICtrl.addingState()
        UICtrl.clearWarnings();
        e.preventDefault();
    }

    const deleteProductSubmit = function (e) {

        // get selected product
        const selectedProduct = ProductCtrl.getCurrentProduct();

        // delete product
        ProductCtrl.deleteProduct(selectedProduct)

        // delete product from ui
        UICtrl.deleteProduct()
        // get total
        const total = ProductCtrl.getTotal();
        // showTotal
        UICtrl.showTotal(total);

        // delete from LS
        StorageCtlr.deleteProduct(selectedProduct.id)

        UICtrl.addingState()

        if (total == 0) {
            UICtrl.hideCard();
        }

        e.preventDefault();
    }

    return {
        init: function () {
            UICtrl.addingState();
            const products = ProductCtrl.getProducts()
            
            if (products.length == 0) {
                UICtrl.hideCard()
            } else {
                UICtrl.createProductList(products)
            }
            // get total
            const total = ProductCtrl.getTotal();

            // showTotal
            UICtrl.showTotal(total);


            // load event listeners
            loadEventListeners();


        }
    }

})(ProductController, UIController,storageController)

AppController.init()