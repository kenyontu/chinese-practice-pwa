import React from 'react';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardActionArea
} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {Link} from 'react-router-dom';
import {books} from '../data/index';

const useStyles = makeStyles({
  appBar: {
    zIndex: 100,
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0
  },
  bookTitle: {
    marginTop: '15px',
    marginBottom: '10px'
  },
  bookWordCount: {
    color: '#757575'
  },
  lessonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '10px 15px'
  },
  link: {
    textDecoration: 'none'
  }
});

function Lessons() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">Lessons</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        {books.map(b => (
          <div key={b.id}>
            <Typography
              className={classes.bookTitle}
              variant="h5"
              color="primary"
            >
              {b.name}
            </Typography>
            <Grid container spacing={1}>
              {b.lessons.map(l => (
                <Grid key={l.id} item xs={12} sm={6} md={4}>
                  <Link
                    to={`/lessons/${l.id}/practice`}
                    className={classes.link}
                  >
                    <Card>
                      <CardActionArea className={classes.lessonContainer}>
                        <Typography variant="h6">{l.name}</Typography>
                        <Typography
                          variant="body2"
                          className={classes.bookWordCount}
                        >
                          {`Words: ${l.wordCount}`}
                        </Typography>
                      </CardActionArea>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </div>
        ))}
      </Container>
    </div>
  );
}

export default Lessons;
