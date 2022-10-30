import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Navbar, Nav, Modal, Button } from 'react-bootstrap';
import './styles.scss';
import Login from './components/LoginButton';
import Auth from './pages/Auth/Auth';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom"
import Attachments from './pages/Attachments/Attachments';
import Information from './components/Information';
// import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavBar from './components/Navbar';
import Calculator from './pages/Calculator/Calculator';
import { useAppSelector } from './store/hooks';

const parseJwt = (token:string) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

const App = () => {

    const user = useAppSelector(state => state.auth);
    const [fund, setFund] = useState("GMC")
    const [currentTab, setCurrentTab] = useState("calculator")
    
    return (
        <>
            {(user && parseJwt(user.token).exp * 1000 < Date.now()) && 
                <Modal show={true}>
                <Modal.Header>
                <Modal.Title>Login expired</Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-2 pb-4 text-center'>
                    <Login/>
                </Modal.Body>
                </Modal>
            }            
          <NavBar user={user} fund={fund} setFund={setFund} currentTab={currentTab} setCurrentTab={setCurrentTab}/>
          <Container fluid className='p-4'>
                <Routes>
                    {user ? 
                    <>
                    <Route path="/" element={<Navigate to={`${fund}/${currentTab}`} replace/>}/>
                    <Route path="login" element={<Auth/>}/>
                    <Route path=":fund" element={<Navigate to={`/${fund}/${currentTab}`} replace/>}/>
                    <Route path=":fund">
                        <Route path="calculator" element={<Calculator/>}/>
                        <Route path="attachments" element={<Attachments/>}/>
                    </Route>
                    <Route path="*" element={<Navigate to={`/${fund}/${currentTab}`} replace/>}/>
                    </>
                    :
                    <>
                        <Route
                            path="*"
                            element={<Navigate to="/login" replace/>}
                        />
                        <Route path="/login" element={<Auth/>}/>
                    </>                    
                    }

                </Routes>
          </Container>

        </>

    );
}
export default App;