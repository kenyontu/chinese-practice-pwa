import { useState, useRef } from 'react'

const useSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const utterance = useRef<SpeechSynthesisUtterance>()

  const speak = (text: string) => {
    if (isSpeaking) {
      return Promise.resolve()
    }

    setIsSpeaking(true)
    // Firefox requires a new instance of utterance for other texts
    utterance.current = new SpeechSynthesisUtterance(text)
    utterance.current.lang = 'zh-TW'
    const voice = window.speechSynthesis
      .getVoices()
      .find(v => v.lang === 'zh-TW')
    if (voice) {
      utterance.current.voice = voice
    }

    utterance.current.onend = () => {
      setIsSpeaking(false)
    }

    window.speechSynthesis.speak(utterance.current)
  }

  return {
    isSpeaking,
    speak,
    isAvailable: Boolean(window.speechSynthesis),
  }
}

export default useSpeech
