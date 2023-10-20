import React from 'react'
import '../App.scss'
import '../styles/ToDo.scss'
import { Row, Col, Container, Form } from 'react-bootstrap'


function ToDo() {
    return (
        <div className='main'>
            <Container>
                <Row>
                <Col className='d-flex flex-column justify-content-center align-items-center' style={{marginTop:'25px'}}>
                    <h1>The <span style={{color: 'var(--accentColor)'}}>Ultimate</span> To-Do List</h1>
                    <Form.Control className='input-style' placeholder='Enter Task name'/>
                </Col>

                </Row>
            </Container>
        </div>
    )
}

export default ToDo
