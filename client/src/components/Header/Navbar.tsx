import React, { Dispatch, SetStateAction, useState } from "react";
import { Container, Row, Col, Navbar, Nav, Modal, Button, NavDropdown } from 'react-bootstrap';
import Login from "../LoginButton/LoginButton";
import Information from "../Information/Information";
import { UserIDToken } from "../../types";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

type Props = {
    user:UserIDToken|null,
    fund:string,
    setFund:Dispatch<SetStateAction<string>>,
    currentTab:string,
    setCurrentTab:Dispatch<SetStateAction<string>>,
}

const NavBar = ({user,fund,setFund,currentTab,setCurrentTab}:Props) => {

    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const onNavDropdownSelect = (e:string|null) => {
        if(e){
          setFund(e);
          navigate(e);
        }
      }

    const onCurrentTabSelect = (tab:string,fund:string) => {
      setCurrentTab(tab);
      navigate(`${fund}/${tab}`)
    }

  return(
    <>
    <Navbar collapseOnSelect expand="lg" variant="light" bg="light">
        <Container>
            <Row className='justify-content-between w-100' >
                <Col className='d-flex align-items-center'>
                    <Navbar.Brand>TFXI Referral Manager</Navbar.Brand>
                </Col>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Col sm={3}>
                    <Navbar.Collapse className="me-auto justify-content-end">
                        {user && 
                        <>
                            <Nav.Link className="me-4" onClick={()=>onCurrentTabSelect("calculator",fund)}>Calculator</Nav.Link>
                            <Nav.Link className="me-4" onClick={()=>onCurrentTabSelect("attachments",fund)}>Attachments</Nav.Link>
                            <Nav.Link className="me-4" onClick={()=>setShow(true)}>Information</Nav.Link>  
                            <NavDropdown className="me-4" title={fund} id="fund-dropdown" onSelect={onNavDropdownSelect}>
                                <NavDropdown.Item eventKey="GMC">
                                    GMC
                                </NavDropdown.Item>
                                <NavDropdown.Item eventKey="Takami">
                                    Takami
                                </NavDropdown.Item>
                            </NavDropdown>
                        </>
                        }
                        <Login/>
                    </Navbar.Collapse>
                </Col>
            </Row>
        </Container>
  </Navbar>
            <Modal show={show} onHide={()=>setShow(false)}>
            <Modal.Header>
            <Modal.Title>Information</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-4'>
                <Information />
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>setShow(false)}>
                Close
            </Button>
                </Modal.Footer>
            </Modal>
  </>

  )
}

export default NavBar;