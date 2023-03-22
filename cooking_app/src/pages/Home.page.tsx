import { useEffect } from "react";
import { getArticles } from "../features/articles/articleSlice";
import ArticleComponent from "../features/articles/components/Article.component";
import HeaderComponent from "../features/articles/components/Header.component";
import { logout } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks/input/redux/hooks"

const HomePage=()=>{

    const dispatch = useAppDispatch();

    const {articles} = useAppSelector((state) => state.article);
  
    useEffect(() => {
      dispatch(getArticles());
    }, []);



    return(
        <div>
            <HeaderComponent />
            <div
                style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '48px',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '48px',
                }}
            >
                    {articles.length > 0 && articles.map((article) => (
                    <ArticleComponent key={article._id} article={article} />
                ))}
            </div>
        </div>
    )
}

export default HomePage