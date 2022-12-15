import { Box, Button, Grid, InputLabel, TextField } from "@mui/material";
import { FC, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/input/redux/hooks";
import useInput from "../../hooks/input/use-input";
import { ArticleDocument } from "../articles/models/Article";
import { selectedUser } from "../auth/authSlice";
import { getComments, reset, sendComment } from "./commentSlice";
import { CommentDocument } from "./model/Comment";
import { NewComment } from "./model/NewComment";

interface ArticleComponentProps {
    article: ArticleDocument;
  }

interface CommentComponentProps{
    comment: CommentDocument;
}

const CommentComponent: FC <ArticleComponentProps>=({ article })=>{

    const { comments } = useAppSelector((state) => state.comment);

    useEffect(() => {
        dispatch(getComments(article._id));
      }, []);

      let qty = 0;

      //comments.forEach(comment => {comment.text});

      //const commentItem = comments.()    
    const{
        text: text,
        clearHandler: textClearHandler,
        textChangeHandler: textChangeHandler,
        inputBlurHandler: textBlurHandler,
    } = useInput()

    let name=useAppSelector(selectedUser).user?.name
    
    const{
        text: article_id

    } = useInput()
    
    
    const clearForm = () => {
        textClearHandler();
    };
    
    const dispatch = useAppDispatch();
    
    
    const navigate = useNavigate();

    const { isSuccess } = useAppSelector((state) => state.comment);
    
    useEffect(() => {
        if (isSuccess) {
          dispatch(reset());
          clearForm();
        }
    }, [isSuccess, dispatch]);
    
    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let article_id= article._id;
        
        if(text.length===0)return;

        if(name==null)return;

        const newComment: NewComment = {
            name,text,article_id
        }

        console.log(newComment);
        dispatch(sendComment(newComment));
    };
    
    //if (isLoading)return <CircularProgress sx={{ marginTop: '64px' }} color='primary' />;


    return (
        <Box
            sx={{
                border:1,
                padding:2,
                borderColor:'#cccccc',
                marginTop:2
            }}
        >
                {comments.length > 0 && comments.map((comment) => (
                    <Box
                    sx={{
                        border:1,
                        padding:0.2,
                        borderColor:'#cccccc',
                        marginTop:0.5
                    }}>
                        <Box sx={{marginTop:0.2,marginLeft:5}}><h5>{comment.name}</h5></Box>
                        <Box sx={{textAlign:'center',marginBottom:3}}>{comment.text}</Box>

                    </Box>
                ))
                }
                
           


            <form onSubmit={onSubmitHandler}>
                <Grid container direction='column' justifyContent='flex-start'>

                    <InputLabel sx={{fontWeight:500, marginTop:1, color:'#000000'}} htmlFor='email'>skomentuj</InputLabel>
                    <TextField 
                        value={text}
                        onChange={textChangeHandler}
                        onBlur={textBlurHandler}

                        type={'text'} 
                        name='text' 
                        id='text' 
                        variant='outlined' 
                        size='small'
                    />

                    <Button 
                        variant='contained' 
                        style={{
                            marginTop:'16px',
                            height:'31px',
                            backgroundColor:'#1315', 
                            color:'black',
                            borderColor:'#000000',
                            textTransform:'none'
                        }} 
                        type='submit'
                    >
                        Wyślij
                    </Button>
                </Grid>
            </form>

        </Box>
    )
}

export default CommentComponent