
const products_container = document.getElementById("allProducts");

const cart =document.getElementById('count')
const cart_items =[];



function onLoadCartNumbers(){
    let productNumbers =localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.nav-item span').textContent=productNumbers;
    }
}

function cartProducts(product){
    let productNumbers =localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);
    if(productNumbers){
        localStorage.setItem('cartNumbers',productNumbers + 1);
        document.querySelector('.nav-item span').textContent=productNumbers + 1;
    }else{
        localStorage.setItem('cartNumbers',1)
        document.querySelector('.nav-item span').textContent=1;
    }
    updateCartItems(product);
    totalCost(product);
}

const updateCartItems =(product)=>{
    let index_of_Item=cart_items.findIndex(cart_item=>cart_item.id===product.id);

    if(index_of_Item>=0){
        cart_items[index_of_Item].quantity +=1;
    }else{
        let new_product ={...product};
        new_product.quantity =1;
        cart_items.push(new_product);
        console.log("first")
    }

    localStorage.setItem("cart_items",JSON.stringify(cart_items))
    

    

}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    

    if(cartCost != null){
        let total = Number(cartCost) + Number(product.price);

        localStorage.setItem("totalCost",total);
    }else{
        localStorage.setItem("totalCost",product.price);
    }
  
}

function displayCart(){
  let cartItems = localStorage.getItem("cart_items");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".cartProducts");
  let cartCost = localStorage.getItem('totalCost');

  if(cartItems && productContainer){
      productContainer.innerHTML = '';
      Object.values(cartItems).map(item =>{
        productContainer.innerHTML += `
          <tr>
            <td >
                <img src="${item.image}" class="image" alt="">
            <td>
                <h5>${item.title}</h5>
            </td>
            <td>
               <h5>${item.category}</h5>
            </td>
            <td>
               <h5>${item.price}</h5>
            </td>
            <td>
              <h5>${item.quantity}</h5>
            </td>
            <td>
              <h5>${item.price * item.quantity}</h5>
            </td>
            <td>
              <button type="button" class="delete-entry" onclick = "deleteCartProduct">&#10005;</button>
          </td>
          <td>
          ${cartCost}
          </td>
        
        
        `
      });

  }
}

function deleteCartProduct(){
    const row = this.root.querySelector(".entries tr:last-of-type");
    row.querySelector(".delete-entry").addEventListener("click",e=>{
        this.onDeleteEntryBtnClick(e);
    });
}

function onDeleteEntryBtnClick(e){
    e.target.closest("tr").remove();
    localStorage.clear(e);

}

// let local=localStorage.getItem("cart_items")
// const cart_items= local?JSON.parse(local):[];




// function updateCartCounter(){
//     return cart.innerText = cart_items.length;
// }

// updateCartCounter();



function createProductCard(product){
    const img = document.createElement("img");
    img.classList.add("img-fluid","mb-3")
            img.setAttribute("src", product.image)
   const star = document.createElement("div")
   star.classList.add('star')
         star.innerHTML = ` 
         <i class="fas fa-star"></i>
         <i class="fas fa-star"></i>
         <i class="fas fa-star"></i>
         <i class="fas fa-star"></i>
         <i class="fas fa-star"></i>
        
       `;

    
       const title_product = document.createElement("h5");
       title_product.classList.add('p-name');
       title_product.innerText = product.title;

    const category = document.createElement("h5");
    category.classList.add('p-category');
        category.innerText = product.category;

    const price = document.createElement("h4");
    price.classList.add('p-price')
        price.innerHTML = `Price: <span>$${product.price}</span>`;

    const addtocart = document.createElement('button');
    addtocart.classList.add("buy-btn","add-to-cart");
    addtocart.innerHTML = "Add to Cart"
    addtocart.addEventListener("click",()=>cartProducts(product))


    const product_card = document.createElement("div");
        product_card.classList.add("product","text-center","col-lg-3", "col-md-4","col-12");

        product_card.append(img,star, title_product, category, price,addtocart);

        return product_card;

}

const base_url = "https://fakestoreapi.com/products"

async function getAllProducts (){
    try {
        let result = await fetch(base_url)
        let products = await result.json()
        return products;
    } catch (error) {
        console.log(error);
    }
}



async function mountProducts(){
    let products = await getAllProducts()
    if (products && products.length> 0) {
        let product_cards= products.map(product=>createProductCard(product))
        products_container.append(...product_cards)
    }else{
        const errorElement = document.createElement("h4")
        errorElement.innerText = "Something went wrong with the products";
        errorElement.style.color = "red"
        products_container.appendChild(errorElement)
    }

    
}

mountProducts()


const clothes_container = document.getElementById("products");



function createClothesProductCard(product){
    const img = document.createElement("img");
    img.classList.add("img-fluid","mb-3")
            img.setAttribute("src", product.image)
   const star = document.createElement("div")
   star.classList.add('star')
         star.innerHTML = ` 
         <i class="fas fa-star"></i>
         <i class="fas fa-star"></i>
         <i class="fas fa-star"></i>
         <i class="fas fa-star"></i>
         <i class="fas fa-star"></i>
        
       `;

    
       const title_product = document.createElement("h5");
       title_product.classList.add('p-name');
       title_product.innerText = product.title;

    const category = document.createElement("h5");
    category.classList.add('p-category');
        category.innerText = product.category;

    const price = document.createElement("h4");
    price.classList.add('p-price')
        price.innerHTML = `Price: <span>$${product.price}</span>`;

    const addtocart = document.createElement('button');
    addtocart.classList.add("buy-btn","add-to-cart");
    addtocart.innerHTML = "Add to Cart"
    addtocart.addEventListener("click",()=>cartProducts(product))


    const product_card = document.createElement("div");
        product_card.classList.add("product","text-center","col-lg-3", "col-md-4","col-12");

        product_card.append(img,star, title_product, category, price,addtocart);

        return product_card;

}

const clothesurl = "https://fakestoreapi.com/products?limit=4"

async function getAllclothesProducts (){
    try {
        let result = await fetch(clothesurl)
        let products = await result.json()
        return products;
    } catch (error) {
        console.log(error);
    }
}



async function mountclothesProducts(){
    let products = await getAllclothesProducts()
    if (products && products.length> 0) {
        let product_cards= products.map(product=>createClothesProductCard(product))
        clothes_container.append(...product_cards)
    }else{
        const errorElement = document.createElement("h4")
        errorElement.innerText = "Something went wrong with the products";
        errorElement.style.color = "red"
        clothes_container.appendChild(errorElement)
    }

    
}

mountclothesProducts()




const jewelery_container = document.getElementById("jewelery");



function createJeweleryProductCard(product){
    const img = document.createElement("img");
    img.classList.add("img-fluid","mb-3")
            img.setAttribute("src", product.image)
   const star = document.createElement("div")
   star.classList.add('star')
         star.innerHTML = ` 
         <i class="fas fa-star"></i>
         <i class="fas fa-star"></i>
         <i class="fas fa-star"></i>
         <i class="fas fa-star"></i>
         <i class="fas fa-star"></i>
        
       `;

    
       const title_product = document.createElement("h5");
       title_product.classList.add('p-name');
       title_product.innerText = product.title;

    const category = document.createElement("h5");
    category.classList.add('p-category');
        category.innerText = product.category;

    const price = document.createElement("h4");
    price.classList.add('p-price')
        price.innerHTML = `Price: <span>$${product.price}</span>`;

    const addtocart = document.createElement('button');
    addtocart.classList.add("buy-btn","add-to-cart");
    addtocart.innerHTML = "Add to Cart"
    addtocart.addEventListener("click",()=>cartProducts(product))


    const product_card = document.createElement("div");
        product_card.classList.add("product","text-center","col-lg-3", "col-md-4","col-12");

        product_card.append(img,star, title_product, category, price,addtocart);

        return product_card;

}

const jewelerysurl = "https://fakestoreapi.com/products/category/jewelery"

async function getJeweleryProducts (){
    try {
        let result = await fetch(jewelerysurl)
        let products = await result.json()
        return products;
    } catch (error) {
        console.log(error);
    }
}



async function mountJeweleryProducts(){
    let products = await getJeweleryProducts()
    if (products && products.length> 0) {
        let product_cards= products.map(product=>createJeweleryProductCard(product))
        jewelery_container.append(...product_cards)
    }else{
        const errorElement = document.createElement("h4")
        errorElement.innerText = "Something went wrong with the products";
        errorElement.style.color = "red"
        jewelery_container.appendChild(errorElement)
    }

    
}

mountJeweleryProducts()


// function cartProducts(product){
//     updateCart(product)
// }
//export {updateCart,updateCartCounter}
//calling content of the cart
onLoadCartNumbers();
displayCart();



