import { Form, Button } from "react-bootstrap"
import { useState } from "react"

export default function ProductUpload() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")

    async function upload(params) {
        params.preventDefault()
        try {
            const response = await fetch("http://localhost:3000/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, description, price })
            })
            const data = await response.json()

            if (response.ok) {
                setName("")
                setDescription("")
                setPrice("")
                alert(data.message)
            } else { alert(data.message) }
        } catch (error) {
            alert("szerverhiba")
        }
    }

    return (
        <>
            <h2>Termék feltöltése</h2>
            <Form onSubmit={upload}>
                <Form.Group className="mb-3">
                    <Form.Label>Név</Form.Label>
                    <Form.Control type="text" placeholder="Labda" value={name} onChange={(e) => setName(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Leírás</Form.Label>
                    <Form.Control type="text" placeholder="Nagyon jó" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Ár</Form.Label>
                    <Form.Control type="number" placeholder="2100" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Feltöltés
                </Button>
            </Form>
        </>
    )
}