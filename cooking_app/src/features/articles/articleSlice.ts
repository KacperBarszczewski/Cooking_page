import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ArticleDocument } from "./models/Article";
import articleService from "./services/article.service";

export{}

interface AsyncState {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
  }
  
  interface ArticleState extends AsyncState {
    articles: ArticleDocument[]
  }
  
  const initialState: ArticleState = {
    articles: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
  };
  
  export const getArticles = createAsyncThunk('article',async()=>{
    try {
      
        return await articleService.getArticles();
        
    } catch (error) {

        console.log('Error: ',error)
        
    }
  });

export const articleSlice=createSlice({
    name: 'article',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getArticles.pending,(state)=>{
            state.isLoading=true
        })

        .addCase(getArticles.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.articles= action.payload?.data || [];
        })

        .addCase(getArticles.rejected,(state)=>{
            state.isLoading=false;
            state.isError=true;
            state.articles= [];
        });
    }
});

export default articleSlice.reducer;
