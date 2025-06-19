export async function getBestSellerProducts() {
    const products = await fetch("../assets/data/products.json")
    const parsedProducts = await products.json()
    return parsedProducts.slice(0, 4)
}
export async function getallProducts() {
    const products = await fetch("../assets/data/products.json")
    const parsedProducts = await products.json()
    return parsedProducts
}
export async function getProductsCategories() {
    const categories = await fetch("../assets/data/categories.json")
    const parsedCategories = await categories.json()
    return parsedCategories
}
