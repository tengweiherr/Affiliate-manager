import React from "react";
import { Container, Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <Container className='p-2 d-flex justify-content-center align-items-center'>
        <span className='pe-3'>Fetching data...</span>
        <Spinner animation="border" role="status">
        </Spinner>
    </Container>    
  )
}

export default Loading;