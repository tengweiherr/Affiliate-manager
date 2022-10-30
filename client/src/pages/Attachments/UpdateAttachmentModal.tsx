import React, { Dispatch, SetStateAction, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import { Attachment, CreateAttachment } from "../../types";
import { useDispatch } from "react-redux";
import { createAttachment, deleteAttachment, updateAttachment } from "../../store/thunk/attachmentThunk";
import { AsyncThunkAction } from "@reduxjs/toolkit";

type Props = {
  show:boolean,
  setShow:Dispatch<SetStateAction<boolean>>,
  showConfirmDelete:boolean,
  setShowConfirmDelete:Dispatch<SetStateAction<boolean>>,
  action:string,
  setAction:Dispatch<SetStateAction<string>>,
  selectedAttachment:Attachment|undefined,
  setSelectedAttachment:Dispatch<SetStateAction<Attachment|undefined>>
}

const IdChangeEvent = (e:React.ChangeEvent<HTMLInputElement>, action:string, setNewAttachment:Dispatch<SetStateAction<CreateAttachment>>, setSelectedAttachment:Dispatch<SetStateAction<Attachment|undefined>>) => {
    let eventTargetValue = parseFloat(e.target.value);
    if (!isNaN(eventTargetValue)){
        switch (action) {
            case "Add":
                setNewAttachment((prev)=>{
                    return {...prev, tfxi_id: eventTargetValue }
                });
                break;
            case "Edit":
                setSelectedAttachment((prev)=>{
                    return prev && {...prev, tfxi_id: eventTargetValue }
                });
                break;    
            default:
                break;
        }
    }

}

const IdKeyUpEvent = (e:React.KeyboardEvent<HTMLInputElement>, setError:Dispatch<SetStateAction<string>>) => {
    let eventTarget = e.target as HTMLInputElement;
    if (!/^\d{7}$/.test(eventTarget.value))
        setError("Account ID must be a 7 digit number");
    else setError("");
}

const nameChangeEvent = (e:React.ChangeEvent<HTMLInputElement>, action:string, setNewAttachment:Dispatch<SetStateAction<CreateAttachment>>, setSelectedAttachment:Dispatch<SetStateAction<Attachment|undefined>>) => {
    switch (action) {
        case "Add":
            setNewAttachment((prev)=>{
                return {...prev, name: e.target.value }
            });
            break;
        case "Edit":
            setSelectedAttachment((prev)=>{
                return prev && {...prev, name: e.target.value }
            });
            break;    
        default:
            break;
    }
}

const attachmentChangeEvent = (e:React.ChangeEvent<HTMLInputElement>, action:string, setNewAttachment:Dispatch<SetStateAction<CreateAttachment>>, setSelectedAttachment:Dispatch<SetStateAction<Attachment|undefined>>) => {
    switch (action) {
        case "Add":
            setNewAttachment((prev)=>{
                return {...prev, attachment: parseInt(e.target.value) }
            });
            break;
        case "Edit":
            setSelectedAttachment((prev)=>{
                return prev && {...prev, attachment: parseInt(e.target.value) }
            });
            break;    
        default:
            break;
    }
}

const dateChangeEvent = (value:Date, action:string, setNewAttachment:Dispatch<SetStateAction<CreateAttachment>>, setSelectedAttachment:Dispatch<SetStateAction<Attachment|undefined>>) => {
    switch (action) {
        case "Add":
            setNewAttachment((prev)=>{
                return {...prev, join_date:value.toString()};
            }) ;
            break;
        case "Edit":
            setSelectedAttachment((prev)=>{
                return prev && {...prev, join_date:value.toString()};
            }) ;
            break;    
        default:
            break;
    }  
}

const referralChangeEvent = (e:React.ChangeEvent<HTMLSelectElement>, action:string, setNewAttachment:Dispatch<SetStateAction<CreateAttachment>>, setSelectedAttachment:Dispatch<SetStateAction<Attachment|undefined>>) => {
    switch (action) {
        case "Add":
            setNewAttachment((prev)=>{
                return {...prev, referral: e.target.value }
            });
            break;
        case "Edit":
            setSelectedAttachment((prev)=>{
                return prev && {...prev, referral: e.target.value }
            });
            break;    
        default:
            break;
    }
}

const fundChangeEvent = (e:React.ChangeEvent<HTMLInputElement>, action:string, setNewAttachment:Dispatch<SetStateAction<CreateAttachment>>, setSelectedAttachment:Dispatch<SetStateAction<Attachment|undefined>>) => {
    switch (action) {
        case "Add":
            setNewAttachment((prev)=>{
                return {...prev, fund: e.target.value }
            });
            break;
        case "Edit":
            setSelectedAttachment((prev)=>{
                return prev && {...prev, fund: e.target.value }
            });
            break;    
        default:
            break;
    }
}

const handleClose = (setShow:Dispatch<SetStateAction<boolean>>,setSelectedAttachment:Dispatch<SetStateAction<Attachment|undefined>>, setAction:Dispatch<SetStateAction<string>>) => {
    setShow(false);
    setSelectedAttachment(undefined);
    setAction("");
};

const handleDelete = (selectedAttachment:Attachment|undefined, dispatch:Dispatch<AsyncThunkAction<any,Attachment,{}>>) => {
    if(selectedAttachment)dispatch(deleteAttachment(selectedAttachment))
}

//handle submit func
const handleSubmit = (action:string, newAttachment:CreateAttachment,selectedAttachment:Attachment|undefined, dispatch:Dispatch<AsyncThunkAction<any,Attachment|CreateAttachment,{}>>) => {
    switch (action) {
        case "Edit":
            selectedAttachment && dispatch(updateAttachment(selectedAttachment))
            break;
        case "Add":
            dispatch(createAttachment(newAttachment))
            break;        
        default:
            break;
    }
}

const UpdateAttachmentModal = ({show,setShow,showConfirmDelete,setShowConfirmDelete,action,setAction,selectedAttachment,setSelectedAttachment}:Props) => {

    const dispatch = useDispatch();
    const [newAttachment, setNewAttachment] = useState<CreateAttachment>({
        name: '', 
        tfxi_id: 0, 
        attachment: 1000, 
        referral: 'dawson', 
        fund: 'GMC', 
        join_date: new Date().toString()
    })
    const [error, setError] = useState<string>("");

    return(
        <>
            <Modal
                show={show}
                onHide={()=>handleClose(setShow,setSelectedAttachment,setAction)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                <Modal.Title>{action}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                <Form.Group className="mb-3" controlId="tfxi_id">
                        <Form.Label>TFXI ID</Form.Label>
                        <Form.Control type="number" placeholder="TFXI ID" 
                        value={selectedAttachment?.tfxi_id} 
                        onChange={(e:any) => IdChangeEvent(e,action,setNewAttachment,setSelectedAttachment)}
                        onKeyUp={(e:any)=>IdKeyUpEvent(e,setError)}/>
                        {error !== "" &&
                            <p className="error-text">{error}</p>                      
                        }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" 
                            value={action==="Edit" ? selectedAttachment?.name : newAttachment.name} 
                            onChange={(e:any) => nameChangeEvent(e,action,setNewAttachment,setSelectedAttachment)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="attachment">
                        <Form.Label>Attachment</Form.Label>
                        <Form.Control type="number" min={0} step={1000} placeholder="Attachment" 
                            value={action==="Edit" ? selectedAttachment?.attachment : newAttachment.attachment} 
                            onChange={(e:any) => attachmentChangeEvent(e,action,setNewAttachment,setSelectedAttachment)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="join_date">
                        <Form.Label>Join At</Form.Label>
                        <DateTimePicker 
                            onChange={(value:Date) => dateChangeEvent(value,action,setNewAttachment,setSelectedAttachment)} 
                            value={action==="Edit" ? (selectedAttachment && new Date(selectedAttachment.join_date)) : new Date(newAttachment.join_date)} 
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="referral">
                        <Form.Label>Referral</Form.Label>
                        <Form.Control as="select" placeholder="Referral" name="Referral" 
                            value={action==="Edit" ? selectedAttachment?.referral : newAttachment.referral} 
                            onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>referralChangeEvent(e,action,setNewAttachment,setSelectedAttachment)}>
                        <option value="dawson">Dawson</option>
                        <option value="khoo">Khoo</option>
                        <option value="weiherr">Weiherr</option>
                        <option value="xiaofei">Xiaofei</option>
                        <option value="jasper">Jasper</option>
                        <option value="self">Self</option>
                        <option value="others">Others</option>
                        </Form.Control>          
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="fund">
                        <Form.Label>Fund Invested</Form.Label>
                        <Form.Control as="select" placeholder="Fund" name="Fund" 
                            value={action==="Edit" ? selectedAttachment?.fund : newAttachment.fund} 
                            onChange={(e:any) => fundChangeEvent(e,action,setNewAttachment,setSelectedAttachment)}>
                        <option value="GMC">GMC</option>
                        <option value="GMC PAMM">GMC PAMM</option>
                        <option value="Takami">Takami</option>
                        </Form.Control>         
                    </Form.Group>
                    <Button className="submit-btn" 
                        onClick={()=>{
                            handleSubmit(action, newAttachment, selectedAttachment, dispatch);
                            handleClose(setShow, setSelectedAttachment, setAction);
                        }}
                    >Submit</Button>
                    <Button variant="secondary" className="close-btn mx-2" onClick={()=>handleClose(setShow, setSelectedAttachment, setAction)}>Close</Button>
                </Form>
                </Modal.Body>
            </Modal>        
        <Modal show={showConfirmDelete} onHide={()=>setShowConfirmDelete(false)}>
            <Modal.Body>
                <p>Confirm to delete?</p>
                <p>{selectedAttachment?.tfxi_id}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>setShowConfirmDelete(false)}>Close</Button>
                <Button variant="primary" 
                    onClick={()=>{
                        handleDelete(selectedAttachment,dispatch);
                        setShowConfirmDelete(false);
                    }}
                >Save changes</Button>
            </Modal.Footer>
        </Modal>
        </>

    )
}

export default UpdateAttachmentModal;