import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { CommentDocument } from "./model/Comment";
import commentService from "./services/comment.service";


export{}

interface AsyncState {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
  }
  
  interface CommentState extends AsyncState {
    comments: CommentDocument[]
  }
  
  const initialState: CommentState = {
    comments: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
  };
  
  export const getComments = createAsyncThunk('comment/',async(article_id: string)=>{
    try {
      
        return await commentService.getComments(article_id);
        
    } catch (error) {

        console.log('Error: ',error)  
    }
  });

  export const sendComment = createAsyncThunk(
    'comment',
    async (comment: CommentDocument, thunkAPI) => {
      try {
        return await commentService.sendComment(comment);
      } catch (error) {
        return thunkAPI.rejectWithValue('Błąd w komentarzu');
      }
    }
  );

export const commentSlice=createSlice({
    name: 'comment',
    initialState,
    reducers:{
      reset: (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
      },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getComments.pending,(state)=>{
            state.isLoading=true
        })

        .addCase(getComments.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.comments= action.payload?.data || [];
        })

        .addCase(getComments.rejected,(state)=>{
            state.isLoading=false;
            state.isError=true;
            state.comments= [];
        });
    }
});

export const selectedComment = (state: RootState) => {
  return state.comment;
};

export const { reset } = commentSlice.actions;
export default commentSlice.reducer;