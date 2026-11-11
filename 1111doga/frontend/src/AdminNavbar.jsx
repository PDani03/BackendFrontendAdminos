import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';

export default function AdminNavbar({logoutParam}){
    return(
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">Főoldal</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/products">Termékek</Nav.Link>
                            <Nav.Link href="/productUpload">Termékek feltöltése</Nav.Link>
                            <Nav.Link href="/modifyUsers">Felhasználók adatai módosítása</Nav.Link>
                            <Button variant="secondary" onClick={logoutParam}>
                                Kijelentkezés
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}