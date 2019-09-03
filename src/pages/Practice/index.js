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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import FilterListIcon from '@material-ui/icons/FilterList';

import {getWordsByLesson} from '../../data/index';
import useRandomIndex from '../../hooks/useRandomIndex';
import Detail from './Detail';
import FilterWordsDialog from '../../components/FilterWordsDialog';
import styles from './index.module.css';

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

function Practice({match, history}) {
  const lessonId = match.params.lesson_id;
  const words = getWordsByLesson(match.params.lesson_id);

  const [mode, setMode] = useSelectedMode(0);
  const [hidden, setHidden] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hiddenFields, setHiddenFields] = useState(hiddenFieldsByMode[mode]);
  const {currentIndex, toNextIndex} = useRandomIndex(words.length);

  useEffect(() => {
    setHiddenFields(hiddenFieldsByMode[mode]);
  }, [mode]);

  const currentWord = words[currentIndex];

  const handleRevealClick = () => {
    setHidden(false);
  };

  const handleNextClick = () => {
    setHidden(true);
    setTimeout(toNextIndex, 0);
  };

  const handleFilterClick = () => {
    setIsFilterOpen(true);
  };

  const handleFilterClose = () => {
    setIsFilterOpen(false);
  };

  const onModeChange = (event, newMode) => {
    setMode(newMode);
    setHiddenFields(hiddenFieldsByMode[newMode]);
  };

  return (
    <div className={styles.root}>
      <FilterWordsDialog open={isFilterOpen} onClose={handleFilterClose} />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={history.goBack}>
            <ArrowBackIcon />
          </IconButton>

          <Typography variant="h6" className={styles.title}>
            {lessonId} practice
          </Typography>

          <IconButton edge="start" color="inherit" onClick={handleFilterClick}>
            <FilterListIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" className={styles.container}>
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
            className={styles.button}
            onClick={handleRevealClick}
          >
            <VisibilityOffIcon />
          </Fab>
        ) : (
          <Fab
            color="primary"
            size="large"
            className={styles.button}
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
