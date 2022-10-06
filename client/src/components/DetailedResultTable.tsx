import React, { Dispatch, SetStateAction, useState } from "react";
import { Form, Table } from 'react-bootstrap';
import { ArrayOfAttachments, Attachment } from "../types";
import AttachmentModal from "./AttachmentModal";

type Props = {
    filteredAttachments:ArrayOfAttachments,
    all:ArrayOfAttachments,
    setAll:Dispatch<SetStateAction<ArrayOfAttachments>>,
    rate:number,
    decimal:number,
    commission:number,
    includeCommission:boolean,
    includeMonthlyReferralReward:boolean,
}

const EditIcon = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
      </svg>
    );
}

const handleChecked = (e:React.ChangeEvent<HTMLInputElement>,attachment:Attachment,setAll:Dispatch<SetStateAction<ArrayOfAttachments>>) => {
    setAll((prev)=>
        prev.map((item:Attachment)=>{
            if(item._id === attachment._id)
                return {...item, checked:e.target.checked}
            else return item
    }))
}

const handleEditing = (attachment:Attachment, setShow:Dispatch<SetStateAction<boolean>>, setEditingAttachment:Dispatch<SetStateAction<Attachment|undefined>>) => {
    setShow(true);
    setEditingAttachment(attachment);
}

const DetailedResultTable = ({filteredAttachments,all,setAll,rate,decimal,commission,includeCommission,includeMonthlyReferralReward}:Props) => {

    const [show, setShow] = useState<boolean>(false);
    //modal
    const [editingAttachment, setEditingAttachment] = useState<Attachment|undefined>();

  return(
    <Table hover responsive="md" className="detail" data-testid="attachmentsTable">
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
            <th className={`commission ${includeCommission}`}>
                Commission
            </th>
            <th className={`referralReward ${includeMonthlyReferralReward}`}>
                Referral Reward
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
        {filteredAttachments.length === 0 ?
        <tr>No result found.</tr>
        : 
        <>
        {filteredAttachments.map((attachment:Attachment, index:number)=>(
            <tr data-testid="attachmentsRow" key={index} className={attachment.checked?`${attachment.referral}`:`${attachment.referral + " " + attachment.checked}`}>
                <td className='tfxi_id'>
                    {attachment.tfxi_id}
                </td>
                <td className='name'>
                    {attachment.name}
                </td>
                <td className='attachment'>
                    {attachment.attachment*(rate)}
                </td>
                <td className='join-at'>
                    {attachment.join_date.split('T')[0]}
                </td>
                <td className={`commission ${includeCommission}`}>
                    {attachment.commission? attachment.commission.toFixed(decimal) : ((commission*attachment.attachment/1000)*rate).toFixed(decimal)}                 
                </td>
                <td className={`monthlyReferralReward ${includeMonthlyReferralReward}`}>
                    {attachment.monthly_referral_reward.toFixed(decimal)}
                </td>
                <td className='referral'>
                    {attachment.referral.charAt(0).toUpperCase() + attachment.referral.slice(1)}
                </td>
                <td className='action'>
                    <button className="edit" onClick={()=>handleEditing(attachment, setShow, setEditingAttachment)}>
                        <EditIcon/>
                    </button>
                    <Form.Check 
                        type="checkbox"
                        id="default-checkbox"
                        className="d-flex justify-content-center align-items-center"
                        checked={attachment.checked}
                        onChange={(e)=>handleChecked(e,attachment,setAll)}
                    />
                </td>
            </tr>

        ))}
        </>
        }

    </tbody>
    {editingAttachment && 
    <AttachmentModal 
        show={show}
        setShow={setShow}
        editingAttachment={editingAttachment}
        setEditingAttachment={setEditingAttachment}
        decimal={decimal}
        commission={commission}
        rate={rate}
        all={all}
        setAll={setAll}
    />      
    }
</Table>    
  );
}

export default DetailedResultTable;