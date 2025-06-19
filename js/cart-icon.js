import { getCartNo } from "./cartUtilities.js"

export function updateCartNo() {
    const cartNo = document.getElementById("CartNo")
    const NoOfItemsInCart = getCartNo()
    cartNo.innerHTML = NoOfItemsInCart
}