import { getallProducts } from "./api.js";
import { updateCartNo } from "./cart-icon.js";
import { showToast } from "./toast.js";

export function addToCart(productId) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if product already exists
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    // Increment quantity if found
    existingItem.quantity += 1;
  } else {
    // Add new product with quantity = 1
    cart.push({ id: productId, quantity: 1 });
}

  showToast("Item added to cart.");
  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartNo()
}

export async function getCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const products = await getallProducts();

  const enrichedCart = cart.map(cartItem => {
    const product = products.find(p => String(p.id) === String(cartItem.id));
    if (!product) return null;

    // Extract numeric price from "Rs 100/kg"
    const priceMatch = product.price.match(/\d+/);
    const unitPrice = priceMatch ? parseInt(priceMatch[0], 10) : 0;

    return {
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price, // original string (e.g., Rs 100/kg)
      quantity: cartItem.quantity,
      unitPrice: unitPrice, // numeric Rs value
      totalPrice: unitPrice * cartItem.quantity // calculated total
    };
  }).filter(Boolean); // remove nulls if any product is missing

  return enrichedCart;
}

export function removeFromCart(productId) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Ensure both values are compared as strings for safety
  const updatedCart = cart.filter(item => String(item.id) !== String(productId));

  localStorage.setItem("cart", JSON.stringify(updatedCart));

  // Optional: Show a toast notification
  showToast("Item removed from cart.");
  updateCartNo()
}

// cartUtilities.js

export function updateCartQuantity(productId, newQuantity) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = newQuantity;
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

export function getCartNo() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.reduce((total, item) => total + item.quantity, 0);
}