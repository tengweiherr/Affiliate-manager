import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col, Dropdown, Row, Container } from 'react-bootstrap';
import "./Attachments.scss";
import { fetchAttachments } from '../../store/thunk/attachmentThunk';
import { Attachment, AttachmentStore } from '../../types';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import AttachmentsTable from '../../components/AttachmentsTable';
import UpdateAttachmentModal from '../../components/UpdateAttachmentModal';

const Attachments = () => {

    const dispatch = useDispatch();
    //data
    const attachmentStore = useSelector((state:{attachment:AttachmentStore}) => state.attachment);
    const [referral, setReferral] = useState<string>('');
    const [selectedAttachment, setSelectedAttachment] = useState<Attachment|undefined>();
    const totalAttachmentsAmount = useMemo(() => {
        let total:number = 0;
        attachmentStore.attachments.forEach((item:Attachment)=>{
          total += item.attachment;
        })
        return total;        
    }, [attachmentStore])

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
            {attachmentStore.loading && 
            <Loading />
            }
            {(!attachmentStore.loading && attachmentStore.error!=="") && 
            <Error error={attachmentStore.error} />  
            }   
            {(!attachmentStore.loading && attachmentStore.error==="") && 
            <>
            <Row className="mb-2">
                <Col md={9} xs={4}>
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
                
                <Col md={3} xs={8} className="d-flex justify-content-end">
                    {attachmentStore.attachments && 
                        <p data-testid="totalUSD" className='m-auto total_payout'>Total: USD {totalAttachmentsAmount}</p>
                    }
                    <Button onClick={()=>setAction("Add")} className="add-btn">Add</Button>
                </Col>
            </Row>
            <AttachmentsTable 
                attachmentStore={attachmentStore}
                setSelectedAttachment={setSelectedAttachment}
                setAction={setAction}
                referral={referral}
            />

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