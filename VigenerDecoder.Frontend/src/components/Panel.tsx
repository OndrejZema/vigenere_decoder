import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

interface PanelProps {
    children: React.ReactNode
    loading?: boolean
}

export const Panel = (props: PanelProps) => {

    return (
        <Container fluid="sm">
            <Row className='d-flex justify-content-center align-items-center'>
                <Col md="6" className="vh-75 pt-3">
                    {props.loading ?
                        <div className='d-flex justify-content-center'>Loading...</div>
                        :
                        props.children}

                </Col>
            </Row>
        </Container>

    )
}