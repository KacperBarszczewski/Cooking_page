import { FC } from 'react';

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@mui/material';
import { ArticleDocument } from '../models/Article';
import { useAppDispatch, useAppSelector } from '../../../hooks/input/redux/hooks';


interface ArticleComponentProps {
  article: ArticleDocument;
}

const ArticleComponent: FC<ArticleComponentProps> = ({ article }) => {
  const dispatch = useAppDispatch();

  const { articles } = useAppSelector((state) => state.article);

  let qty = 0;

  const articleItem = articles.find((item) => item._id === article._id);


  return (
    <Card sx={{ width: 300, minWidth: 300 }}>
      { article.image?(
        <CardMedia
        component='img'
        height='200'
        image={article.image}
        alt=''
      />
      ):(
        <Typography height={200} textAlign={'center'} variant='h5' component='div'>
          Brak zdjęcia
        </Typography>
      )
      }

      <CardContent >
        <Typography gutterBottom variant='h5' component='div'>
          {article.title}
        </Typography>
        {article.description && (
          <Typography variant='body2' color='text.secondary'>
            {article.description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ArticleComponent;