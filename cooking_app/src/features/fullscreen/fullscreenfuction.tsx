import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { FC } from 'react';
import { ArticleDocument } from '../articles/models/Article';
import { Card, CardMedia, Typography } from '@mui/material';
import { CommentDocument } from '../comments/model/Comment';
import CommentComponent from '../comments/commentfunction';

interface ArticleComponentProps {
  article: ArticleDocument;
}

interface CommentComponentProps {
  article: CommentDocument;
}


const ResponsiveDialog:FC<ArticleComponentProps> = ({ article }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Więcej
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        style={{width:"100%"}}
      >
        <Card
          sx={{
            maxWidth: 400,
            margin: "0 auto",
            padding: "0.1em",
          }}
        >
        { article.image?(
        <CardMedia
        component='img'
        height='300'
        image={article.image}
        alt=''
      />
      ):(
        <Typography height={200} textAlign={'center'} variant='h5' component='div'>
          Brak zdjęcia
        </Typography>
      )
      }
      </Card>

        <DialogTitle id="responsive-dialog-title">
          {article.title}
        </DialogTitle>
        <DialogContent>
        <DialogContentText sx={{paddingBottom:"1em"}}>
            Składniki: { article.ingredients.toString().replace(',',', ') }
          </DialogContentText>
          <DialogContentText>
            {article.description}
          </DialogContentText>
          <CommentComponent key={article._id} article={article}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Zamknij
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default  ResponsiveDialog;