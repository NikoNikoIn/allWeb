
import React from 'react'
import '../App.scss'
import '../styles/ToDo.scss'
import { Row, Col, Container, Button } from 'react-bootstrap'


function ToDo() {
    return (
        <div className='main'>
            <Container>
                <Row>
                    <Col className='col-wrap d-flex flex-column justify-content-center align-items-center' style={{marginTop:'25px'}}>
                        <h1>The <span style={{color: 'var(--accentColor)'}}>Ultimate</span> To-Do List</h1>
                        <Row>
                            <Col>
                                <input className='input-style' placeholder='Enter Task name' />
                            </Col>
                            <Col style={{marginBottom:'25px'}}>
                                <Button className='button-style'>Add Task</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ToDo
