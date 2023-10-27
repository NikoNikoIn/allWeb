import React from 'react'
import '../App.scss'
import '../styles/Home.scss'
import { Image, Col, Row, Container, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import faceImage from '../assets/face.jpg'
import webPage from '../assets/nutrination.png'

import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import Items from '../components/Items'
const { items, stackItems, socialItems } = Items


const StackItems = (
    stackItems.map(item => (
        <ListGroup.Item key={item.text}>
            <FontAwesomeIcon icon={item.icon as IconProp} className='list-item-icon'/> 
            <span className='list-item-text'> {item.text}</span>
        </ListGroup.Item>
    ))
)


const WebItems = (
    <Row className="justify-content-md-center" style={{marginBottom:'25px'}}>
        {items.map((item, index) => (
            item.text !== 'Home' ? 
            <Col xs={6} md={2} key={item.to} className="d-flex justify-content-center">
                <Link className='web-icon' to={item.to}>
                <FontAwesomeIcon icon={item.icon as IconProp} /> 
                </Link>
            </Col>
            : null
        ))}
    </Row>
)
  


const SocialItems = (
    <div className='d-flex flex-row'>
        {socialItems.map(item => (
            <a 
            href={item.to} 
            target='_blank' 
            rel='noopener noreferrer'
            style={{ color: item.color }}>
                <FontAwesomeIcon className='social-icon' icon={item.icon as IconProp} /> 
            </a>

        ))}
    </div>
)


function Home() {
    return (
        <div className='main'>
            <Container>
                <Row>
                    <Col style={{marginTop:'25px'}} xs={12} md={4}>
                        <Image className='img' roundedCircle src={faceImage} />
                    </Col>
                    <Col className='col-wrap' style={{marginTop:'25px'}} xs={12} md={8}>
                        <h1>About me :)</h1>
                        <h3>Some information:</h3>
                        <p>I am a junior student at the BSUIR, my specialty is digital marketing where our
                        curriculum is marketing developments and programming basics.I am a novice
                        full-stack developer with both hard skills (Django, React, REST, Git) and soft
                        skills, such as team work\flexibility\punctuality. Looking forward to grow and
                        be benefitial to my employer.</p>
                        <p>Also I have a portfolio on 3D-modeling. My program of choice is Blender.
                            As other hobbies I pursue development of Telegram Bots on Java and
                            video editin in DaVinci Resolve.
                        </p>
                        <h3>My Stack of Technologies:</h3>
                        <div>
                            <ListGroup className='list-stack' horizontal>
                                {StackItems}
                            </ListGroup>
                        </div>
                        <h3 style={{marginTop:'25px'}}>My Socials:</h3>
                        {SocialItems}
                        <div style={{marginBottom:'25px'}}></div>
                    </Col>
                </Row>
                <Row>
                    <Col className='col-wrap' style={{marginTop:'25px'}}>
                        <h1>About this project</h1>
                        <h3><span style={{color: 'var(--accentColor)'}}>What</span> is it?</h3>
                        <p>This is a React web application created with Vite, TS and SASS using Bootstrap. It's basically an all need daily
                            application. It contains the weather, clock, todo and etc. apps for the convenience of the user.
                        </p>
                        <h3><span style={{color: 'var(--accentColor)'}}>Why</span> is it?</h3>
                        <p>It is basically my side project in front-end development to understand more gimmicks of React and styling. This is
                            just my playground where, if I'm not lazy, I add new functions and learn more about developing and practice my fancy
                            shmancy skills.
                        </p>
                        <h3><span style={{color: 'var(--accentColor)'}}>How</span> is it?</h3>
                        <p>AllReact is being developed using TypeScript components and traversing using the react-router BrowserRouter component. Also for the theme changing
                            the app uses a hook and stores it in localstorage. 
                        </p>
                        <div>
                            <h4 className='d-flex flex-row justify-content-center align-items-center'>So what are you waiting for? Visit them!</h4>
                            {WebItems}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    
                    </Col>
                </Row>
                <Row>
                    <Col className='col-wrap' style={{marginTop:'25px', marginBottom:'25px'}} xs={12} md={6}>
                        <h1>My Full-Stack project</h1>
                        <p>
                            My website is an online store selling sports nutrition supplements called 
                            <span style={{color: 'var(--accentColor)'}}> NutriNation</span>. I use 
                            <span style={{color: 'var(--accentColor)'}}> ReactJS, Bootstrap, Axios and Redux</span> for the frontend, 
                            <span style={{color: 'var(--accentColor)'}}> Django and Django REST Framework</span> for the backend, and 
                            <span style={{color: 'var(--accentColor)'}}> PostgreSQL</span> for the database, 
                            which is hosted on <span style={{color: 'var(--accentColor)'}}> neon.tech</span>. I also use 
                            <span style={{color: 'var(--accentColor)'}}> Firebase</span> to store images, 
                            JavaScript scripts and CSS styles. My website is hosted on 
                            <span style={{color: 'var(--accentColor)'}}> vercel.com</span> for fast and reliable content delivery.
                        </p>
                        <p>
                            I have registration and login functionality and a product list that supports filtering by 
                            <span style={{color: 'var(--accentColor)'}}> availability, creation date</span>. Top products component shows 
                            top products with high rating and availability. There is a search system by product name, 
                            categories and brands.
                        </p>
                        <p>
                            The product page displays basic information as well as the ability to add the product to the cart with the quantity. 
                            Users can leave and view reviews (one review per product per account) and view similar products 
                            (filtering by category). I also added the ability to 
                            <span style={{color: 'var(--accentColor)'}}> add discounts to products</span> through the admin panel.
                        </p>
                        <p>
                            <span style={{color: 'var(--accentColor)'}}>Shopping cart system</span> using localstorage, and I also provide the ability 
                            to specify shipping address (also stored in localstorage) and select payment method (<span style={{color: 'var(--accentColor)'}}>PayPal or cash</span>). At checkout, 
                            the user sees basic information and prices, including total cost, shipping, taxes and discounts through promo codes.
                        </p>
                        <p>
                            After creating an order, the user is redirected to a unique order page where they can make payment via a 
                            <span style={{color: 'var(--accentColor)'}}> PayPal Sandbox</span> account. In the navigation bar, there is a 
                            <span style={{color: 'var(--accentColor)'}}> Profile tab</span> where the user can view their information (change password/email/name, delete account, 
                            view their orders) or log out of the account. In the navigation bar there is also a 
                            <span style={{color: 'var(--accentColor)'}}> Categories tab</span>, which contains all the categories
                            of products (dynamically added: if you add a product with a new category, it is automatically added to this tab). There is also an 
                            <span style={{color: 'var(--accentColor)'}}> About us tab</span> with information about the company. 
                            In the footer of the page, there are links to the shopping cart, profile, and my GitHub.
                        </p>   
                        <p>
                            Admins have access to an additional <span style={{color: 'var(--accentColor)'}}> Admin tab</span> where they can manage users, products, orders, 
                            and promo codes. They can also change the details of products, users, and promo codes, as well as delete reviews and mark 
                            orders as shipped or paid. My Site is also optimized for <span style={{color: 'var(--accentColor)'}}> mobile devices</span>, ensuring it is usable on any device.   
                        </p>

                    </Col>
                    <Col style={{marginTop:'25px'}} xs={12} md={6}>
                        <h1>Visit the page</h1>
                        <a 
                            href='https://nutrination-ecomm.vercel.app/#/' 
                            target='_blank' 
                            rel='noopener noreferrer'>
                            <Image className='img-sticky' src={webPage}  />
                        </a>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}


export default Home
