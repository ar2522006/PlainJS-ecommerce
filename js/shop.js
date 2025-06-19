import { getallProducts } from "./api.js";
import { addToCart } from "./cartUtilities.js";

const productsDisplay = document.getElementById("ProductsDisplay");

const allProducts = await getallProducts();

productsDisplay.innerHTML = allProducts.map((product) => {
  return `<div class="col-6 col-md-4 col-lg-3">
            <div class="card h-100">
              <img
                src="${product.image}"
                class="card-img-top"
                alt="${product.title}"
              />
              <div class="card-body text-center">
                <a href="/product.html?productid=${product.id}" class="card-title">${product.title}</a>
                <p class="card-text">${product.price}</p>
                <button type="button" data-product-id=${product.id} href="#" class="btn btn-outline-primary">Add to Cart</button>
              </div>
            </div>
          </div>`;
}).join('');

document.querySelectorAll('[data-product-id]').forEach(button => {
  button.addEventListener('click', (event) => {
    const id = event.currentTarget.dataset.productId;
    addToCart(id)
  });
});