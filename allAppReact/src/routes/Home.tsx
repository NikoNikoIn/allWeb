import React from 'react'
import '../App.scss'
import '../styles/Home.scss'
import ThemeHook from '../hooks/ThemeHook'
import { Image, Col, Row, Container, ListGroup } from 'react-bootstrap'
import faceImage from '../assets/face.jpg'


function Home() {
    return (
        <div className='main'>
            <Container>
                <Row>
                    <Col xs={6} md={4}>
                        <Image className='img' src={faceImage} />
                    </Col>
                    <Col xs={6} md={8}>
                        <h1>About me :)</h1>
                        <h3>Some information:</h3>
                        <p>I am a junior student at the BSUIR, my specialty is digital marketing where our
                        curriculum is marketing developments and programming basics.I am a novice
                        full-stack developer with both hard skills (Django, React, REST, Git) and soft
                        skills, such as team work\flexibility\punctuality. Looking forward to grow and
                        be benefitial to my employer.</p>
                        <p>I am a junior student at the BSUIR, my specialty is digital marketing where our
                        curriculum is marketing developments and programming basics.I am a novice
                        full-stack developer with both hard skills (Django, React, REST, Git) and soft
                        skills, such as team work\flexibility\punctuality. Looking forward to grow and
                        be benefitial to my employer.</p>
                        <h3>My Stack of Technologies:</h3>
                        <ListGroup className='list-group-color'>
                            <ListGroup.Item>
                                React + TypeScript
                            </ListGroup.Item>
                            <ListGroup.Item>
                                HTML + SCSS
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Django
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Django
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Django
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home
