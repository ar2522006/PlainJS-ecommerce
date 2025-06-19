import { getBestSellerProducts, getProductsCategories } from "./api.js";
import { addToCart } from "./cartUtilities.js";

const productsDisplay = document.getElementById("ProductsDisplay");

const bestSellers = await getBestSellerProducts();

productsDisplay.innerHTML = bestSellers.map((bestSeller) => {
  return `<div class="col-6 col-md-4 col-lg-3">
            <div class="card h-100">
              <img
                src="${bestSeller.image}"
                class="card-img-top"
                alt="${bestSeller.title}"
              />
              <div class="card-body text-center">
                <a href="/product.html?productid=${bestSeller.id}" class="card-title">${bestSeller.title}</a>
                <p class="card-text">${bestSeller.price}</p>
                <button type="button" data-product-id=${bestSeller.id} href="#" class="btn btn-outline-primary">Add to Cart</button>
              </div>
            </div>
          </div>`;
}).join('');

const categoriesDisplay = document.getElementById("CategoriesDisplay");

const categories = await getProductsCategories();

categoriesDisplay.innerHTML = categories.map((category) => {
  return `<div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="card shadow-sm border-0 h-100">
              <img
                src=${category.image}
                class="card-img-top"
                alt="Vegetables"
              />
              <div class="card-body text-center">
                <a href="#" class="card-title mb-0">${category.title}</a>
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