import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import produce from 'immer'
import { Settings } from 'types'

import styles from './PracticePage.module.css'
import Header from '../components/header/Header'
import HeaderButton from '../components/header/HeaderButton'
import SpeechButton from '../components/SpeechButton'
import useSettings from '../hooks/useSettings'
import { shuffle } from '../utils'
import useFavoriteWords from '../hooks/useFavoriteWords'
import { useGetData } from '../context/dataContext'

type Props = {} & RouteComponentProps<{ category_id: string }>

const PracticePage: React.FC<Props> = ({ match, history }) => {
  const categoryId = match.params.category_id
  const [words, setWords] = useState<string[]>([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)

  const data = useGetData(data => data.wordsByCategory[categoryId] || [])
  const currentWord = useGetData(
    data => data.wordsById[words[currentWordIndex]]
  )
  const [settings, setSettings] = useSettings()
  const { favorites, markAsFavorite, unmarkAsFavorite } = useFavoriteWords(
    categoryId
  )

  useEffect(() => {
    // Happens when the category id is invalid
    if (data.length === 0) {
      // Ends the function execution to avoid infinite effect call
      return
    }
    if (settings.practice.display === 'f') {
      // Only filter out favorites when the data or display mode changes.
      // Changes for when the user toggles a favorite will be handled
      // separatedly.
      setWords(shuffle(data.filter(w => favorites[w])))
    } else {
      setWords(shuffle(data))
    }
    // Disabling the exhaustive-deps rule to not include the 'favorites' dep
    // TODO: find a way to not deactivate the rule
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, settings.practice.display])

  const handleRevealClick = () => {
    setRevealed(revealed => !revealed)
  }

  const handleNextClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation()
    setRevealed(false)

    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1)
    } else {
      if (settings.practice.display === 'f') {
        setWords(shuffle(data.filter(w => favorites[w])))
      } else {
        setWords(shuffle(data))
      }
      setCurrentWordIndex(0)
    }
  }

  const handleSettingsClick = () => {
    history.push(`/settings/practice`)
  }

  const handleFavoriteClick = (wordId: string) => () => {
    if (favorites[wordId] === true) {
      // If the current display mode is set to only show favorites,
      // Remove the word from the words array
      unmarkAsFavorite(wordId)

      if (settings.practice.display === 'f') {
        // If the word being removed from the favorites is the last,
        // decrement the current index, preventing it from referencing
        // a position that does not exist
        if (currentWordIndex === words.length - 1 && currentWordIndex > 0) {
          setCurrentWordIndex(currentWordIndex - 1)
        }
        setWords(words.filter(w => w !== wordId))
      }
    } else {
      markAsFavorite(wordId)
    }
  }

  const handleShowAllWordsClick = () => {
    setSettings(
      produce(settings, (draft: Settings) => {
        draft.practice.display = 'a'
      })
    )
  }

  return (
    <div className={styles.container}>
      <Header
        title={`${words.length > 0 ? currentWordIndex + 1 : 0}/${words.length}${
          settings.practice.display === 'f' ? ' ★' : ''
        }`}
        hasNavigateBack
        right={<HeaderButton icon="cog" onClick={handleSettingsClick} />}
      />
      {words.length > 0 ? (
        <>
          <div className={styles.questionContainer}>
            {settings.practice.mode === 'cc' && (
              <SpeechButton
                iconClassName={styles.speechIcon}
                text={currentWord.name}
              >
                <p className={styles.word}>{currentWord.name}</p>
              </SpeechButton>
            )}
            {settings.practice.mode === 'p' && (
              <p className={styles.piyin}>{currentWord.piyin}</p>
            )}
            {settings.practice.mode === 'd' && (
              <p className={styles.description}>{currentWord.description}</p>
            )}
          </div>
          <p className={styles.answerLabel}>ANSWER</p>
          <div
            className={classNames(styles.answerContainer, {
              [styles.hideAnswer]: !revealed,
            })}
          >
            {settings.practice.mode !== 'cc' && (
              <SpeechButton
                iconClassName={styles.speechIcon}
                text={currentWord.name}
              >
                <p className={styles.word}>{currentWord.name}</p>
              </SpeechButton>
            )}
            {settings.practice.mode !== 'p' && (
              <p className={styles.piyin}>{currentWord.piyin}</p>
            )}
            {settings.practice.mode !== 'd' && (
              <p className={styles.description}>{currentWord.description}</p>
            )}
          </div>
          <div className={styles.controlsContainer}>
            <div
              className={classNames(styles.button, styles.favoriteButton, {
                [styles.favoriteButtonOn]: favorites[currentWord.id],
              })}
              onClick={handleFavoriteClick(currentWord.id)}
            >
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
        <div className={styles.noWordsContainer}>
          {settings.practice.display === 'f' ? (
            <>
              <p className={styles.noWordsMessage}>
                Your current setting is set to only display favorite words. You
                can add some words to your favorites or change your settings to
                show all words
              </p>
              <button
                className={styles.showAllWordsButton}
                onClick={handleShowAllWordsClick}
              >
                Show all words
              </button>
            </>
          ) : (
            <p className={styles.noWordsMessage}>
              There are no words on this lesson
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default PracticePage
