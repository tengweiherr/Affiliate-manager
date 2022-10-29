import { AnyAction, AsyncThunk, createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { Attachment, ArrayOfAttachments } from "../../types";
import { calculateYearDifference } from "../../math";
import { fetchAttachments, createAttachment, updateAttachment, deleteAttachment } from "../thunk/attachmentThunk";

const initialState = {
  attachments:[] as ArrayOfAttachments,
  loading:false as boolean,
  error:'' as string
}

type GenericAsyncThunk = AsyncThunk<unknown,unknown,any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

type Modify<T, R> = Omit<T, keyof R> & R;
type ModifiedRejectedAction = Modify<RejectedAction,{
  error:SerializedError
}>

function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith('/pending')
}

function isFulfilledAction(action: AnyAction): action is FulfilledAction {
  return action.type.endsWith('/fulfilled')
}

function isRejectedAction(action: AnyAction): action is ModifiedRejectedAction {
  return action.type.endsWith('/rejected')
}

export const attachmentSlice = createSlice({
  name: "attachment",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      //fetch
      .addCase(fetchAttachments.fulfilled, (state,action)=>{
        state.attachments = action.payload.map((item:Attachment) => ({
          ...item,
          checked: true,
          monthly_referral_reward: ( item.fund !== "Takami" && calculateYearDifference(item.join_date) < 1 ) ? (50/12)*(item.attachment/1000) : 0
      }));
      })
      //create
      .addCase(createAttachment.fulfilled, (state,action)=>{
        state.attachments.push(action.payload);
      })
      //update
      .addCase(updateAttachment.fulfilled, (state,action)=>{
        state.attachments = state.attachments.map((attachment) => attachment?._id === action.payload._id ? action.payload : attachment);
      })
      //delete
      .addCase(deleteAttachment.fulfilled, (state,action)=>{
        state.attachments = state.attachments.filter((attachment) => attachment?._id !== action.payload._id);
      })
      .addMatcher(isPendingAction,(state,action)=>{
        state.loading = true;
      })
      .addMatcher(isFulfilledAction,(state,action)=>{
        state.loading = false;
        state.error = '';
      })
      .addMatcher(isRejectedAction,(state,action)=>{
        state.loading = false;
        state.error = action.error.message || '';
      })
  },
  reducers: {
    reset: (state) => {
      state.attachments = [];
      state.loading = false;
      state.error = '';
    },

  },
});

export const { reset } = attachmentSlice.actions;

// export const getObject = (state: AppState) => state.object;

export default attachmentSlice.reducer;