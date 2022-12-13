// import { fa } from '@fortawesome/free-regular-svg-icons'
import { faGears } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export const Navigation = () => {

    return (
        <Navbar bg="dark">
            <Container>
                <Navbar.Brand className='text-white'>
                    <Nav.Link as={Link} to="/">
                        <FontAwesomeIcon icon={faGears} className="me-1" />
                        Vigenerův dešifrátor
                    </Nav.Link>
                </Navbar.Brand>
            </Container>

        </Navbar>
    )
}