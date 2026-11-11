import { useState, useEffect } from "react"
import { Card, Button, Row } from "react-bootstrap"

export default function Products({userParam}) {

    const [products, setProducts] = useState([])
    async function listProducts() {
        try {
            const response = await fetch("http://localhost:3000/api/products")
            const data = await response.json()
            setProducts(data.products)
        } catch (error) {
            alert("szerverhiba")
        }
    }
    useEffect(() => {
        listProducts()
    }, [])

    async function uploadOrder(product_id) {
        try {
            const response = await fetch("http://localhost:3000/api/ordersUpload", {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({product_id: product_id, user_id: userParam.id})
            })
            const data = await response.json()

            alert(data.message)
        } catch (error) {
            alert("szerverhiba")
        }
    }

    async function deleteOrder(product_id) {
        try {
            const response = await fetch("http://localhost:3000/api/products", {
                method:"DELETE",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({id: product_id})
            })
            const data = await response.json()

            alert(data.message)
            if (response.ok) listProducts()
        } catch (error) {
            alert("szerverhiba")
        }
    }

    return (
        <>
            <Row>
                {products.map((p) => {
                    return (
                    <Card style={{ width: '18rem' }} key={p.id}>
                        <Card.Body>
                            <Card.Title>{p.name}, {p.price}Ft</Card.Title>
                            <Card.Text>
                                {p.description}
                            </Card.Text>
                            {userParam.role===1 
                            ? <Button variant="primary" onClick={()=>deleteOrder(p.id)}>Törlés</Button>
                            : <Button variant="primary" onClick={()=>uploadOrder(p.id)}>Kosárba</Button>}
                        </Card.Body>
                    </Card>
                )})}
            </Row>
        </>
    )
}