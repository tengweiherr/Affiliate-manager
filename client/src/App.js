import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Navbar, Nav, Modal, Button } from 'react-bootstrap';
import './styles.scss';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Auth from './components/Auth/Auth';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Attachments from './pages/Attachments/Attachments';
import Information from './components/Information/Information';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const App = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const user = useSelector(state => state.auth)

    const parseJwt = (token) => {
        try {
          return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
          return null;
        }
      };

    return (
        <BrowserRouter>
        {user &&
        <>
            {parseJwt(user.token).exp * 1000 < Date.now() && 
                <Modal show={true}>
                <Modal.Header>
                <Modal.Title>Login expired</Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-2 pb-4 text-center'>
                    <Login/>
                </Modal.Body>
                </Modal>
            }    
        </>    
        }
          <Navbar collapseOnSelect expand="lg" variant="light" bg="light">
            <Container>
                <Row className='justify-content-between w-100' >
                    <Col className='d-flex align-items-center'>
                        <Navbar.Brand href="#">TFXI Calculator</Navbar.Brand>
                    </Col>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Col sm={3}>
                        <Navbar.Collapse className="me-auto justify-content-end">
                            {user && 
                            <>
                                <Nav.Link className="me-4" href="/calculator">Calculator</Nav.Link>
                                <Nav.Link className="me-4" href="/attachments">Attachments</Nav.Link>
                                <Nav.Link className="me-4" href="#" onClick={handleShow}>Information</Nav.Link>  
                            </>
                            }
                            <Login/>
                        </Navbar.Collapse>
                    </Col>
                </Row>
            </Container>
          </Navbar>
          <Container fluid className='p-4'>
                <Switch>
                    {user ? 
                    <>
                        <Route path="/" exact component={Home}/>
                        <Route path="/login" exact component={Auth}/>
                        <Route path="/calculator" exact component={Home}/>
                        <Route path="/attachments" exact component={Attachments}/>
                    </>
                    :
                    <>
                        <Route
                            exact
                            path="*"
                            render={() => (
                                <Redirect to="/login" /> 
                            )}
                        />
                        <Route path="/login" exact component={Auth}/>
                    </>                    
                    }

                </Switch>
          </Container>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
            <Modal.Title>Information</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-4'>
                <Information />
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
                </Modal.Footer>
            </Modal>

        </BrowserRouter>

    );
}
export default App;
