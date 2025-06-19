import { updateCartNo } from "./cart-icon.js";
import { getCart, removeFromCart, updateCartQuantity } from "./cartUtilities.js";
import { capitalize } from "./utilities.js";

const CartItemsDisplay = document.getElementById("CartItemsDisplay");

let CartItems = await getCart();

updateCartNo()

function updateCartSummary(cartItems) {
  const cartList = document.getElementById("CartItemsList");
  const orderSubtotal = document.getElementById("OrderSubtotal");
  const summaryContainer = document.getElementById("CartSummaryContainer");

  if (!cartItems.length) {
    summaryContainer.classList.add("d-none");
    return;
  }

  summaryContainer.classList.remove("d-none");

  // Render each product with total price
  cartList.innerHTML = cartItems
    .map(
      (item) => `
    <li class="d-flex justify-content-between">
      <span>${item.title} × ${item.quantity}</span>
      <span>Rs ${item.totalPrice}</span>
    </li>
  `
    )
    .join("");

  const total = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  orderSubtotal.textContent = `Rs ${total}`;
}

function renderCart() {
  if (CartItems.length === 0) {
    CartItemsDisplay.innerHTML = `
      <tr>
        <td colspan="5" class="text-center py-5">
          <div class="text-muted">
            <i class="bi bi-cart-x fs-1"></i>
            <h5 class="mt-3">Your cart is empty</h5>
            <p>Add some items to get started!</p>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  // If cart has items, render them
  CartItemsDisplay.innerHTML = CartItems.map((CartItem) => {
    return `<tr>
                <td>
                  <div class="d-flex align-items-center">
                    <img
                      src="${CartItem.image}"
                      class="rounded me-3"
                      alt="${CartItem.title}"
                      style="width: 60px; height: 60px; object-fit: cover"
                    />
                    <div>
                      <h6 class="mb-0">${CartItem.title}</h6>
                      <small class="text-muted">Per ${capitalize(
                        CartItem.price.split("/")[1]
                      )}</small>
                    </div>
                  </div>
                </td>
                <td class="text-center">${CartItem.price.split("/")[0]}</td>
                <td class="text-center">
                  <input
                    type="number"
                    class="form-control text-center"
                    value="${CartItem.quantity}"
                    min="1"
                    style="width: 80px"
                    data-cart-quantity
                    data-product-id=${CartItem.id}
                  />
                </td>
                <td class="text-center">Rs ${CartItem.totalPrice}</td>
                <td class="text-end">
                  <button data-cart-delete data-product-id="${
                    CartItem.id
                  }" class="btn btn-sm btn-outline-danger">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>`;
  }).join("");

  attachQuantityChangeListeners();
  attachDeleteListeners();
  updateCartSummary(CartItems); // Reattach event listeners to new buttons
}

function attachDeleteListeners() {
  const deleteButtons = document.querySelectorAll("[data-cart-delete]");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const productId = btn.getAttribute("data-product-id");
      removeFromCart(productId); // 🗑️ remove from localStorage
      CartItems = await getCart(); // 🔄 Refresh cart data
      renderCart(); // 🔁 Re-render
    });
  });
}

function attachQuantityChangeListeners() {
  const quantityInputs = document.querySelectorAll("[data-cart-quantity]");

  quantityInputs.forEach(input => {
    input.addEventListener("change", async (e) => {
      const newQuantity = parseInt(e.target.value, 10);
      const productId = e.target.dataset.productId;

      if (newQuantity >= 1) {
        updateCartQuantity(productId, newQuantity);

        // re-fetch cart to update totalPrice fields
        CartItems = await getCart();
        renderCart(); // rerender cart with updated totals
      }
    });
  });
}

renderCart();