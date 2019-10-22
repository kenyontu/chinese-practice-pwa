import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/dont-cleanup-after-each'
import { render, fireEvent, cleanup } from '@testing-library/react'
import '../../testUtils'
import SpeechButton from '../SpeechButton'

const mockedUseSpeech = {
  isSpeaking: jest.fn(),
  speak: jest.fn(),
  isAvailable: true,
}

jest.mock('../../hooks/useSpeech', () => () => mockedUseSpeech)

beforeEach(cleanup)

test('Renders correctly', () => {
  const text = 'text'

  const { getByTestId, getByText } = render(
    <SpeechButton data-testid="btn">
      <span>{text}</span>
    </SpeechButton>
  )

  getByText(text)
  const button = getByTestId('btn')
  fireEvent.click(button)
  expect(mockedUseSpeech.speak).toHaveBeenCalledTimes(1)
})
