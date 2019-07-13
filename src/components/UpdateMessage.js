import React from 'react';
import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

import {useUpdateContext} from '../context/updateContext';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed',
    bottom: 0,
    backgroundColor: '#333',
    color: 'white',
    width: '100%',
    padding: '1rem 1.5rem',
    boxSizing: 'border-box',
    zIndex: 9999,
    transform: ({isVisible}) => (isVisible ? 'scale(1)' : 'scale(0)'),
    '@media screen and (min-width: 481px)': {
      width: '450px',
      margin: '0 auto',
      left: 0,
      right: 0,
      borderRadius: '10px 10px 0 0 '
    }
  },
  refresh: {
    color: '#42a5f5',
    textTransform: 'uppercase',
    fontWeight: '600',
    cursor: 'pointer',
    '&:hover': {
      color: '#1e88e5'
    },
    '&:active': {
      color: '#1565c0'
    }
  }
});

const UpdateMessage = () => {
  const {updateAvailable, updateApp} = useUpdateContext();
  const classes = useStyles({isVisible: updateAvailable});

  const handleRefreshClick = () => {
    updateApp();
  };

  return (
    <div className={classes.container}>
      <Typography>Update ready, refresh to apply the changes</Typography>
      <Typography id="refresh" onClick={handleRefreshClick}>
        refresh
      </Typography>
    </div>
  );
};

export default React.memo(UpdateMessage);
