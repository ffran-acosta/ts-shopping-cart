export const testingService = async () => {
    const url = "https://react-shopping-cart-server.up.railway.app/api/railway/products"
    const res = await fetch(url)
    return res.json()
}
