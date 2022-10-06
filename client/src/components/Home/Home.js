import React, { useState, useEffect } from 'react';
import { Container, Row, Button, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
// import { getDownline } from '../../actions/downline'
// import { getCycle } from '../../actions/cycle'
import './styles.scss';
import Calculator from '../../pages/Calculator/Calculator';
import { useHistory } from 'react-router-dom';

const Home = () => {

    const [currentId, setCurrentId] = useState(null);
    const [currentCycleId, setCurrentCycleId] = useState(null);
    const [currentModal, setCurrentModal] = useState(false);
    const [currentTotalReturn, setCurrentTotalReturn] = useState(0);

    const history = useHistory();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getDownline());
    // }, [currentId, dispatch]);

    // useEffect(() => {
    //     dispatch(getCycle());
    // }, [currentCycleId, dispatch]);

    return (
        <>
        {user ? 
        <Container>
            <Calculator/>
        </Container>  
        :
        history.push('/login')
        }

        </>


    )
}

export default Home;
