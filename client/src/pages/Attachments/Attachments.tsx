import React, { useState, useEffect, useMemo } from 'react';
import { Button, Col, Dropdown, Row, Container } from 'react-bootstrap';
import "./Attachments.scss";
import { fetchAttachments } from '../../store/thunk/attachmentThunk';
import { Attachment } from '../../types';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import AttachmentsTable from './AttachmentsTable';
import UpdateAttachmentModal from './UpdateAttachmentModal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useParams } from 'react-router-dom';

const Attachments = () => {

    const dispatch = useAppDispatch();
    const { fund } = useParams();
    
    //data
    const attachmentStore = useAppSelector((state) => state.attachment);
    
    const [referral, setReferral] = useState<string>('');
    const [selectedAttachment, setSelectedAttachment] = useState<Attachment|undefined>();
    const totalAttachmentsAmount = useMemo(() => {
        let total:number = 0;
        if(fund){
            attachmentStore.attachments.filter(x=>x.fund.includes(fund)).forEach((item:Attachment)=>{
                total += item.attachment;
              })
        }
        return total;        
    }, [attachmentStore.attachments, fund])

    //modal
    const [show, setShow] = useState<boolean>(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
    const [action, setAction] = useState<string>("");
    
    useEffect(() => {
        dispatch(fetchAttachments(""));
    },[dispatch])

    useEffect(() => {
        switch (action) {
            case "Add":
                setShow(true);
                break;
            case "Edit":   
                setShow(true);            
                break;  
            case "Delete":
                setShowConfirmDelete(true);
                break;      
            default:
                break;
        }
    }, [action])
    
    return (
        <Container style={{backgroundColor:"#fff"}} className="p-4 rounded-lg tight-container">
            <h4 className="pb-2">{fund} Attachments</h4>
            {attachmentStore.loading && 
            <Loading />
            }
            {(!attachmentStore.loading && attachmentStore.error!=="") && 
            <Error error={attachmentStore.error} />  
            }   
            {(!attachmentStore.loading && attachmentStore.error==="") && 
            <>
            <Row className="mb-2">
                <Col md={6} xs={4}>
                    <Dropdown>
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
                            <Dropdown.Item onSelect={()=>setReferral('others')}>Others</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                
                <Col md={6} xs={8} className="d-flex justify-content-end">
                    {fund==="GMC" && 
                        <p className='m-auto total_payout'>Main acc: USD 3000</p>
                    }
                    {fund==="Takami" && 
                        <p className='m-auto total_payout'>Main acc: USD 1000</p>
                    }
                    {attachmentStore.attachments && 
                        <p data-testid="totalUSD" className='m-auto total_payout'>Total downline: USD {totalAttachmentsAmount}</p>
                    }
                    <Button onClick={()=>setAction("Add")} className="add-btn">Add</Button>
                </Col>
            </Row>
            {fund && 
            <AttachmentsTable 
                attachmentsByFund={attachmentStore.attachments.filter(x=>x.fund.includes(fund))}
                setSelectedAttachment={setSelectedAttachment}
                setAction={setAction}
                referral={referral}
            />            
            }


            <UpdateAttachmentModal 
                show={show}
                setShow={setShow}
                showConfirmDelete={showConfirmDelete}
                setShowConfirmDelete={setShowConfirmDelete}
                action={action}
                setAction={setAction}
                selectedAttachment={selectedAttachment}
                setSelectedAttachment={setSelectedAttachment}
            />
            </>
        }
        
        </Container>
    );
    
}


export default Attachments;