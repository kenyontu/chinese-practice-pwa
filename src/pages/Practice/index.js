import React, {useState, useEffect} from 'react';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  IconButton,
  BottomNavigation,
  BottomNavigationAction,
  Fab
} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import {getWordsByLesson} from '../../data/index';
import useRandomIndex from '../../hooks/useRandomIndex';
import Detail from './Detail';

const hiddenFieldsByMode = {
  0: {
    name: false,
    piyin: true,
    description: true
  },
  1: {
    name: true,
    piyin: false,
    description: false
  }
};

const speech = new SpeechSynthesisUtterance();
speech.lang = 'zh-CN';

const useStyles = makeStyles(theme => ({
  backArrowLink: {
    color: 'inherit'
  },
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    display: 'relative',
    transform: 'translateY(50%)',
    zIndex: 1400
  }
}));

function Practice({match, history}) {
  const lessonId = match.params.lesson_id;
  const words = getWordsByLesson(match.params.lesson_id);

  const [mode, setMode] = useSelectedMode(0);
  const [hidden, setHidden] = useState(true);
  const [hiddenFields, setHiddenFields] = useState(hiddenFieldsByMode[mode]);
  const classes = useStyles();
  const {currentIndex, toNextIndex} = useRandomIndex(words.length);

  const currentWord = words[currentIndex];

  const handleRevealClick = () => {
    setHidden(false);
  };

  const handleNextClick = () => {
    setHidden(true);
    setTimeout(toNextIndex, 0);
  };

  const onModeChange = (event, newMode) => {
    setMode(newMode);
    setHiddenFields(hiddenFieldsByMode[newMode]);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={history.goBack}>
            <ArrowBackIcon />
          </IconButton>

          <Typography variant="h6">{lessonId} practice</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" className={classes.container}>
        {currentWord && (
          <Detail
            word={currentWord}
            hideName={hiddenFields.name && hidden}
            hidePiyin={hiddenFields.piyin && hidden}
            hideDescription={hiddenFields.description && hidden}
          />
        )}
        {hidden ? (
          <Fab
            color="secondary"
            size="large"
            className={classes.button}
            onClick={handleRevealClick}
          >
            <VisibilityOffIcon />
          </Fab>
        ) : (
          <Fab
            color="primary"
            size="large"
            className={classes.button}
            onClick={handleNextClick}
          >
            <SkipNextIcon />
          </Fab>
        )}
      </Container>
      <BottomNavigation value={mode} onChange={onModeChange} showLabels>
        <BottomNavigationAction
          color="primary"
          label="Reading"
          icon={<LocalLibraryIcon />}
        />
        <BottomNavigationAction
          color="primary"
          label="Writing"
          icon={<EditIcon />}
        />
      </BottomNavigation>
    </div>
  );
}

const useSelectedMode = initialMode => {
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    const savedMode = localStorage.getItem('selectedDetailMode');
    if (savedMode) {
      setMode(parseInt(savedMode));
    }
  }, []);

  return [
    mode,
    newMode => {
      localStorage.setItem('selectedDetailMode', newMode.toString());
      setMode(newMode);
    }
  ];
};

export default Practice;
