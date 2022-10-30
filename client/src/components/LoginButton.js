import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { Link, useHistory, useLocation } from 'react-router-dom';
import * as authSlice from '../store/slices/authSlice';
import { logout } from '../store/slices/authSlice';
import { UserIDToken } from '../types';
import styles from './LoginButton.module.scss';

const LoginButton = () => {

    const dispatch = useDispatch();
    // const history = useHistory();
    const navigate = useNavigate();
    // const location = useLocation();

    // const user = useSelector((state:{auth:UserIDToken}) => state.auth)
    // const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    // useEffect(() => {
    //     const token = user?.token;
    //     //JWT
    //     setUser(JSON.parse(localStorage.getItem('user')));
    // }, [location]);

    // const logoutEvent = () => {
    //     // dispatch({ type: 'LOGOUT' });
    //     dispatch(logout())
    //     history.push('/login');
    //     // setUser(null);
    // }

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        const token = user?.token;
        //JWT
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, []);

    const logout = () => {
        // dispatch({ type: 'LOGOUT' });
        dispatch(authSlice.logout())
        // history.push('/login');
        navigate("/login");
        setUser(null);
    }

    return (
        <>
            {user ? (
                <Button href="/" size="sm" className={styles.logoutBtn} onClick={logout}> 
                    Logout
                </Button>
            )  
            : (
                <Button href="/login" size="sm" className={styles.loginBtn}> 
                    Login
                </Button>
            )}

        </>
    )
}

export default LoginButton;
