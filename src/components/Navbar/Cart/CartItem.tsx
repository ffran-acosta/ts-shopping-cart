import { useShoppingCart } from "@/context";
import { CartItem, StoreItemProps } from "@/models";
// import storeItems from "@/data/items.json";
import { testingService } from "@/services";
import { Button, Stack } from "react-bootstrap";
import { formatCurrency } from "@/utilities";
import { useEffect, useState } from "react";


export const ShowItem= ({id, quantity}: CartItem) => {

    const [products, setProducts] = useState<StoreItemProps[]>([])
    const fetchProducts = async () => {
        const { data } = await testingService()
        setProducts(data)
    }
    useEffect(() => {
        fetchProducts()
    }, [])

    const {removeFromCart} = useShoppingCart();
    const item = products.find(item => item.id === id)
    if (item == null) return null;
    return (
        <Stack direction="horizontal" gap={2}>
            <img 
                src={item.imgurl} 
                style={{width:'75px', height:'150px', 
                objectFit:'cover'}} />
            
            <div className="me-auto">
                <div style={{ fontSize: '1.3rem' }} >
                    {item.name} {quantity > 1 && <span style={{fontSize: '1rem'}} className="test-muted">x{quantity}</span>}
                </div>
                <div style={{ fontSize: '1rem' }} className="test-muted">
                    {formatCurrency(item.price)}
                </div>
            </div>
            <div style={{ fontSize: '1.7rem' }}>
                {formatCurrency(item.price * quantity)}
            </div>
            <Button
                variant="outline-danger"
                size="sm"
                onClick={() => removeFromCart(item.id)}>
                &times;
            </Button>
        </Stack>
    )
}
