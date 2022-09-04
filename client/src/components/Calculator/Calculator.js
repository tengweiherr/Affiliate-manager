import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col, Container, Dropdown, Form, InputGroup, Modal, Row, Spinner, Table } from 'react-bootstrap';
import './Calculator.scss';
import { fetchDownlines, createNewDownline, updateDownline, deleteDownline } from '../../api';
import * as downlineSlice from '../../store/slices/downlineSlice';

export const Calculator = () => {

    //data
    const downlines = useSelector(state => state.downline);
    const [filteredDownlines, setFilteredDownlines] = useState();
    const [referral, setReferral] = useState('');

    //customizable
    const [decimal, setDecimal] = useState(2);
    const [currency, setCurrency] = useState("usd");
    const [rate, setRate] = useState(1);
    const [payout, setPayout] = useState(40);
    const [error, setError] = useState("");

    //referral
    const [dawson, setDawson] = useState([]);
    const [khoo, setKhoo] = useState([]);
    const [weiherr, setWeiherr] = useState([]);
    const [xiaofei, setXiaofei] = useState([]);
    const [jasper, setJasper] = useState([]);
    const [self, setSelf] = useState([]);

    //calculation
    const [form, setForm] = useState({cycle_profit:0});
    const [isCalculated, setIsCalculated] = useState(false);
    const [commission, setCommission] = useState(0);
    const [result, setResult] = useState({
        main_acc_profit: 0,
        shared_acc_profit: 0,
        shared_acc_commission: 0,
        dawson_commission: 0,
        khoo_commission: 0,
        weiherr_commission: 0,
        xiaofei_commission: 0,
        jasper_commission: 0
    });

    //modal
    const [show, setShow] = useState(false);
    const [editDownline, setEditDownline] = useState(null);
    const [editedDownline, setEditedDownline] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const EditIcon = () => {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg>
        );
      }

    useEffect(() => {
      
        fetchDownlines(referral)
            .then(results =>{
                setFilteredDownlines(results);

                for (let index = 0; index < results.length; index++) {

                    results[index].checked = true;
                    
                    switch (results[index].referral) {
                        case 'self':
                            setSelf((array) =>[...array, results[index]]);
                            break;
                        case 'dawson':
                            setDawson((array) =>[...array,results[index]]);
                            break;
                        case 'khoo':
                            setKhoo((array) =>[...array,results[index]]);
                            break;
                        case 'weiherr':
                            setWeiherr((array) =>[...array,results[index]]);
                            break;
                        case 'xiaofei':
                            setXiaofei((array) =>[...array,results[index]]);
                            break;
                        case 'jasper':
                            setJasper((array) =>[...array,results[index]]);
                            break;                       
                        default:
                            break;
                    }
                }
            })
            .catch(err=>{
                console.log(err);
            })
    
    },[])

    useEffect(() => {
      
        switch (referral) {
            case "":
                setFilteredDownlines(downlines);
                break;
            case "self":
                setFilteredDownlines(self);
                break;
            case "dawson":
                setFilteredDownlines(dawson);
                break;
            case "khoo":
                setFilteredDownlines(khoo);
                break;
            case "weiherr":
                setFilteredDownlines(weiherr);
                break;
            case "xiaofei":
                setFilteredDownlines(xiaofei);
                break;   
            case "jasper":
                setFilteredDownlines(jasper);
                break;       
            default:
                break;
        }

    }, [referral])
    

    const calculateCommission = () => {
        const result = (parseFloat(form.cycle_profit)*3/6*(payout/100));
        return result;
    }
    
    const personalTotalCommission = (referral,_commission) => {

        switch (referral) {
            case "dawson":
                var referralFee = 0;
                var totalCommission = 0;
                for (let index = 0; index < dawson.length; index++) {
                    if(dawson[index].checked === true){
                        totalCommission += parseFloat(parseInt(dawson[index].attachment/1000)*_commission);

                        if(calculateYearDifference(dawson[index].join_date) < 1)
                        referralFee += parseFloat(parseInt(dawson[index].attachment/1000)*(50/12));
                    }
                }
                return parseFloat(referralFee + totalCommission);
            case "khoo":
                var referralFee = 0;
                var totalCommission = 0;
                for (let index = 0; index < khoo.length; index++) {

                    if(khoo[index].checked === true){
                        totalCommission += parseFloat(parseInt(khoo[index].attachment/1000)*_commission);

                        if(calculateYearDifference(khoo[index].join_date) < 1)
                        referralFee += parseFloat(parseInt(khoo[index].attachment/1000)*(50/12));
                    }
                }
                return parseFloat(referralFee + totalCommission);
            case "weiherr":
                var referralFee = 0;
                var totalCommission = 0;
                for (let index = 0; index < weiherr.length; index++) {
                    if(weiherr[index].checked === true)
                    {
                        totalCommission += parseFloat(parseInt(weiherr[index].attachment/1000)*_commission);

                        if(calculateYearDifference(weiherr[index].join_date) < 1)
                        referralFee += parseFloat(parseInt(weiherr[index].attachment/1000)*(50/12));
                    }
                }
                return parseFloat(referralFee + totalCommission);
            case "xiaofei":
                var referralFee = 0;
                var totalCommission = 0;
                for (let index = 0; index < xiaofei.length; index++) {

                    if(xiaofei[index].checked === true){
                        totalCommission += parseFloat(parseInt(xiaofei[index].attachment/1000)*_commission);

                        if(calculateYearDifference(xiaofei[index].join_date) < 1)
                        referralFee += parseFloat(parseInt(xiaofei[index].attachment/1000)*(50/12));
                    }
                }
                return parseFloat(referralFee + totalCommission);   
            case "jasper":
                var referralFee = 0;
                var totalCommission = 0;
                for (let index = 0; index < jasper.length; index++) {

                    if(jasper[index].checked === true){
                        totalCommission += parseFloat(parseInt(jasper[index].attachment/1000)*_commission);

                        if(calculateYearDifference(jasper[index].join_date) < 1)
                        referralFee += parseFloat(parseInt(jasper[index].attachment/1000)*(50/12));
                    }
                }
                return parseFloat(referralFee + totalCommission);
            case "self":
                var referralFee = 0;
                var totalCommission = 0;
                for (let index = 0; index < self.length; index++) {

                    if(self[index].checked === true){
                        totalCommission += parseFloat(parseInt(self[index].attachment/1000)*_commission);

                        if(calculateYearDifference(self[index].join_date) < 1)
                        referralFee += parseFloat(parseInt(self[index].attachment/1000)*(50/12));
                    }
                }
                return parseFloat(referralFee + totalCommission);              
            default:
                break;
        }
    
    }    

const onSubmit = () => {

    if(form.cycle_profit !== 0){
        clearResult();
        setCommission(calculateCommission());
        calculateResult();
        setIsCalculated(true);
    }
}

const clearResult = () => {
    var temp = {
        main_acc_profit: 0,
        shared_acc_profit: 0,
        shared_acc_commission: 0,
        dawson_commission: 0,
        khoo_commission: 0,
        weiherr_commission: 0,
        xiaofei_commission: 0,
        jasper_commission: 0
      } 
    setResult(temp);
}

const calculateSharedAccProfit = (cycle_profit) => {
  var totalAttachment = 0;
  for (let index = 0; index < self.length; index++) {
      if(self[index].checked === true)
      totalAttachment += self[index].attachment;
  }
  return cycle_profit * (totalAttachment/1000)
}

const calculateResult = () => {
    var temp = {
        main_acc_profit: parseFloat(form.cycle_profit)*3,
        shared_acc_profit: parseFloat(calculateSharedAccProfit(form.cycle_profit)),
        shared_acc_commission: personalTotalCommission("self",calculateCommission()),
        dawson_commission: personalTotalCommission("dawson",calculateCommission()),
        khoo_commission: personalTotalCommission("khoo",calculateCommission()),
        weiherr_commission: personalTotalCommission("weiherr",calculateCommission()),
        xiaofei_commission: personalTotalCommission("xiaofei",calculateCommission()),
        jasper_commission: personalTotalCommission("jasper",calculateCommission())
      } 
    setResult(temp);
}

const calculateYearDifference = (date) => {

    // To set two dates to two variables
    var date1 = new Date(date);
    var date2 = new Date();
    
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
    
    // To calculate the no. of days between two dates
    var Difference_In_Years = Difference_In_Time / (1000 * 3600 * 24 * 365);

    return Difference_In_Years;

}

const handleChecked = (e,downline) => {

    switch (downline.referral) {
        case 'self':
            self.find(x => x._id === downline._id).checked = e.target.checked;
            break;
        case 'dawson':
            dawson.find(x => x._id === downline._id).checked = e.target.checked;
            break;
        case 'khoo':
            khoo.find(x => x._id === downline._id).checked = e.target.checked;
            break;
        case 'weiherr':
            weiherr.find(x => x._id === downline._id).checked = e.target.checked;
            break;
        case 'xiaofei':
            xiaofei.find(x => x._id === downline._id).checked = e.target.checked;
            break;
        case 'jasper':
            jasper.find(x => x._id === downline._id).checked = e.target.checked;
            break;                       
        default:
            break;
    }

    calculateResult();

}

const handleSubmit = () => {
    // setEditDownline({...editDownline, commission:e.target.value});
    var previousCommission = (parseFloat(commission*editDownline.attachment/1000)*(rate)).toFixed(decimal);
    // var previousReferral = (calculateYearDifference(editDownline.join_date) < 1 ? (parseFloat((parseInt(editDownline.referral_fee)/12)*editDownline.attachment/1000)*(rate)).toFixed(decimal) : 0);
    if(editedDownline.find(x=>x._id === editDownline._id)?.commission){
        previousCommission = editedDownline.find(x=>x._id === editDownline._id).commission;
    }    
    // if(editedDownline.find(x=>x._id === editDownline._id)?.commission){
    //     previousReferral = editedDownline.find(x=>x._id === editDownline._id).new_referral_fee;
    // }    

    switch (editDownline.referral) {
        case 'self':
            setResult({...result, shared_acc_commission:(result.shared_acc_commission - previousCommission + (editDownline.commission ? parseFloat(editDownline.commission) : previousCommission) )});
            break;
        case 'dawson':         
            // setResult({...result, dawson_commission:(result.dawson_commission                 
            //     - previousCommission + (editDownline.commission ? parseFloat(editDownline.commission) : previousCommission) 
            //     - previousReferral + (editDownline.new_referral_fee ? parseFloat(editDownline.new_referral_fee) : previousReferral) )});
            setResult({...result, dawson_commission:(result.dawson_commission - previousCommission + (editDownline.commission ? parseFloat(editDownline.commission) : previousCommission) )});
            break;
        case 'khoo':
            setResult({...result, khoo_commission:(result.dawson_commission - previousCommission + (editDownline.commission ? parseFloat(editDownline.commission) : previousCommission) )});
            break;
        case 'weiherr':
            setResult({...result, weiherr_commission:(result.dawson_commission - previousCommission + (editDownline.commission ? parseFloat(editDownline.commission) : previousCommission) )});
            break;
        case 'xiaofei':
            setResult({...result, xiaofei_commission:(result.dawson_commission - previousCommission + (editDownline.commission ? parseFloat(editDownline.commission) : previousCommission) )});
            break;
        case 'jasper':
            setResult({...result, jasper_commission:(result.dawson_commission - previousCommission + (editDownline.commission ? parseFloat(editDownline.commission) : previousCommission) )});
            break;                       
        default:
            break;
    }
    //update existed
    if(editedDownline.find(x=>x._id === editDownline._id)?.commission){
        editedDownline.find(x=>x._id === editDownline._id).commission = editDownline.commission;
    }else{
        setEditedDownline(current => [...current,editDownline]);
    }
    // if(editedDownline.find(x=>x._id === editDownline._id)?.new_referral_fee){
    //     editedDownline.find(x=>x._id === editDownline._id).new_referral_fee = editDownline.new_referral_fee;
    // }
    //if new edited
    // if(!editedDownline.find(x=>x._id === editDownline._id)){
    //     setEditedDownline(current => [...current,editDownline]);
    // }
    handleClose();
}

  return (
    <>
        <Container style={{backgroundColor:"#fff"}} className="p-4 mb-3 rounded-lg tight-container">
            <Form>
                <Row>
                    <Col className="d-flex flex-column justify-content-evenly cycle-profit-upper">
                        <Form.Group className="d-flex flex-column cycle-profit-upper-inner justify-content-between" controlId="calculatorForm.profit">
                            <Form.Label>
                                <h5>Cycle Profit</h5>                       
                            </Form.Label>
                            <div style={{display:"flex", flexDirection:"horizontal",alignItems:"center"}}>
                            <Form.Control type="number" min="0" step="0.01" placeholder="Cycle Profit" data-testid="cycleProfitInput" style={{width:150, marginRight:8}} 
                                onChange={(event)=>{
                                    if (!isNaN(parseFloat(event.target.value)))
                                        setForm((prevState) => ({
                                            ...prevState,
                                            cycle_profit: event.target.value,
                                            }));
                                }}
                                onKeyUp={(event)=>{
                                    if (isNaN(parseFloat(event.target.value)))
                                        setError("Please input valid number");

                                    else if (parseFloat(event.target.value) < 0)
                                        setError("Minimum is 0")
                                    else setError("");
                                }}
                                />
                            USD
                            </div>
                            <p className="error-text" data-testid="cycleProfitError">{error}</p>                      
                            <Button variant="primary" data-testid="calculateBtn" className="submit-btn rounded mb-3" disabled={error!==""} onClick={()=>onSubmit()}>
                                Calculate
                            </Button>
                        </Form.Group>
                    </Col>
                    <Col className="d-flex flex-column justify-content-evenly cycle-profit-bottom">
                        <Form.Group className="d-flex flex-column">
                            <Form.Label className="mb-0">
                                <h6>Decimal places</h6>  
                            </Form.Label>
                            <div>
                                <Form.Check
                                    inline
                                    label="2"
                                    name="decimal-place"
                                    type='radio'
                                    id='2-decimal-place'
                                    value={2}
                                    defaultChecked={true}
                                    onChange={(e)=>setDecimal(parseInt(e.target.value))}
                                    data-testid="decimalPlaces2"
                                />
                                <Form.Check
                                    inline
                                    label="3"
                                    name="decimal-place"
                                    type='radio'
                                    id='3-decimal-place'
                                    value={3}
                                    onChange={(e)=>setDecimal(parseInt(e.target.value))}
                                    data-testid="decimalPlaces3"
                                />  
                                {}
                            </div>
                                                
                        </Form.Group>
                        <Form.Group className="d-flex flex-column">
                            <Form.Label className="mb-0">
                                <h6>Currency</h6>  
                            </Form.Label>
                            <div className="d-flex flex-row align-items-center position-relative">
                                <Form.Check
                                    inline
                                    label="USD"
                                    name="currency"
                                    type='radio'
                                    id='usd'
                                    value="usd"
                                    defaultChecked={true}
                                    onChange={(e)=>{
                                        setCurrency("usd");
                                        setRate(1);
                                    }}
                                    data-testid="currencyUSD"
                                />
                                <Form.Check
                                    inline
                                    label="MYR"
                                    name="currency"
                                    type='radio'
                                    id='myr'
                                    value="myr"
                                    onChange={(e)=>setCurrency("myr")}
                                    data-testid="currencyMYR"
                                />
                                {currency === "myr" && 
                                <Form.Control type="number" min="0" step="0.001" placeholder="USD to MYR" className="position-absolute" style={{width:150, left:150}} 
                                    value={rate}
                                    onChange={(event)=>{
                                        if (!isNaN(parseFloat(event.target.value)))
                                        setRate(parseFloat(event.target.value))}
                                    }
                                    data-testid="currencyMYRInput"
                                />                                 
                                }

                            </div>   
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="commission">
                            <Form.Label className="mb-0">
                                <h6>Commission Payout in %</h6>
                            </Form.Label>
                            <InputGroup>
                                <Form.Control type="number" placeholder="Commission Payout in %" style={{width:150, marginRight:8}}
                                value={payout}
                                data-testid="commissionPayoutInput"
                                onChange={(event)=>{
                                    if (!isNaN(parseInt(event.target.value)))
                                    setPayout(parseInt(event.target.value))}
                                }/>
                                <p>%</p>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>                
            </Form>            
        </Container>
        {isCalculated && 
        
        <Container style={{backgroundColor:"#fff"}} className="p-4 rounded-lg tight-container">
            <Row className="overview">
                <h6 className="mx-1">Overview</h6>
                <Col sm={6}>
                    <Table hover responsive="md">
                        <tbody>
                        <tr>
                            <td className="head">
                                <p>Main Acc Profit</p>
                            </td>
                            <td className="content">
                                <p data-testid="mainAccProfit">{(result.main_acc_profit*(rate)).toFixed(decimal)}</p>
                            </td>
                        </tr>
                        <tr>
                            <td className="head">
                                <p>Shared Acc Profit</p>
                            </td>
                            <td className="content">
                                <p>{(result.shared_acc_profit*(rate)).toFixed(decimal)}</p>
                            </td>
                        </tr>
                        <tr>
                            <td className="head">
                                <p>Shared Acc Commission</p>
                            </td>
                            <td className="content">
                                <p>{(result.shared_acc_commission*(rate)).toFixed(decimal)}</p>
                            </td>
                        </tr>
                        <tr>
                            <td className="head">
                                <p>Total</p>
                            </td>
                            <td className="content">
                                <p>{((result.main_acc_profit + result.shared_acc_commission + result.shared_acc_profit)*(rate)).toFixed(decimal)}</p>
                            </td>
                        </tr>
                        </tbody>


                    </Table>
                </Col>

                <Col sm={6}>
                    <Table hover responsive="md">
                        <tbody>
                            <tr>
                                <td className="head">
                                    <p>Dawson's Commission</p>
                                </td>
                                <td className="content">
                                    <p>{(result.dawson_commission*(rate)).toFixed(decimal)}</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="head">
                                    <p>Khoo's Commission</p>
                                </td>
                                <td className="content">
                                    <p>{(result.khoo_commission*(rate)).toFixed(decimal)}</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="head">
                                    <p>Weiherr's Commission</p>
                                </td>
                                <td className="content">
                                    <p>{(result.weiherr_commission*(rate)).toFixed(decimal)}</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="head">
                                    <p>Xiaofei's Commission</p>
                                </td>
                                <td className="content">
                                    <p>{(result.xiaofei_commission*(rate)).toFixed(decimal)}</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="head">
                                    <p>Jasper's Commission</p>
                                </td>
                                <td className="content">
                                    <p>{(result.jasper_commission*(rate)).toFixed(decimal)}</p>
                                </td>
                            </tr>
                        </tbody>


                        </Table>
                </Col>        
            </Row>
            
            <Row>
                <Col>
                    <Dropdown className="mb-2">
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
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            {filteredDownlines ? 
            <Table hover responsive="md" className="detail" data-testid="downlinesTable">
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
                    <th className="commission">
                        Commission
                    </th>
                    <th className="referralFee">
                        Referral Fee
                    </th>
                    <th className="referral">
                        Referral
                    </th>
                    <th className="action">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {filteredDownlines.map((downline, index)=>(
                    <tr data-testid="downlinesRow" key={index} className={downline.checked?`${downline.referral}`:`${downline.referral + " " + downline.checked}`}>
                        <td className='tfxi_id'>
                            {downline.tfxi_id}
                        </td>
                        <td className='name'>
                            {downline.name}
                        </td>
                        <td className='attachment'>
                            {downline.attachment*(rate)}
                        </td>
                        <td className='join-at'>
                            {downline.join_date.split('T')[0]}
                        </td>
                        <td className='commission'>
                            {editedDownline.find(x=>x._id === downline._id)? editedDownline.find(x=>x._id === downline._id).commission : (parseFloat(commission*downline.attachment/1000)*(rate)).toFixed(decimal)}
                            <a className="edit" onClick={()=>{handleShow();setEditDownline(downline)}}><EditIcon/></a>
                        </td>
                        <td className='referralFee'>
                            {downline.referral !== "others" ? 
                            calculateYearDifference(downline.join_date) < 1 ? (parseFloat((50/12)*downline.attachment/1000)*(rate)).toFixed(decimal) : 0
                            :
                            calculateYearDifference(downline.join_date) < 1 ? (parseFloat((parseInt(downline.referral_fee)/12)*downline.attachment/1000)*(rate)).toFixed(decimal) : 0
                            }
                        </td>
                        <td className='referral'>
                            {downline.referral.charAt(0).toUpperCase() + downline.referral.slice(1)}
                        </td>
                        <td className='action'>
                                <Form.Check 
                                    type="checkbox"
                                    id="default-checkbox"
                                    className="d-flex justify-content-center align-items-center"
                                    checked={downline.checked}
                                    onChange={(e)=>handleChecked(e,downline)}
                                />
                        </td>
                    </tr>

                ))}

            </tbody>
            {editDownline && 
            <Modal show={show} onHide={handleClose}>
            <Modal.Header>
            <Modal.Title>Edit Info</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-4'>
            <Form>
            <Form.Group className="mb-3" controlId="tfxi_id">
                <Form.Label>TFXI ID</Form.Label>
                <Form.Control type="number" placeholder="TFXI ID" value={editDownline.tfxi_id} readOnly/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name" value={editDownline.name} readOnly/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="attachment">
                <Form.Label>Attachment</Form.Label>
                <Form.Control type="number" placeholder="Attachment" value={editDownline.attachment} readOnly/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="join_date">
                <Form.Label>Join At</Form.Label>
                {/* <DateTimePicker value={new Date(editDownline.join_date)} readOnly/> */}
                <Form.Control type="text" placeholder="Join At" value={new Date(editDownline.join_date)} readOnly/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="referral">
                <Form.Label>Referral</Form.Label>
                <Form.Control type="text" placeholder="Referral" name="Referral" value={editDownline.referral} readOnly/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="commission">
                <Form.Label>Commission</Form.Label>
                <Form.Control type="number" placeholder="Commission" 
                defaultValue={editedDownline.find(x=>x._id === editDownline._id)?.commission? editedDownline.find(x=>x._id === editDownline._id).commission : (parseFloat(commission*editDownline.attachment/1000)*(rate)).toFixed(decimal)} 
                onChange={(e) => {
                    setEditDownline({...editDownline, commission:parseFloat(e.target.value).toFixed(decimal)});
                }}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="referral_fee">
                <Form.Label>Referral Fee</Form.Label>
                <Form.Control type="number" min={0} step={10} placeholder="Referral Fee" readOnly
                defaultValue={calculateYearDifference(editDownline.join_date) < 1 ? (parseFloat((parseInt(editDownline.referral_fee)/12)*editDownline.attachment/1000)*(rate)).toFixed(decimal) : 0} 
                // onChange={(e) => {
                //     setEditDownline({...editDownline, new_referral_fee:parseFloat(e.target.value).toFixed(decimal)});
                // }}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="fund">
                <Form.Label>Fund Invested</Form.Label>
                <Form.Control type="text" placeholder="Fund" name="Fund" value={editDownline.fund} readOnly/>      
            </Form.Group>
        </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={handleSubmit}>
                Submit
            </Button>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
                </Modal.Footer>
            </Modal>            
            }

        </Table>    
        :
        <Container className='p-5 d-flex justify-content-center align-items-center'>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>    
        }
            
        </Container>
        }
    </>

  );
}


export default Calculator;