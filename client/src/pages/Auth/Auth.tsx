import { Container, FormControl, FormLabel, Form, Row, Col, Button, InputGroup, Spinner } from 'react-bootstrap';
import React, { useState } from 'react';
// import { login } from '../../actions/login';
// import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Auth.scss';
import * as authSlice from '../../store/slices/authSlice';
import * as API from '../../api';
import { LoginData } from '../../types';
import { useNavigate } from 'react-router-dom';


const Auth = () => {

    //useDispatch to set an action
    const dispatch = useDispatch();
    // const history = useHistory();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState<LoginData>({id: '', password: ''});
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        e.preventDefault(); //so that browser dont refresh
        API.login(loginData)
        .then(result =>{
            setIsLoading(false);
            if(result){
                dispatch(authSlice.login(result));
                // history.push('/');
                navigate("/");
            }
        })
        .catch(err=>{
            console.log(err.message);
        })
        // dispatch(login(loginData,history));

    }

    return (
        <Container className="loginScreen">
            <Form className="authform" onSubmit={handleSubmit}>
                <Container className="authformContainer">
                    <Row className="inputRow">
                        <FormControl name="id" size="sm" placeholder="User ID" value={loginData.id} onChange={(e) => setLoginData({...loginData,id: e.target.value})}></FormControl>
                    </Row>
                    <Row className="inputRow">
                        <InputGroup>
                            <FormControl name="password" size="sm" placeholder="Password" type={showPassword ? "text" : "password"} value={loginData.password} onChange={(e) => setLoginData({...loginData,password: e.target.value})}></FormControl>
                            <Button onClick={()=>setShowPassword((prevShowPassword) => !prevShowPassword)}>{showPassword ? "Hide" : "Show"}</Button>
                        </InputGroup>
                    </Row>
                    <Row className="submitRow">
                        {isLoading ? <Spinner animation="border" role="status" className='m-auto'/>
                        :
                        <Button type="submit" variant="primary" size="sm" className="submit-btn">Submit</Button>
                        }                        
                    </Row>  
                </Container>
            </Form>
        </Container>
    )
}

export default Auth;
