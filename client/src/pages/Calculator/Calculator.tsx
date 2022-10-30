import React, { useEffect, useMemo, useState } from "react";
import { Col, Container, Dropdown, Row } from 'react-bootstrap';
import './Calculator.scss';
import { ArrayOfAttachments, Attachment } from "../../types";
import OverviewTable from "./OverviewTable";
import CycleProfitForm from "./CycleProfitForm";
import DetailedResultTable from "./DetailedResultTable";
import { fetchAttachments } from "../../store/thunk/attachmentThunk";
import { calculatePersonalCommission, calculateSharedAccProfit } from "../../math";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useParams } from "react-router-dom";

export const Calculator = () => {

    const dispatch = useAppDispatch();
    const { fund } = useParams();
    //data
    const attachmentStore = useAppSelector((state) => state.attachment);    
    const [all, setAll] = useState<ArrayOfAttachments>([]);
    const [referral, setReferral] = useState<string>('');
    const filteredAttachments = useMemo(() => 
         referral==="" ? all : all.filter((attachment) => attachment?.referral === referral)
    , [referral,all])

    //customizable
    const [decimal, setDecimal] = useState<number>(2);
    const [rate, setRate] = useState<number>(1);
    const [rebate, setRebate] = useState<number>(0);
    const [includeCommission, setIncludeCommission] = useState<boolean>(true);
    const [includeMonthlyReferralReward, setIncludeMonthlyReferralReward] = useState<boolean>(true);

    //calculation
    const [cycleProfit, setCycleProfit] = useState<number>(0);
    const [isCalculated, setIsCalculated] = useState<boolean>(false);

    const payout = useMemo(() => {
        if(fund!=="GMC") return 0
        let total:number = 0;
        attachmentStore.attachments.filter(x=>x.fund.includes(fund)).forEach((item:Attachment)=>{
            total += item.attachment;
        })
        if(total >= 40000) return 40
        else if(total >= 25000 && total < 40000) return 30
        else if(total >= 10000 && total < 25000) return 20
        else if(total >= 5000 && total < 10000) return 10                
        else return 0
    }, [attachmentStore.attachments, fund])

    const profitSharing = useMemo(() => {
        if(fund!=="Takami") return 0
        let total:number = 1000; //include self attachment
        attachmentStore.attachments.filter(x=>x.fund.includes(fund)).forEach((item:Attachment)=>{
            total += item.attachment;
        })
        if(total >= 1500000) return 20
        else if(total >= 500000 && total < 1500000) return 16
        else if(total >= 150000 && total < 500000) return 12
        else if(total >= 40000 && total < 150000) return 8
        else if(total >= 5000 && total < 40000) return 4
        else return 0     
    }, [attachmentStore.attachments, fund])

    const commission = useMemo<number>(() => {
        switch (fund) {
            case "GMC":
                return cycleProfit*3/6*(payout/100)
            case "Takami":
                return cycleProfit*profitSharing/65
            default:
                return 0
        }              
    }, [cycleProfit, fund, payout, profitSharing])

    const result = useMemo(() => {    
        switch (fund) {
            case "GMC":
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
            case "Takami":
                return {
                    main_acc_profit: cycleProfit+rebate,
                    shared_acc_profit: calculateSharedAccProfit(all,cycleProfit),
                    shared_acc_commission: calculatePersonalCommission(all,"self",commission,includeCommission,false),
                    dawson_commission: calculatePersonalCommission(all,"dawson",commission,includeCommission,false),
                    khoo_commission: calculatePersonalCommission(all,"khoo",commission,includeCommission,false),
                    weiherr_commission: calculatePersonalCommission(all,"weiherr",commission,includeCommission,false),
                    xiaofei_commission: calculatePersonalCommission(all,"xiaofei",commission,includeCommission,false),
                    jasper_commission: calculatePersonalCommission(all,"jasper",commission,includeCommission,false),
                }                       
            default:
                return {
                    main_acc_profit: cycleProfit,
                    shared_acc_profit: 0,
                    shared_acc_commission: 0,
                    dawson_commission: 0,
                    khoo_commission: 0,
                    weiherr_commission: 0,
                    xiaofei_commission: 0,
                    jasper_commission: 0,
                }
        }    

    }, [all, commission, cycleProfit, fund, includeCommission, includeMonthlyReferralReward, rebate])

    useEffect(() => {
        dispatch(fetchAttachments(""));
    },[dispatch])

    useEffect(() => {
        if(fund)
        attachmentStore.attachments.length !==0 && setAll(attachmentStore.attachments.filter(x=>x.fund.includes(fund)));
    }, [attachmentStore.attachments,fund])
    
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
                profitSharing={profitSharing}
                rebate={rebate}
                setRebate={setRebate}
                includeCommission={includeCommission}
                includeMonthlyReferralReward={includeMonthlyReferralReward}
                setIncludeCommission={setIncludeCommission}
                setIncludeMonthlyReferralReward={setIncludeMonthlyReferralReward}
                setDecimal={setDecimal}
                setRate={setRate}
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