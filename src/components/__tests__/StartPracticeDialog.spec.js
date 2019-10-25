import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/dont-cleanup-after-each'
import { render, fireEvent, cleanup } from '@testing-library/react'
import '../../testUtils'
import StartPracticeDialog from '../StartPracticeDialog'

beforeEach(cleanup)

test('Should handle close actions', () => {
  const onClose = jest.fn()
  const { rerender, getByTestId, getByText } = render(
    <StartPracticeDialog isOpen closeOnBackdropClick onClose={onClose} />
  )

  const backdrop = getByTestId('dialog-backdrop')
  fireEvent.click(backdrop)
  expect(onClose).toHaveBeenCalledTimes(1)

  const closeButton = getByText(/close/i)
  fireEvent.click(closeButton)
  expect(onClose).toHaveBeenCalledTimes(2)

  rerender(
    <StartPracticeDialog
      isOpen
      closeOnBackdropClick={false}
      onClose={onClose}
    />
  )

  fireEvent.click(backdrop)
  expect(onClose).toHaveBeenCalledTimes(2)
})

test.only('Renders options correctly', () => {
  const onOptionSelected = jest.fn()
  const { rerender, getAllByTestId } = render(
    <StartPracticeDialog
      isOpen
      wordCount={13}
      onPracticeOptionSelected={onOptionSelected}
    />
  )

  expect(getAllByTestId('practice-option').length).toBe(1)

  rerender(
    <StartPracticeDialog
      isOpen
      wordCount={14}
      onPracticeOptionSelected={onOptionSelected}
    />
  )

  const practiceOptins = getAllByTestId('practice-option')
  expect(practiceOptins.length).toBe(3)

  fireEvent.click(practiceOptins[0])
  fireEvent.click(practiceOptins[1])
  fireEvent.click(practiceOptins[2])
  expect(onOptionSelected).toHaveBeenCalledTimes(3)
})
