import React, {memo} from 'react';
import {Typography, ButtonBase, Card} from '@material-ui/core';
import VolumeIcon from '@material-ui/icons/VolumeUp';
import classNames from 'classnames';

import {useSpeechState, useSpeechUpdater} from '../../context/speechContext';
import detailStyles from './Detail.module.css';

function Detail({word, hideName, hidePiyin, hideDescription}) {
  const {isAvailable, isSpeaking} = useSpeechState();
  const {speak} = useSpeechUpdater();

  const handleSpeakClick = () => {
    if (isAvailable) {
      speak(word.name);
    }
  };

  const wordClass = classNames(detailStyles.word, {
    [detailStyles.hide]: hideName
  });

  const piyinClass = classNames(detailStyles.piyin, {
    [detailStyles.hide]: hidePiyin
  });

  const descriptionClass = classNames(detailStyles.description, {
    [detailStyles.hide]: hideDescription
  });

  const volumeIconClass = classNames(detailStyles.volumeIcon, {
    [detailStyles.volumeIconSpeaking]: isSpeaking
  });

  return (
    <div className={detailStyles.container}>
      <Card className={detailStyles.wordCard}>
        <ButtonBase
          className={detailStyles.speakButton}
          onClick={handleSpeakClick}
        >
          <Typography className={wordClass}>{word.name}</Typography>
          {isAvailable && <VolumeIcon className={volumeIconClass} />}
        </ButtonBase>
      </Card>
      <div className={detailStyles.detailContainer}>
        <Typography variant="body1" className={piyinClass}>
          {word.piyin}
        </Typography>
        <Typography variant="body1" className={descriptionClass}>
          {word.description}
        </Typography>
      </div>
    </div>
  );
}

export default memo(Detail);
