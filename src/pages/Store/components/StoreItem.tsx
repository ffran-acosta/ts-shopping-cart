
import { useShoppingCart } from "@/context"
import { StoreItemProps } from "@/models"
import { formatCurrency } from "@/utilities"
import { Button, Card } from "react-bootstrap"

export const StoreItem = ({ id, name, price, imgurl }: StoreItemProps) => {

    // FUNCTIONALITIES OF THE SHOPPING CART  
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()

    const quantity = getItemQuantity(id)
    return (
        <Card className="h-100">
            <Card.Img
                variant="top"
                src={imgurl}
                height="300px"
                style={{ objectFit: 'contain' }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-3">{name}</span>
                    <span className="fs-3 ms-2">{formatCurrency(price)}</span>
                </Card.Title>
                {/* NO ITEMS AT CART */}
                <div className="mt-auto">
                    {quantity === 0 ? (
                        <Button
                            className="w-100"
                            onClick={() => increaseCartQuantity(id)}
                        >
                            + Add To Cart
                        </Button>
                    // CART WITH ITEMS
                    ) : (<div
                        className="d-flex align-items-center flex-column"
                        style={{ gap: ".5rem" }}
                        >
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{ gap: ".5rem" }}
                        >
                            <Button
                                onClick={() => decreaseCartQuantity(id)}>
                                -
                            </Button>
                            <div>
                                <span className="fs-3"> {quantity} </span>
                            </div>
                            <Button
                                onClick={() => increaseCartQuantity(id)}> + </Button>
                            <Button
                                size="sm" variant="danger"
                                onClick={() => removeFromCart(id)}>
                                Remove
                            </Button>
                        </div>
                    </div>)}
                </div>
            </Card.Body>
        </Card>
    )
}