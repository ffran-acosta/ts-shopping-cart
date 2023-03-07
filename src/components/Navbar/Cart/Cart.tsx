import { useShoppingCart } from "@/context"
import { formatCurrency } from "@/utilities"
import { Offcanvas, OffcanvasBody, OffcanvasTitle, Stack } from "react-bootstrap"
import { ShowItem } from "./CartItem"
import storeItems from "@/data/items.json";
import { StoreItemProps } from "@/models";
import { testingService } from "@/services";
import { useState, useEffect } from "react";

type ShoppingCartProps = {
    isOpen: boolean
}

export const Cart = ({isOpen}: ShoppingCartProps) => {

    const [products, setProducts] = useState<StoreItemProps[]>([])
    const fetchProducts = async () => {
        const { data } = await testingService()
        setProducts(data)
    }
    useEffect(() => {
        fetchProducts()
    }, [])

    const {closeCart, cartItems} = useShoppingCart()
    
    return (
        <Offcanvas        
            placement='end'
            onHide={closeCart}
            show={isOpen}
        >
            <Offcanvas.Header closeButton>
                <OffcanvasTitle>Cart</OffcanvasTitle>
            </Offcanvas.Header>
            <OffcanvasBody>
                <Stack gap={3}>
                    {cartItems.map(item =>(
                        <ShowItem key={item.id} {...item} />
                    ))}
                    <div style={{ fontSize: '2rem' }} className="ms-auto fw-bold">
                        Total{" "}
                        {formatCurrency(
                            cartItems.reduce((total, cartItem) => {
                                const item = products.find(i => i.id === cartItem.id)
                                return total + (item?.price || 0) * cartItem.quantity
                            }, 0)
                        )}
                    </div>
                </Stack>
            </OffcanvasBody>
        </Offcanvas>
    )
}