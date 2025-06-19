const CART_KEY = 'cart';

export function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(productId) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.qty++;
  } else {
    cart.push({ id: productId, qty: 1 });
  }
  saveCart(cart);
}

export function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
}

export function updateQuantity(productId, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.qty = qty;
    saveCart(cart);
  }
}
