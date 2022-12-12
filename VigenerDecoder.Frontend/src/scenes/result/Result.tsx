import React from 'react'
import { Container } from 'react-bootstrap'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'


export const Result = () => {


    return(
        <Container fluid="sm">
            <Row className='d-flex justify-content-center align-items-center vh-100'>
                <Col md="6">
                    <h2>Výsledek analýzy</h2>
                    <hr />
                    
                </Col>
            </Row>
        </Container>
    )
}