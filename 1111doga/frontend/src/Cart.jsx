import { useState, useEffect } from "react"
import { Card, Button, Row } from "react-bootstrap"

export default function Cart({userParam}) {

    const [orders, setOrders] = useState([])
    async function listOrders() {
        try {
            const response = await fetch("http://localhost:3000/api/ordersList",{
                method:"POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: userParam.id })
            })
            const data = await response.json()
            setOrders(data.orders)
        } catch (error) {
            alert("szerverhiba")
        }
    }
    useEffect(() => {
        listOrders()
    }, [])

    return (
        <>
            <Row>
                {orders.map((p) => {
                    return (
                        <Card style={{ width: '18rem' }} key={p.product.id}>
                            <Card.Body>
                                <Card.Title>{p.count}db {p.product.name}, {p.product.price}Ft</Card.Title>
                                <Card.Text>
                                    {p.product.description}
                                </Card.Text>
                                {/*<Button variant="primary" onClick={() => deleteOrder(p.id)}>Törlés</Button>  todo */}
                            </Card.Body>
                        </Card>
                    )
                })}
            </Row>
        </>
    )
}