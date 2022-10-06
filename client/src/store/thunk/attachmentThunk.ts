import { createAsyncThunk } from "@reduxjs/toolkit";
import { Attachment, CreateAttachment } from "../../types";
import * as API from '../../api';

//will generate pending, fulfilled, and rejected action types
export const fetchAttachments = createAsyncThunk(
    'attachment/fetchAttachments',
    (referral:string,{signal})=>{
      return API.fetchAttachments(referral,signal)
    })
  
  //will generate pending, fulfilled, and rejected action types
  export const createAttachment = createAsyncThunk(
    'attachment/createAttachment',
    (attachment:CreateAttachment)=>{
      return API.createAttachment(attachment)
  })
  
  //will generate pending, fulfilled, and rejected action types
  export const updateAttachment = createAsyncThunk(
    'attachment/updateAttachment',
    (attachment:Attachment)=>{
      return API.updateAttachment(attachment)
  })
  
  //will generate pending, fulfilled, and rejected action types
  export const deleteAttachment = createAsyncThunk(
    'attachment/deleteAttachment',
    (attachment:Attachment)=>{
      return API.deleteAttachment(attachment)
  })