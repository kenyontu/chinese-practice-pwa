import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PracticeSettings } from 'types'

import styles from './PracticePage.module.css'
import Header from '../components/header/Header'
import HeaderButton from '../components/header/HeaderButton'
import SpeechButton from '../components/SpeechButton'
import PracticeSettingsDialog from '../components/PracticeSettingsDialog'
import useLocalStorage from '../hooks/useLocalStorage'
import { shuffle } from '../utils'
import useFavoriteWords from '../hooks/useFavoriteWords'
import { useGetData } from '../context/dataContext'

const filterWords = (
  wordIds: string[],
  query: string,
  favorites: { [key: string]: boolean }
) => {
  const params = new URLSearchParams(query)
  if (params.get('mode') === 'fav') {
    return wordIds.filter(w => favorites[w])
  }

  return wordIds
}

type Props = {} & RouteComponentProps<{ category_id: string }>

const defaultSettings: PracticeSettings = {
  hidden: {
    characters: false,
    piyin: true,
    description: false,
  },
}

const PracticePage: React.FC<Props> = ({ match, location }) => {
  const categoryId = match.params.category_id
  const data = useGetData(data => data.wordsByCategory[categoryId])
  const [words, setWords] = useState<string[]>([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const word = useGetData(data => data.wordsById[words[currentWordIndex]])
  const [revealed, setRevealed] = useState(false)
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false)
  const [settings, setSettings] = useLocalStorage<PracticeSettings>(
    'practice-settings',
    defaultSettings
  )
  const { favorites } = useFavoriteWords(categoryId)

  useEffect(() => {
    if (data) {
      setWords(shuffle(filterWords(data, location.search, favorites)))
    }
  }, [categoryId, location.search, data, favorites])

  const handleRevealClick = () => {
    setRevealed(revealed => !revealed)
  }

  const handleNextClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation()
    setRevealed(false)

    if (currentWordIndex === words.length - 1) {
      if (data) {
        setWords(shuffle(filterWords(data, location.search, favorites)))
        setCurrentWordIndex(0)
      }
    } else {
      setCurrentWordIndex(currentWordIndex + 1)
    }
  }

  const onSettingsChange = (newSettings: PracticeSettings) => {
    setSettings(newSettings)
  }

  const handleSettingsClick = () => {
    setIsSettingsDialogOpen(true)
  }

  const currentWord = word

  return (
    <div className={styles.container}>
      <PracticeSettingsDialog
        isOpen={isSettingsDialogOpen}
        onClose={() => setIsSettingsDialogOpen(false)}
        settings={settings}
        onSettingsChange={onSettingsChange}
      />
      <Header
        title={`${currentWordIndex + 1}/${words.length}`}
        hasNavigateBack
        right={<HeaderButton icon="cog" onClick={handleSettingsClick} />}
      />
      {words.length > 0 ? (
        <>
          <div className={styles.questionContainer}>
            {!settings.hidden.characters && (
              <SpeechButton
                iconClassName={styles.speechIcon}
                text={currentWord.name}
              >
                <p className={styles.word}>{currentWord.name}</p>
              </SpeechButton>
            )}
            {!settings.hidden.piyin && (
              <p className={styles.piyin}>{currentWord.piyin}</p>
            )}
            {!settings.hidden.description && (
              <p className={styles.description}>{currentWord.description}</p>
            )}
          </div>
          <p className={styles.answerLabel}>ANSWER</p>
          <div
            className={classNames(styles.answerContainer, {
              [styles.hideAnswer]: !revealed,
            })}
          >
            {settings.hidden.characters && (
              <SpeechButton
                iconClassName={styles.speechIcon}
                text={currentWord.name}
              >
                <p className={styles.word}>{currentWord.name}</p>
              </SpeechButton>
            )}
            {settings.hidden.piyin && (
              <p className={styles.piyin}>{currentWord.piyin}</p>
            )}
            {settings.hidden.description && (
              <p className={styles.description}>{currentWord.description}</p>
            )}
          </div>
          <div className={styles.controlsContainer}>
            <div className={classNames(styles.button, styles.favoriteButton)}>
              <FontAwesomeIcon icon="star" className={styles.buttonIcon} />
              <span>Favorite</span>
            </div>
            <div
              className={classNames(styles.button, styles.revealButton)}
              onClick={handleRevealClick}
            >
              {revealed ? (
                <>
                  <FontAwesomeIcon
                    icon="eye-slash"
                    className={styles.buttonIcon}
                  />
                  <span>Hide</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon="eye" className={styles.buttonIcon} />
                  <span>Reveal</span>
                </>
              )}
            </div>

            <div
              className={classNames(styles.button, styles.nextButton)}
              onClick={handleNextClick}
            >
              <FontAwesomeIcon
                icon="arrow-right"
                className={styles.buttonIcon}
              />
              <span>Next</span>
            </div>
          </div>
        </>
      ) : (
        <p>There are no words on this lesson</p>
      )}
    </div>
  )
}

export default PracticePage
