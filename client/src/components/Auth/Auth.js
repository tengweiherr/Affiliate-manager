import { Container, FormControl, FormLabel, Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import React, { useState } from 'react';
// import { login } from '../../actions/login';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Auth.scss';
import * as authSlice from '../../store/slices/authSlice';
import { login } from '../../api';


const Auth = () => {

    //useDispatch to set an action
    const dispatch = useDispatch();
    const history = useHistory();

    const [loginData, setLoginData] = useState({id: '', password: ''});

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault(); //so that browser dont refresh
        login(loginData)
        .then(result =>{
            if(result){
                dispatch(authSlice.login(result));
                history.push('/');
            }
        })
        .catch(err=>{
            console.log(err.message);
        })
        // dispatch(login(loginData,history));

    }

    const handleChange = (e) => {
        e.preventDefault(); //so that browser dont refresh
        setLoginData({...loginData,[e.target.name]:e.target.value});
    }

    // const handleShowPassword = () => {
    //     setShowPassword((prevShowPassword) => !prevShowPassword)
    // }

    return (
        <Container className="loginScreen">
            <Form className="authform" onSubmit={handleSubmit}>
                <Container className="authformContainer">
                    <Row className="inputRow">
                        <FormControl name="id" size="md" placeholder="User ID" value={loginData.id} onChange={(e) => setLoginData({...loginData,id: e.target.value})}></FormControl>
                    </Row>
                    <Row className="inputRow">
                        <InputGroup>
                            <FormControl name="password" size="md" placeholder="Password" type={showPassword ? "text" : "password"} value={loginData.password} onChange={(e) => setLoginData({...loginData,password: e.target.value})}></FormControl>
                            <Button onClick={()=>setShowPassword((prevShowPassword) => !prevShowPassword)}>{showPassword ? "Hide" : "Show"}</Button>
                        </InputGroup>
                    </Row>
                    <Row className="submitRow">
                        <Button type="submit" variant="primary" size="md" className="submit-btn">Submit</Button>
                    </Row>  
                </Container>
            </Form>
        </Container>
    )
}

export default Auth;
