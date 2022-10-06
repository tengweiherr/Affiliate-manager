import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Dropdown, Row, Spinner } from 'react-bootstrap';
import './Calculator.scss';
import { ArrayOfAttachments, AttachmentStore } from "../../types";
import OverviewTable from "../../components/OverviewTable";
import CycleProfitForm from "../../components/CycleProfitForm";
import DetailedResultTable from "../../components/DetailedResultTable";
import { fetchAttachments } from "../../store/thunk/attachmentThunk";
import { calculatePersonalCommission, calculateSharedAccProfit } from "../../math";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

export const Calculator = () => {

    const dispatch = useDispatch();
    //data
    const attachmentStore = useSelector((state:{attachment:AttachmentStore}) => state.attachment);
    const [filteredAttachments, setFilteredAttachments] = useState<ArrayOfAttachments>([]);
    const [all, setAll] = useState<ArrayOfAttachments>([]);
    const [referral, setReferral] = useState<string>('');

    //customizable
    const [decimal, setDecimal] = useState<number>(2);
    const [rate, setRate] = useState<number>(1);
    const [payout, setPayout] = useState<number>(40);
    const [includeCommission, setIncludeCommission] = useState<boolean>(true);
    const [includeMonthlyReferralReward, setIncludeMonthlyReferralReward] = useState<boolean>(true);

    //calculation
    const [cycleProfit, setCycleProfit] = useState<number>(0);
    const [isCalculated, setIsCalculated] = useState<boolean>(false);
    const commission = useMemo<number>(() => {
        return cycleProfit*3/6*(payout/100);        
    }, [cycleProfit,payout])
    const result = useMemo(() => {        
        return {
            main_acc_profit: cycleProfit*3,
            shared_acc_profit: calculateSharedAccProfit(all,cycleProfit),
            shared_acc_commission: calculatePersonalCommission(all,"self",commission,includeCommission,includeMonthlyReferralReward),
            dawson_commission: calculatePersonalCommission(all,"dawson",commission,includeCommission,includeMonthlyReferralReward),
            khoo_commission: calculatePersonalCommission(all,"khoo",commission,includeCommission,includeMonthlyReferralReward),
            weiherr_commission: calculatePersonalCommission(all,"weiherr",commission,includeCommission,includeMonthlyReferralReward),
            xiaofei_commission: calculatePersonalCommission(all,"xiaofei",commission,includeCommission,includeMonthlyReferralReward),
            jasper_commission: calculatePersonalCommission(all,"jasper",commission,includeCommission,includeMonthlyReferralReward),
        }
    }, [all, commission, cycleProfit, includeCommission, includeMonthlyReferralReward])

    useEffect(() => {
        dispatch(fetchAttachments(""));
    },[dispatch])

    useEffect(() => {
        attachmentStore.attachments.length !==0 && setAll(attachmentStore.attachments);
    }, [attachmentStore.attachments])
    
    useEffect(() => {
        referral==="" ? setFilteredAttachments(all) : setFilteredAttachments(all.filter((attachment) => attachment?.referral === referral));
    }, [referral,all])  
    
    const onSubmitCycleProfit = () => {
        cycleProfit !== 0 && setIsCalculated(true);
    }

  return (
    <>
        <Container style={{backgroundColor:"#fff"}} className="p-4 mb-3 rounded-lg tight-container">
            {attachmentStore.loading && 
            <Loading />
            }
            {(!attachmentStore.loading && attachmentStore.error!=="") && 
            <Error error={attachmentStore.error} />  
            }  
            {(!attachmentStore.loading && attachmentStore.error==="") &&
            <CycleProfitForm 
                rate={rate}
                payout={payout}
                includeCommission={includeCommission}
                includeMonthlyReferralReward={includeMonthlyReferralReward}
                setIncludeCommission={setIncludeCommission}
                setIncludeMonthlyReferralReward={setIncludeMonthlyReferralReward}
                setDecimal={setDecimal}
                setRate={setRate}
                setPayout={setPayout}
                setCycleProfit={setCycleProfit}
                onSubmitCycleProfit={onSubmitCycleProfit}/>  
            }    
 
        </Container>
        {isCalculated && 
        <Container style={{backgroundColor:"#fff"}} className="p-4 rounded-lg tight-container">
            <Row className="overview">
                <h6 className="mx-1">Overview</h6>
                <OverviewTable result={result} rate={rate} decimal={decimal}/>
            </Row>
            <Row>
                <Col>
                    <Dropdown className="mb-2">
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {referral === '' ? "All" : referral.charAt(0).toUpperCase() + referral.slice(1)}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onSelect={()=>setReferral('')}>All</Dropdown.Item>
                            <Dropdown.Item onSelect={()=>setReferral('dawson')}>Dawson</Dropdown.Item>
                            <Dropdown.Item onSelect={()=>setReferral('khoo')}>Khoo</Dropdown.Item>
                            <Dropdown.Item onSelect={()=>setReferral('weiherr')}>Weiherr</Dropdown.Item>
                            <Dropdown.Item onSelect={()=>setReferral('xiaofei')}>Xiaofei</Dropdown.Item>
                            <Dropdown.Item onSelect={()=>setReferral('jasper')}>Jasper</Dropdown.Item>
                            <Dropdown.Item onSelect={()=>setReferral('self')}>Self</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <DetailedResultTable 
                filteredAttachments={filteredAttachments}
                all={all}
                setAll={setAll}
                rate={rate}
                decimal={decimal}
                commission={commission}
                includeCommission={includeCommission}
                includeMonthlyReferralReward={includeMonthlyReferralReward}
            /> 
        </Container>
        }
    </>

  );
}


export default Calculator;