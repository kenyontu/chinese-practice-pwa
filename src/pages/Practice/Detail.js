import React, {useState, useEffect, memo} from 'react';
import {Typography, ButtonBase, Card} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import VolumeIcon from '@material-ui/icons/VolumeUp';

const speech = new SpeechSynthesisUtterance();
speech.lang = 'zh-CN';

const useStyles = makeStyles({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    padding: '8px',
    '@media (orientation: landscape) and (max-height: 600px)': {
      flexDirection: 'row'
    }
  },
  wordCard: {
    alignSelf: 'stretch',
    margin: '10px 0',
    display: 'flex',
    '@media (orientation: landscape) and (max-height: 600px)': {
      flex: 1
    }
  },
  word: {
    margin: 0,
    fontSize: '45px',
    color: '#333333',
    transition: 'opacity 0.7s ease',
    lineHeight: '1',
    opacity: props => (props.hideName ? 0 : 1),
    visibility: props => (props.hideName ? 'hidden' : 'visible')
  },
  piyin: {
    fontSize: '30px',
    color: '#333333',
    transition: 'opacity 0.7s ease',
    textAlign: 'center',
    opacity: props => (props.hidePiyin ? 0 : 1),
    visibility: props => (props.hidePiyin ? 'hidden' : 'visible')
  },
  description: {
    fontSize: '20px',
    padding: '10px 15px',
    textAlign: 'center',
    color: '#546E7A',
    lineHeight: '1',
    transition: 'opacity 0.7s ease',
    opacity: props => (props.hideDescription ? 0 : 1),
    visibility: props => (props.hideDescription ? 'hidden' : 'visible')
  },
  divider: {
    width: '100%',
    height: '1px',
    backgroundColor: 'rgba(0,0,0,0.2)',
    margin: '15px 20px'
  },
  button: {
    position: 'absolute',
    bottom: '10px'
  },
  speakButton: {
    flex: 1,
    padding: '20px 5px',
    display: 'flex',
    alignItems: 'center'
  },
  volumeIcon: {
    fontSize: '25px',
    marginLeft: '5px',
    transition: 'color 0.5s ease',
    color: props => (props.isSpeaking ? '#f50057' : '#BDBDBD')
  },
  detailContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '@media (orientation: landscape) and (max-height: 600px)': {
      justifyContent: 'center'
    }
  }
});

function Detail({word, hideName, hidePiyin, hideDescription}) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const classes = useStyles({
    isSpeaking,
    hideName,
    hidePiyin,
    hideDescription
  });

  useEffect(() => {
    speech.onend = () => {
      setIsSpeaking(false);
    };
    return () => {
      speech.onend = null;
    };
  }, []);

  const handleSpeakClick = event => {
    if (isSpeaking) {
      return;
    }
    setIsSpeaking(true);
    speech.text = word.name;
    speechSynthesis.speak(speech);
    return true;
  };

  return (
    <div className={classes.container}>
      <Card className={classes.wordCard}>
        <ButtonBase className={classes.speakButton} onClick={handleSpeakClick}>
          <Typography className={classes.word}>{word.name}</Typography>
          <VolumeIcon className={classes.volumeIcon} />
        </ButtonBase>
      </Card>
      <div className={classes.detailContainer}>
        <Typography variant="body1" className={classes.piyin}>
          {word.piyin}
        </Typography>
        <Typography variant="body1" className={classes.description}>
          {word.description}
        </Typography>
      </div>
    </div>
  );
}

export default memo(Detail);
