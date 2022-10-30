import React from 'react';
import { Button, Container, Row } from 'react-bootstrap';

const Information = () => {

    return (
        <Container>
            <Row><h5>Selling Rules</h5></Row>
            <Row className='mb-4'>
                <ol className='ms-4'>
                    <li>Shared Account</li>
                    <li>自己</li>
                    <li>卖的人的downline</li>
                    <li>其他人的downline</li>
                </ol>
            </Row>
            <Row><h5>Bank Account</h5></Row>
            <Row className='mb-4'>
            <p>
                <strong>LIAN TAT XIAN</strong><br/>
                151061595628<br/>
                MAYBANK<br/>
            </p>
            <p>
                <strong>KHOO JIAN HUI</strong><br/>
                151061687923<br/>
                MAYBANK<br/>
            </p>
            <p>
                <strong>TENG WEI HERR</strong><br/>
                151061745045<br/>
                MAYBANK<br/>
            </p>
            <p>
                <strong>CHAI ZEN FEI</strong><br/>
                1491000738<br/>
                UOB BANK<br/>
            </p>
            <p>
                <strong>OH WEI SHUN</strong><br/>
                6393951029<br/>
                PUBLIC BANK<br/>
            </p>
            </Row>
            <Row><h5>GMC Marketing Plan</h5></Row>
            <Row className='mb-4'>
            <p>
                <strong>Personal Performance Bonus :</strong><br/>
                5 x USD 1000 = 10%<br/>
                USD 10000 = 20%<br/>
                USD 25000 = 30% (self invest USD 3000)<br/>
                USD 40000 = 40% (self invest USD 3000)<br/>
                Total 40% Payout.<br/>
            </p>
            <p>
                <strong>Leadership Bonus :</strong><br/>
                15% (1EM = 1level)<br/>
                10% (2EM)<br/>
                10% (2EM = 3level)<br/>
                6%   (3EM)<br/>
                3%   (3EM = 5level)<br/>
                3%   (4EM)<br/>
                2%   (4EM = 7level)<br/>
                1%   (5EM)<br/>
                1%   (5EM = 9level)<br/>
                2%   (10EM = 10level)<br/>
                Total 53% Payout.<br/>
            </p>
             <p>
                <strong>International Pool Bonus :</strong><br/>
                5 EM = 3% (self invest USD5000)<br/>
                10 EM = 4% (self invest USD5000)<br/>
                Total 7% Payout.<br/>
            </p>
            </Row>
        </Container>
    )
}

export default Information;