import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

type Props = {
    rate:number,
    payout:number,
    includeCommission:boolean,
    includeMonthlyReferralReward:boolean,
    setIncludeCommission:Dispatch<SetStateAction<boolean>>,
    setIncludeMonthlyReferralReward:Dispatch<SetStateAction<boolean>>,
    setDecimal:Dispatch<SetStateAction<number>>,
    setRate:Dispatch<SetStateAction<number>>,
    setPayout:Dispatch<SetStateAction<number>>,
    setCycleProfit:Dispatch<SetStateAction<number>>,
    onSubmitCycleProfit: VoidFunction
}

const cycleProfitChangeEvent = (e:React.ChangeEvent<HTMLInputElement>, setCycleProfit:Dispatch<SetStateAction<number>>) => {
    let eventTargetValue = parseFloat(e.target.value);
    if (!isNaN(eventTargetValue))setCycleProfit(eventTargetValue);
}

const cycleProfitKeyUpEvent = (e:React.KeyboardEvent<HTMLInputElement>, setError:Dispatch<SetStateAction<string>>) => {
    let eventTarget = e.target as HTMLInputElement;
    let eventTargetValue = parseFloat(eventTarget.value);
    if (isNaN(eventTargetValue))
        setError("Please input valid number");
    else if (eventTargetValue < 0)
        setError("Minimum is 0")
    else setError("");
}

const rateChangeEvent = (e:React.ChangeEvent<HTMLInputElement>, setRate:Dispatch<SetStateAction<number>>) => {
    let eventTargetValue = parseFloat(e.target.value);
    if (!isNaN(eventTargetValue))setRate(eventTargetValue);
}

const payoutChangeEvent = (e:React.ChangeEvent<HTMLInputElement>, setPayout:Dispatch<SetStateAction<number>>) => {
    let eventTargetValue = parseFloat(e.target.value);
    if (!isNaN(eventTargetValue))setPayout(eventTargetValue);
}

const decimalChangeEvent = (e:React.ChangeEvent<HTMLInputElement>, setDecimal:Dispatch<SetStateAction<number>>) => {
    setDecimal(parseInt(e.target.value))
}

const CycleProfitForm = ({rate,payout,includeCommission,includeMonthlyReferralReward,setIncludeCommission,setIncludeMonthlyReferralReward,setDecimal,setRate,setPayout,setCycleProfit,onSubmitCycleProfit}:Props) => {

    const [error, setError] = useState<string>("");
    const [currency, setCurrency] = useState<string>("usd");
    const { fund } = useParams();

  return (
    <Form>
        <Row>
            <Col className="d-flex flex-column justify-content-between cycle-profit-upper">
                <Form.Group className="d-flex flex-column cycle-profit-upper-inner justify-content-between" controlId="calculatorForm.profit">
                    {fund==="Takami" && <span style={{color:"red"}}>Takami's not ready yet.</span>}   
                    <Form.Label>
                        <h5>{fund} Cycle Profit</h5>             
                    </Form.Label>
                    <div style={{display:"flex", flexDirection:"row",alignItems:"center"}}>
                    <Form.Control type="number" min="0" step="0.01" placeholder="Cycle Profit" data-testid="cycleProfitInput" style={{width:150, marginRight:8}} 
                        onChange={(e:any)=>cycleProfitChangeEvent(e,setCycleProfit)}
                        onKeyUp={(e:any)=>cycleProfitKeyUpEvent(e,setError)}
                        />
                    USD
                    </div>
                    <p className="error-text" data-testid="cycleProfitError">{error}</p>  
                </Form.Group>   
                <Form.Group className="d-flex flex-column justify-content-between mb-2">
                    <Form.Check
                        inline
                        label="Include commission"
                        name="include-commission"
                        type='checkbox'
                        id='include-commission'
                        checked={includeCommission}
                        onChange={()=>setIncludeCommission((prev)=>!prev)}
                        data-testid="includeCommission"
                    />   
                    {fund!=="Takami" && 
                    <Form.Check
                        inline
                        label="Include referral reward"
                        name="include-commission"
                        type='checkbox'
                        id='include-commission'
                        checked={includeMonthlyReferralReward}
                        onChange={()=>setIncludeMonthlyReferralReward((prev)=>!prev)}
                        data-testid="includeCommission"
                    />   
                    }

                </Form.Group>
                <Button variant="primary" data-testid="calculateBtn" className="submit-btn rounded mb-3" disabled={error!==""||fund==="Takami"} onClick={()=>onSubmitCycleProfit()}>
                    Calculate
                </Button>

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
                            onChange={(e:any)=>decimalChangeEvent(e,setDecimal)}
                            data-testid="decimalPlaces2"
                        />
                        <Form.Check
                            inline
                            label="3"
                            name="decimal-place"
                            type='radio'
                            id='3-decimal-place'
                            value={3}
                            onChange={(e:any)=>decimalChangeEvent(e,setDecimal)}
                            data-testid="decimalPlaces3"
                        />  
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
                            onChange={()=>{
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
                            onChange={()=>setCurrency("myr")}
                            data-testid="currencyMYR"
                        />
                        {currency === "myr" && 
                        <Form.Control type="number" min="0" step="0.001" placeholder="USD to MYR" className="position-absolute" style={{width:150, left:150}} 
                            value={rate}
                            onChange={(e:any)=>rateChangeEvent(e,setRate)}
                            data-testid="currencyMYRInput"
                        />                                 
                        }

                    </div>   
                </Form.Group>
                {fund !== "Takami" && 
                <Form.Group className="mb-3" controlId="commission">
                    <Form.Label className="mb-0">
                        <h6>Commission Payout in %</h6>
                    </Form.Label>
                    <InputGroup>
                        <Form.Control type="number" placeholder="Commission Payout in %" min={1} step="1" style={{width:150, marginRight:8}}
                        value={payout}
                        data-testid="commissionPayoutInput"
                        onChange={(e:any)=>payoutChangeEvent(e,setPayout)}/>
                        <p>%</p>
                    </InputGroup>
                </Form.Group>
                }

            </Col>
        </Row>                
    </Form>     

  );
}

export default CycleProfitForm;