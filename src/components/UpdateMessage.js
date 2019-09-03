import React from 'react';
import {Typography} from '@material-ui/core';
import classNames from 'classnames';

import {useUpdateContext} from '../context/updateContext';
import styles from './UpdateMessage.module.css';

const UpdateMessage = () => {
  const {updateAvailable, updateApp} = useUpdateContext();
  const handleRefreshClick = () => {
    updateApp();
  };

  const containerClass = classNames(styles.container, {
    [styles.containerNotVisible]: !updateAvailable
  });

  return (
    <div className={containerClass}>
      <Typography>Update ready, refresh to apply the changes</Typography>
      <Typography
        id="refresh"
        className={styles.refresh}
        onClick={handleRefreshClick}
      >
        refresh
      </Typography>
    </div>
  );
};

export default React.memo(UpdateMessage);
