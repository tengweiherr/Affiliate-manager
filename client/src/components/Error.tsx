import React from "react";
import { Container } from "react-bootstrap";

type Props = {
    error:string
}

const Error = ({error}:Props) => {
  return (
    <Container className='p-2 d-flex justify-content-center align-items-center'>
        <span className='pe-3'>Error: {error}</span>
    </Container>    
  )
}

export default Error;