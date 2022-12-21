import { Box } from "@mui/material"
import { FC } from "react";
import { CommentDocument } from "./model/Comment";


interface CommentComponentProps{
    comment: CommentDocument;
}

const CommentComponent:FC<CommentComponentProps>=({comment})=>{



    return(
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
    )
}

export default CommentComponent