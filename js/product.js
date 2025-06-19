import { products } from './data.js';
import { addToCart } from './storage.js';

const container = document.getElementById('product-detail');

const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get('id'));
const product = products.find(p => p.id === id);

if (!product) {
  container.innerHTML = `<p>Product not found. <a href="index.html">Back to shop</a></p>`;
} else {
  container.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <h2>${product.name}</h2>
    <p>${product.description}</p>
    <p><strong>Rs. ${product.price}</strong></p>
    <button id="addBtn">Add to Cart</button>
  `;

  document.getElementById('addBtn').addEventListener('click', () => {
    addToCart(product.id);
    alert('Item added!');
  });
}
