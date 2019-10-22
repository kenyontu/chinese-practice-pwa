import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

import styles from './SpeechButton.module.css'
import useSpeech from '../hooks/useSpeech'

interface Props {
  text: string
  className?: string
  iconClassName?: string
}

const SpeechButton: React.FC<Props> = ({
  text,
  className,
  iconClassName,
  children,
  ...props
}) => {
  const { isAvailable, isSpeaking, speak } = useSpeech()

  const handleClick = () => {
    speak(text)
  }

  return (
    <>
      {isAvailable && (
        <button
          {...props}
          onClick={handleClick}
          className={classNames(styles.button, className, {
            [styles.speaking]: isSpeaking,
          })}
        >
          {children}
          <FontAwesomeIcon icon="volume-up" className={iconClassName} />
        </button>
      )}
    </>
  )
}

export default SpeechButton
