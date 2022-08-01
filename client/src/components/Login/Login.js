import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';

import './styles.scss';

const Login = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        const token = user?.token;
        //JWT
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        history.push('/');
        setUser(null);
    }

    return (
        <>
            {user ? (
                <Button href="/" size="md" className="logout-btn" onClick={logout}> 
                    Logout
                </Button>
            )  
            : (
                <Button href="/login" size="md" className="login-btn"> 
                    Login
                </Button>
            )}

        </>
    )
}

export default Login;
