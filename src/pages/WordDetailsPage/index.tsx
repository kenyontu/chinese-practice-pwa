import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import styles from './WordDetailsPage.module.css'
import { useGetData } from '../../context/dataContext'
import Header from '../../components/header/Header'
import SpeechButton from '../../components/SpeechButton'
import StrokeOrder from '../../components/StrokeOrder/index'
import Tabs from '../../components/Tabs/index'
import { isChineseCharacter } from '../../utils'

type Props = {} & RouteComponentProps<{ word_id: string }>

type CharactersState = {
  [key: string]: { id: string; character: string }
}

const WordDetailsPage: React.FC<Props> = ({ match }) => {
  const wordId = match.params.word_id
  const word = useGetData(data => data.wordsById[wordId])
  const [characters, setCharacters] = useState<CharactersState>({})
  const [selectedStrokeTab, setSelectedStrokeTab] = useState('')

  useEffect(() => {
    const chars = new Set<string>()
    for (let i = 0; i < word.name.length; i++) {
      if (isChineseCharacter(word.name[i])) {
        chars.add(word.name[i])
      }
    }

    const split: CharactersState = {}
    Array.from(chars).forEach(
      (c, i) => (split[i.toString()] = { id: i.toString(), character: c })
    )

    setCharacters(split)
    setSelectedStrokeTab('0')
  }, [word])

  return (
    <div className={styles.container}>
      <Header title="Details" hasNavigateBack />
      <div className={styles.detailContainer}>
        <SpeechButton className={styles.speechBtn} text={word.name}>
          <span className={styles.name}>{word.name}</span>
        </SpeechButton>
        <p className={styles.piyin}>{word.piyin}</p>
        <p className={styles.description}>{word.description}</p>
      </div>
      <div className={styles.strokeOrderContainer}>
        <Tabs
          className={styles.tabs}
          openTabId={selectedStrokeTab}
          onTabClick={tabId => setSelectedStrokeTab(tabId)}
          tabs={Object.keys(characters).map(k => ({
            id: characters[k].id,
            text: characters[k].character,
          }))}
        />

        {characters[selectedStrokeTab] && (
          <StrokeOrder
            key={characters[selectedStrokeTab].id}
            character={characters[selectedStrokeTab].character}
          />
        )}
      </div>
    </div>
  )
}

export default WordDetailsPage
