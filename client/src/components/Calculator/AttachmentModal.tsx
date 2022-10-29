import React, { Dispatch, SetStateAction } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ArrayOfAttachments, Attachment } from "../../types";

type Props = {
    show:boolean,
    setShow:Dispatch<SetStateAction<boolean>>,
    editingAttachment:Attachment|undefined,
    setEditingAttachment:Dispatch<SetStateAction<Attachment|undefined>>,
    decimal:number,
    commission:number,
    rate:number,
    all:ArrayOfAttachments,
    setAll:Dispatch<SetStateAction<ArrayOfAttachments>>,
}

const commissionChangeEvent = (event:React.ChangeEvent<HTMLInputElement>, decimal:number, editingAttachment:Attachment|undefined, setEditingAttachment:Dispatch<SetStateAction<Attachment|undefined>>) => {
    if(editingAttachment){
        let eventTargetValue = parseFloat(event.target.value).toFixed(decimal);
        setEditingAttachment({...editingAttachment, commission:parseFloat(eventTargetValue)});
    }
}

const referralRewardChangeEvent = (event:React.ChangeEvent<HTMLInputElement>, decimal:number, editingAttachment:Attachment|undefined, setEditingAttachment:Dispatch<SetStateAction<Attachment|undefined>>) => {
    if(editingAttachment){
        let eventTargetValue = parseFloat(event.target.value).toFixed(decimal);
        setEditingAttachment({...editingAttachment, monthly_referral_reward:parseFloat(eventTargetValue)});
    }
}
const handleModalSubmit = (editingAttachment:Attachment|undefined, setAll:Dispatch<SetStateAction<ArrayOfAttachments>>, setShow:Dispatch<SetStateAction<boolean>>) => {
    if(editingAttachment){
        setAll((prev)=>
            prev.map((attachment:Attachment) => {
                if(attachment._id===editingAttachment._id)
                    return editingAttachment;
                else return attachment;
            }));
    }
    setShow(false);
}

const AttachmentModal = ({show,setShow,editingAttachment,setEditingAttachment,decimal,commission,rate,all,setAll}:Props) => {

  return (
    <Modal show={show} onHide={()=>setShow(false)}>
        <Modal.Header>
            <Modal.Title>Edit Info</Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-4'>
            <Form>
                {/* <Form.Group className="mb-3" controlId="tfxi_id">
                    <Form.Label>TFXI ID</Form.Label>
                    <Form.Control type="number" placeholder="TFXI ID" value={editingAttachment?.tfxi_id} readOnly disabled/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" value={editingAttachment?.name} readOnly disabled/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="attachment">
                    <Form.Label>Attachment</Form.Label>
                    <Form.Control type="number" placeholder="Attachment" value={editingAttachment?.attachment} readOnly disabled/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="join_date">
                    <Form.Label>Join At</Form.Label>
                    <Form.Control type="text" placeholder="Join At" value={editingAttachment?.join_date} readOnly disabled/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="referral">
                    <Form.Label>Referral</Form.Label>
                    <Form.Control type="text" placeholder="Referral" name="Referral" value={editingAttachment?.referral} readOnly disabled/>
                </Form.Group> */}
                <Form.Group className="mb-3" controlId="commission">
                    <Form.Label>New Commission</Form.Label>
                    <Form.Control type="number" min={0} step={1} placeholder="New Commission" 
                    value={editingAttachment?.commission? editingAttachment.commission.toFixed(decimal) : ((commission*(editingAttachment?.attachment ? editingAttachment?.attachment : 0)/1000)*rate).toFixed(decimal)}
                    onChange={(e:any)=>commissionChangeEvent(e,decimal,editingAttachment,setEditingAttachment)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="referral_reward">
                    <Form.Label>New Monthly Referral Reward</Form.Label>
                    <Form.Control type="number" min={0} step={10} placeholder="New Monthly Referral Reward"
                    value={editingAttachment?.monthly_referral_reward.toFixed(decimal)}
                    onChange={(e:any)=>referralRewardChangeEvent(e,decimal,editingAttachment,setEditingAttachment)}
                    />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="fund">
                    <Form.Label>Fund Invested</Form.Label>
                    <Form.Control type="text" placeholder="Fund" name="Fund" value={editingAttachment?.fund} readOnly disabled/>      
                </Form.Group> */}
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={()=>handleModalSubmit(editingAttachment, setAll, setShow)}>
                Submit
            </Button>
            <Button variant="secondary" onClick={()=>setShow(false)}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>  
  );
}

export default AttachmentModal;