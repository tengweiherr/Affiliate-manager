import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDownline, createDownline, updateDownline, deleteDownline } from '../../actions/downline'
import Table from 'react-bootstrap/Table';
import { Button, Col, Dropdown, Modal, Row, Form, Spinner, Container } from 'react-bootstrap';
import "./Downlines.scss";
import { useHistory } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker'

const Downlines = () => {

    const API_URL = process.env.REACT_APP_API_URL;

    const [currentId, setCurrentId] = useState(null);
    const [downlines, setDownlines] = useState();
    const [referral, setReferral] = useState('');

    const [show, setShow] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const history = useHistory();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseConfirm = () => setShowConfirm(false);
    const handleShowConfirm = () => setShowConfirm(true);

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const [error, setError] = useState("");
    

    useEffect(() => {
      
        fetch(API_URL + 'downline/' + referral, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          })
            .then(data => data.json())
            .then(result =>{
                setDownlines(result);
            })
            .catch(err=>{
                console.log(err);
            })
    
    }, [referral])

    const [downlineData, setDownlineData] = useState({
        name: '', tfxi_id: 0, attachment: 1000, referral: 'dawson', fund: 'GMC', join_date: new Date(), referral_fee: 50
    });

    //useSelector to retrieve data
    const downline = useSelector((state) => currentId ? state.downlines.find((p) => p._id === currentId) : null);

    //useDispatch to set an action
    const dispatch = useDispatch();

    //useEffect to set a callback action
    useEffect(() => {
        if (downline) { setDownlineData(downline); }
    }, [downline]);

    //handle submit func
    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(updateDownline(currentId, downlineData));
        } else {
            dispatch(createDownline(downlineData));
        }
        clear();
        handleClose();
    }

    const clear = () => {
        setCurrentId(null);
        setDownlineData({name: '', tfxi_id: 0, attachment: 1000, referral: 'dawson', fund: 'GMC', join_date: new Date(), referral_fee: 50});
    }

    const handleDelete = () => {
        dispatch(deleteDownline(currentId));
        setCurrentId(null);
    }

    const calculateTotal = () => {
      var total = 0;
      for (let index = 0; index < downlines.length; index++) {
          total += parseFloat(downlines[index].attachment);
          
      }
      return total;
    }

    return (
    <>
    {user ? 
    <Container style={{backgroundColor:"#fff"}} className="p-4 rounded-lg tight-container">
    <Row className="mb-2">
        <Col md={9} xs={4}>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {referral === '' ? "All" : referral.charAt(0).toUpperCase() + referral.slice(1)}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1" onSelect={()=>setReferral('')}>All</Dropdown.Item>
                    <Dropdown.Item href="#/action-2" onSelect={()=>setReferral('dawson')}>Dawson</Dropdown.Item>
                    <Dropdown.Item href="#/action-3" onSelect={()=>setReferral('khoo')}>Khoo</Dropdown.Item>
                    <Dropdown.Item href="#/action-4" onSelect={()=>setReferral('weiherr')}>Weiherr</Dropdown.Item>
                    <Dropdown.Item href="#/action-5" onSelect={()=>setReferral('xiaofei')}>Xiaofei</Dropdown.Item>
                    <Dropdown.Item href="#/action-6" onSelect={()=>setReferral('jasper')}>Jasper</Dropdown.Item>
                    <Dropdown.Item href="#/action-7" onSelect={()=>setReferral('self')}>Self</Dropdown.Item>
                    <Dropdown.Item href="#/action-8" onSelect={()=>setReferral('others')}>Others</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Col>
        <Col md={3} xs={8} className="d-flex justify-content-end">
            {downlines && 
                <p className='m-auto total_payout'>Total: USD {calculateTotal()}</p>
            }
            <Button onClick={handleShow} className="add-btn">Add</Button>
        </Col>
    </Row>
    {downlines ? 
       <Table hover responsive="md" className="rounded-lg">
       <thead>
           <tr>
               <th className="tfxi-id">
                   ID
               </th>
               <th className="name">
                   Name
               </th>
               <th className="attachment">
                   Attachment
               </th>
               <th className="join-at">
                   Join At
               </th>
               <th className="referral">
                   Referral
               </th>
               <th className="fund">
                   Fund Invested
               </th>
               <th className='action'>
                   Action
               </th>
           </tr>
       </thead>
       <tbody>
           {downlines.map((downline, index)=>(
               <tr key={index} className={`${downline.referral}`}>
                   <td className='tfxi_id'>
                       {downline.tfxi_id} 
                   </td>
                   <td className='name'>
                       {downline.name}
                   </td>
                   <td className='attachment'>
                       {downline.attachment}
                   </td>
                   <td className='join-at'>
                       {downline.join_date.split('T')[0]}
                   </td>
                   <td className='referral'>
                       {downline.referral.charAt(0).toUpperCase() + downline.referral.slice(1)}
                   </td>
                   <td className='fund'>
                       {downline.fund}
                   </td>
                   <td className='action'>
                       <div className='m-auto'>
                        <a className='edit-icon' href='#' 
                            onClick={(e)=>{
                                setCurrentId(downline._id);
                                setDownlineData({
                                    name: downline.name,
                                    tfxi_id: downline.tfxi_id,
                                    attachment: downline.attachment,
                                    referral: downline.referral,
                                    fund: downline.fund,
                                    join_date: downline.join_date
                                });
                                handleShow();
                                }}>
                            <EditIcon/>
                        </a>
                            <a className='trash-icon' href='#' onClick={(e)=>{handleShowConfirm();setCurrentId(downline._id)}}>
                            <TrashIcon/>
                        </a>
                       </div>
                   </td>
               </tr>

           ))}

       </tbody>

   </Table>    
    :
    <Container className='p-5 d-flex justify-content-center align-items-center'>
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    </Container>
    }
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>{currentId ? "Edit" : "Add New"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        <Form.Group className="mb-3" controlId="tfxi_id">
                <Form.Label>TFXI ID</Form.Label>
                <Form.Control type="number" placeholder="TFXI ID" 
                value={downlineData.tfxi_id} 
                onChange={(e) => {
                    if(!isNaN(parseInt(e.target.value)))
                    setDownlineData({ ...downlineData, tfxi_id: parseInt(e.target.value)})
                }}
                onKeyUp={(event)=>{
                    if (!/^\d{7}$/.test(parseInt(event.target.value)))
                        setError("Account ID must be a 7 digit number");
                    else setError("");
                }}/>
                {error !== "" &&
                    <p className="error-text">{error}</p>                      
                }
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name" value={downlineData.name} onChange={(e) => setDownlineData({ ...downlineData, name: e.target.value })}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="attachment">
                <Form.Label>Attachment</Form.Label>
                <Form.Control type="number" min={0} step={1000} placeholder="Attachment" 
                    value={downlineData.attachment} 
                    onChange={(e) => setDownlineData({ ...downlineData, attachment: parseInt(e.target.value)})}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="join_date">
                <Form.Label>Join At</Form.Label>
                <DateTimePicker onChange={(value) => setDownlineData({ ...downlineData, join_date: value })} value={new Date(downlineData.join_date)} required/>
                {/* (e) => setDownlineData({ ...downlineData, join_date: e.target.value }) */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="referral">
                <Form.Label>Referral</Form.Label>
                <Form.Control as="select" placeholder="Referral" name="Referral" value={downlineData.referral} onChange={(e) => setDownlineData({ ...downlineData, referral: e.target.value })}>
                <option value="dawson">Dawson</option>
                <option value="khoo">Khoo</option>
                <option value="weiherr">Weiherr</option>
                <option value="xiaofei">Xiaofei</option>
                <option value="jasper">Jasper</option>
                <option value="self">Self</option>
                <option value="others">Others</option>
                </Form.Control>          
            </Form.Group>
            {downlineData.referral === "others" && 
            <Form.Group className="mb-3" controlId="referral_fee">
                <Form.Label>Referral Fee</Form.Label>
                <Form.Control type="number" min={0} step={10} placeholder="Referral Fee" value={downlineData.referral_fee} onChange={(e) => setDownlineData({ ...downlineData, referral_fee: parseFloat(e.target.value)})}/>
            </Form.Group>
            }
            <Form.Group className="mb-3" controlId="fund">
                <Form.Label>Fund Invested</Form.Label>
                <Form.Control as="select" placeholder="Fund" name="Fund" value={downlineData.fund} onChange={(e) => setDownlineData({ ...downlineData, fund: e.target.value })}>
                <option value="GMC">GMC</option>
                <option value="GMC PAMM">GMC PAMM</option>
                </Form.Control>         
            </Form.Group>
            <Button className="submit-btn" onClick={(e)=>{handleSubmit(e)}}>Submit</Button>
            <Button variant="secondary" className="close-btn mx-2" onClick={()=>{handleClose();clear();}}>Close</Button>
        </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showConfirm} onHide={handleCloseConfirm}>
        <Modal.Body>
            <p>Confirm to delete?</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseConfirm}>Close</Button>
            <Button variant="primary" onClick={handleDelete}>Save changes</Button>
        </Modal.Footer>
        </Modal>
    </Container>
    :
    history.push('/login')
    }
    </>

    );
    
}

const TrashIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
    </svg>
  );
}

const EditIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
    </svg>
  );
}

export default Downlines;