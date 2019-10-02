import React, { useState, useContext } from 'react'

const SpeechStateContext = React.createContext<{
  isAvailable: boolean
  isSpeaking: boolean
}>({
  isAvailable: true,
  isSpeaking: false,
})

const SpeechUpdaterContext = React.createContext<{
  speak: (text: string) => void
}>({
  speak: () => {},
})

export const SpeechProvider: React.FC = ({ children }) => {
  const [isSpeaking, setIsSpeaking] = useState(false)

  const speak = (text: string) => {
    if (isSpeaking) {
      return
    }

    setIsSpeaking(true)

    // Firefox requires a new instance of utterance for other texts
    const utterance = new SpeechSynthesisUtterance()
    utterance.text = text
    utterance.lang = 'zh-CN'
    utterance.onend = () => {
      setIsSpeaking(false)
    }
    window.speechSynthesis.speak(utterance)
  }

  // Provider values
  const stateValues = {
    isAvailable: Boolean(window.speechSynthesis),
    isSpeaking,
  }
  const updaterValues = {
    speak,
  }

  return (
    <>
      <SpeechStateContext.Provider value={stateValues}>
        <SpeechUpdaterContext.Provider value={updaterValues}>
          {children}
        </SpeechUpdaterContext.Provider>
      </SpeechStateContext.Provider>
    </>
  )
}

export const useSpeechState = () => {
  const stateContext = useContext(SpeechStateContext)

  // This can only be used if the context's initial value is undefined
  if (stateContext === undefined) {
    throw new Error('useSpeechState must be used within a SpeechProvider')
  }

  return stateContext
}

export const useSpeechUpdater = () => {
  const updaterContext = useContext(SpeechUpdaterContext)

  // This can only be used if the context's initial value is undefined
  if (updaterContext === undefined) {
    throw new Error('useSpeechUpdater must be used within a SpeechProvider')
  }

  return updaterContext
}
