import axios from "axios"
import { CommentDocument } from "../model/Comment"


const getComments = async (article_id: string) => {
    const response = await axios.get<CommentDocument[]>(
       `${process.env.REACT_APP_BASE_API}/comment/${article_id}`
    )

    return response;
};

const sendComment = async (comment: CommentDocument): Promise<null> => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_API}/comment`,
      comment
    );
  
    return response.data;
  };

const commentService = {
    getComments,
    sendComment
}

export default commentService;