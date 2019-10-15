import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

import styles from './SpeechButton.module.css'
import { useSpeechUpdater, useSpeechState } from '../context/speechContext'

interface Props {
  text: string
}

const SpeechButton: React.FC<Props> = ({ text }) => {
  const [isSpeaking, setIsSpeaking] = useState(false)

  const { isAvailable } = useSpeechState()
  const { speak } = useSpeechUpdater()

  const handleClick = () => {
    setIsSpeaking(true)
    speak(text).then(() => {
      setIsSpeaking(false)
    })
  }

  return (
    <>
      {isAvailable && (
        <button
          onClick={handleClick}
          className={classNames(styles.button, {
            [styles.speaking]: isSpeaking,
          })}
        >
          <FontAwesomeIcon icon="volume-up" />
        </button>
      )}
    </>
  )
}

export default SpeechButton
