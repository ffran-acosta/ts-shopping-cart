import { useShoppingCart } from "@/context";
import { CartItem } from "@/models";
import storeItems from "@/data/items.json";
import { Button, Stack } from "react-bootstrap";
import { formatCurrency } from "@/utilities";


export const ShowItem= ({id, quantity}: CartItem) => {
    const {removeFromCart} = useShoppingCart();
    const item = storeItems.find(item => item.id === id)
    if (item == null) return null;
    return (
        <Stack direction="horizontal" gap={2}>
            <img 
                src={item.imgUrl} 
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