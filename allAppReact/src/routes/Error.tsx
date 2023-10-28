import { Link } from 'react-router-dom'
import '../App.scss'
import '../styles/Error.scss'
import { Row, Container } from 'react-bootstrap'


function Error() {
    return (
        <div className='main'>
            <Container className='center'>
                <Row>
                    <h1>404: Not Found :(</h1>
                    <h1>Go to <Link to='/'> home</Link> page</h1>
                </Row>
            </Container>
        </div>
    )
}

export default Error
