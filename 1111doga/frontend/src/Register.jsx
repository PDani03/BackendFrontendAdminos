import { Form, Button } from "react-bootstrap"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const navigate = useNavigate()

    async function register(params) {
        params.preventDefault()
        try {
            const response = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, phone_number:phone })
            })
            const data = await response.json()

            if (response.ok) {
                navigate("/login")

                setName("")
                setEmail("")
                setPassword("")
                setPhone("")
            } else { alert(data.message) }
        } catch (error) {
            alert("szerverhiba")
        }
    }

    return (
        <>
            <h2>Regisztráció</h2>
            <Form onSubmit={register}>
                <Form.Group className="mb-3">
                    <Form.Label>Név</Form.Label>
                    <Form.Control type="text" placeholder="Gipsz Jakab" value={name} onChange={(e)=>setName(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email cím</Form.Label>
                    <Form.Control type="email" placeholder="gypsy@gmail.com" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Jelszó</Form.Label>
                    <Form.Control type="password" placeholder="Jelszó" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Telefonszám</Form.Label>
                    <Form.Control type="text" placeholder="06708429583" value={phone} onChange={(e)=>setPhone(e.target.value)} required/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Regisztráció
                </Button>
            </Form>
        </>
    )
}