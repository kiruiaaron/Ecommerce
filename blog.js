async function fetchAllProducts() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Error fetching products:', error);
      return [];
    }
  }
  
  function generateProductHTML(product) {
    return `
      <div class="product text-center col-lg-3 col-md-4 col-12">
        <img class="img-fluid mb-3" src="${product.image}" alt="${product.title}">
        <div class="star">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
        <h5 class="p-name">${product.title}</h5>
        <h4 class="p-price">$${product.price.toFixed(2)}</h4>
        <button class="buy-btn">Buy Now</button>
      </div>
    `;
  }
  
  async function populateFeaturedProducts() {
    const productsContainer = document.querySelector('.allProducts');
    const products = await fetchAllProducts();
  
    let filteredProducts = products.slice(); // Create a copy of the products array for filtering
  
    function displayProducts() {
      const productsHTML = filteredProducts.map((product) => generateProductHTML(product));
      productsContainer.innerHTML = productsHTML.join('');
    }
  
    function sortProductsByPrice() {
      filteredProducts.sort((a, b) => a.price - b.price);
      displayProducts();
    }
  
    function filterProductsByCategory(category) {
      if (category === 'all') {
        filteredProducts = products.slice();
      } else {
        filteredProducts = products.filter((product) => product.category === category);
      }
      displayProducts();
    }
  
    // Initial display of products
    displayProducts();
  
    // Event listener for sorting products by price
    const sortButton = document.getElementById('sort-button');
    sortButton.addEventListener('click', sortProductsByPrice);
  
    // Event listeners for filtering products by category
    const categoryButtons = document.querySelectorAll('.category-button');
    categoryButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const selectedCategory = button.dataset.category;
        filterProductsByCategory(selectedCategory);
      });
    });
  }
  
  populateFeaturedProducts();
  