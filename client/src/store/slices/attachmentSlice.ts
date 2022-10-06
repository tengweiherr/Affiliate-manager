import { createSlice } from "@reduxjs/toolkit";
import { Attachment, ArrayOfAttachments } from "../../types";
import { calculateYearDifference } from "../../math";
import { fetchAttachments, createAttachment, updateAttachment, deleteAttachment } from "../thunk/attachmentThunk";

const initialState = {
  attachments:[] as ArrayOfAttachments,
  loading:false as boolean,
  error:'' as string
}


export const attachmentSlice = createSlice({
  name: "attachment",
  initialState: initialState,
  extraReducers: (builder) => {
    //fetch
    builder
      .addCase(fetchAttachments.pending, (state)=>{
        state.loading = true;
      })
      .addCase(fetchAttachments.fulfilled, (state,action)=>{
        state.loading = false;
        state.error = '';
        state.attachments = action.payload.map((item:Attachment) => ({
          ...item,
          checked: true,
          monthly_referral_reward: ( item.fund !== "Takami" && calculateYearDifference(item.join_date) < 1 ) ? (50/12)*(item.attachment/1000) : 0
      }));
      })
      .addCase(fetchAttachments.rejected, (state,action)=>{
        state.loading = false;
        state.attachments = [];
        state.error = action.error.message || '';
      })
      //create
      .addCase(createAttachment.pending, (state)=>{
        state.loading = true;
      })
      .addCase(createAttachment.fulfilled, (state,action)=>{
        state.loading = false;
        state.error = '';
        state.attachments.push(action.payload);
      })
      .addCase(createAttachment.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.error.message || '';
      })
      //update
      .addCase(updateAttachment.pending, (state)=>{
        state.loading = true;
      })
      .addCase(updateAttachment.fulfilled, (state,action)=>{
        state.loading = false;
        state.error = '';
        state.attachments = state.attachments.map((attachment) => attachment?._id === action.payload._id ? action.payload : attachment);
      })
      .addCase(updateAttachment.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.error.message || '';
      })
      //delete
      .addCase(deleteAttachment.pending, (state)=>{
        state.loading = true;
      })
      .addCase(deleteAttachment.fulfilled, (state,action)=>{
        state.loading = false;
        state.error = '';
        state.attachments = state.attachments.filter((attachment) => attachment?._id !== action.payload._id);
      })
      .addCase(deleteAttachment.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.error.message || '';
      })
  },
  reducers: {
    reset: (state, action) => {
      state.attachments = [];
      state.loading = false;
      state.error = '';
    },

    // create: (state, action) => {
    //   if(action.payload)
    //    state.attachments = action.payload;
    // },

    // update: (state, action) => {
    //   if(action.payload)
    //    state.attachments = state.attachments.map((attachment) => attachment?._id === action.payload._id ? action.payload : attachment);
    // },

    // remove: (state, action) => {
    //   if(action.payload)
    //     state.attachments = state.attachments.filter((attachment) => attachment?._id !== action.payload);
    // }

  },
});

export const { reset } = attachmentSlice.actions;

// export const getObject = (state: AppState) => state.object;

export default attachmentSlice.reducer;