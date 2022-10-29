import { createAsyncThunk } from "@reduxjs/toolkit";
import { ArrayOfAttachments, Attachment, CreateAttachment } from "../../types";
import * as API from '../../api';

type RejectError = {
  message: string;
};

//will generate pending, fulfilled, and rejected action types
export const fetchAttachments = createAsyncThunk(
    'attachment/fetchAttachments',
    (referral:string,{signal})=> API.fetchAttachments(referral,signal) as Promise<ArrayOfAttachments>)

//another way to type your data
export const createAttachment = createAsyncThunk<Attachment,CreateAttachment,{rejectValue:RejectError}>(
    'attachment/createAttachment',
    (attachment,{rejectWithValue})=> API.createAttachment(attachment))

export const updateAttachment = createAsyncThunk(
    'attachment/updateAttachment',
    (attachment:Attachment)=> API.updateAttachment(attachment) as Promise<Attachment>)
  
export const deleteAttachment = createAsyncThunk(
    'attachment/deleteAttachment',
    (attachment:Attachment)=> API.deleteAttachment(attachment) as Promise<Attachment>)