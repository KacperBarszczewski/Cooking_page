import axios from "axios"
import { ArticleDocument } from "../models/Article"

const getArticles = async () => {
    const response = await axios.get<ArticleDocument[]>(
       `${process.env.REACT_APP_BASE_API}/article` 
    )

    return response;
};

const articleService = {
    getArticles,
}

export default articleService;