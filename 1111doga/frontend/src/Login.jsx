import { Form, Button } from "react-bootstrap"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login({setUserLogin}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function login(params) {
        params.preventDefault()
        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })
            const data = await response.json()

            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(data.user))
                localStorage.setItem("token", data.token)
                setUserLogin(data.user)
                navigate("/")

                setEmail("")
                setPassword("")
            } else { alert(data.message) }
        } catch (error) {
            alert("szerverhiba")
        }
    }

    return (
        <>
            <h2>Bejelentkezés</h2>
            <Form onSubmit={login}>

                <Form.Group className="mb-3">
                    <Form.Label>Email cím</Form.Label>
                    <Form.Control type="email" placeholder="gypsy@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Jelszó</Form.Label>
                    <Form.Control type="password" placeholder="Jelszó" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Bejelentkezés
                </Button>
            </Form>
        </>
    )
}