import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Word } from 'types'

import { getWordList } from '../data'
import styles from './WordsPage.module.css'
import Header from '../components/Header'
import HeaderButton from '../components/HeaderButton'
import SpeechButton from '../components/SpeechButton'

type Props = {} & RouteComponentProps<{ lesson_id: string }>

const WordsPage: React.FC<Props> = ({ match, history }) => {
  const lessonId = match.params.lesson_id
  const [words, setWords] = useState<Word[]>([])
  const [title, setTitle] = useState<string>('')

  useEffect(() => {
    const lesson = getWordList(match.params.lesson_id)

    if (lesson !== null) {
      setTitle(lesson.name)
      setWords(lesson.words)
    }
  }, [match.params.lesson_id])

  const handlePracticeClick = () => {
    history.push(`/lessons/${lessonId}/practice`)
  }

  return (
    <div className={styles.container}>
      <Header
        title={title}
        right={<HeaderButton onClick={handlePracticeClick} icon="dumbbell" />}
        hasNavigateBack
        hideOnScroll
      />

      {words.map(word => (
        <div key={word.id} className={styles.word}>
          <div className={styles.nameContainer}>
            <SpeechButton text={word.name} iconClassName={styles.speechIcon}>
              <p className={styles.name}>{word.name}</p>
            </SpeechButton>
            <span className={styles.piyin}>{word.piyin}</span>
          </div>

          <p className={styles.description}>{word.description}</p>
        </div>
      ))}
    </div>
  )
}

export default WordsPage
