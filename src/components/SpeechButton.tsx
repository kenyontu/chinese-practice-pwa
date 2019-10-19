import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

import styles from './SpeechButton.module.css'
import useSpeech from '../hooks/useSpeech'

interface Props {
  text: string
  className?: string
}

const SpeechButton: React.FC<Props> = ({ text, className, children }) => {
  const { isAvailable, isSpeaking, speak } = useSpeech()

  const handleClick = () => {
    speak(text)
  }

  return (
    <>
      {isAvailable && (
        <button
          onClick={handleClick}
          className={classNames(styles.button, className, {
            [styles.speaking]: isSpeaking,
          })}
        >
          {children}
          <FontAwesomeIcon icon="volume-up" />
        </button>
      )}
    </>
  )
}

export default SpeechButton
