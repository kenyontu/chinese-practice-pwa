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
import {Link} from 'react-router-dom';
import {books} from '../data/index';
import lessonsStyles from './Lessons.module.css';

function Lessons() {
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
              className={lessonsStyles.bookTitle}
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
                    className={lessonsStyles.link}
                  >
                    <Card>
                      <CardActionArea className={lessonsStyles.lessonContainer}>
                        <Typography variant="h6">{l.name}</Typography>
                        <Typography
                          variant="body2"
                          className={lessonsStyles.bookWordCount}
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
