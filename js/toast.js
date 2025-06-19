// toast.js

// Toast Container HTML as a DOM element
const toastContainerHTML = `
  <div id="cartToastContainer" class="position-fixed bottom-0 end-0 p-3" style="z-index: 9999">
    <div
      id="cartToast"
      class="toast align-items-center text-white bg-primary border-0"
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      data-bs-delay="3000"
      data-bs-autohide="true"
    >
      <div class="d-flex">
        <div class="toast-body text-dark" id="toastMessage">
          <!-- message inserted by JS -->
        </div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
`;

// Only add toast container once
if (!document.getElementById('cartToastContainer')) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = toastContainerHTML;
  document.body.appendChild(wrapper.firstElementChild);
}

// Toast display function
export function showToast(message) {
  const toastEl = document.getElementById('cartToast');
  const toastMessage = document.getElementById('toastMessage');

  if (!toastEl || !toastMessage) return;

  toastMessage.textContent = message;

  const toast = bootstrap.Toast.getOrCreateInstance(toastEl);
  toast.show();
}
