import { StoreItemProps } from "@/models"
import { testingService } from "@/services"
import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
// import storeItems from "../../data/items.json"
import { StoreItem } from "./components"

const Store = () => {
    const [products, setProducts] = useState<StoreItemProps[]>([])
    const fetchProducts = async () => {
        const { data } = await testingService()
        setProducts(data)
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <>
            <Row xs={1} md={2} lg={3} className="g-3" >
                {products.map(item => (
                    <Col key={item.id}>
                        <StoreItem {...item}/>
                    </Col>
                ))}
            </Row>
        </>
    )
}
export default Store