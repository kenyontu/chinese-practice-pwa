import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/dont-cleanup-after-each'
import { render, fireEvent, cleanup } from '@testing-library/react'

import '../../testUtils'
import PracticeSettingsDialog from '../PracticeSettingsDialog'

beforeEach(cleanup)

test('Renders correctly', () => {
  const settings = {
    hidden: {
      characters: false,
      piyin: true,
      description: false,
    },
  }

  const onSettingsChange = jest.fn()
  const onClose = jest.fn()

  const { getByLabelText, getByText } = render(
    <PracticeSettingsDialog
      isOpen
      settings={settings}
      onSettingsChange={onSettingsChange}
      onClose={onClose}
    />
  )

  const charactersCheckbox = getByLabelText(/characters/i)
  const piyinCheckbox = getByLabelText(/piyin/i)
  const descriptionCheckbox = getByLabelText(/description/i)

  // only one should be checked based on the props passed
  expect(charactersCheckbox).toHaveProperty('checked', false)
  expect(piyinCheckbox).toHaveProperty('checked', true)
  expect(descriptionCheckbox).toHaveProperty('checked', false)

  // clicking a checkbox should call onSettingsChange
  fireEvent.click(descriptionCheckbox)

  expect(onSettingsChange).toHaveBeenCalledTimes(1)
  expect(onSettingsChange).toHaveBeenCalledWith({
    hidden: {
      characters: false,
      piyin: true,
      description: true,
    },
  })

  // close button
  const closeBtn = getByText(/close/i)
  fireEvent.click(closeBtn)
  expect(onClose).toHaveBeenCalledTimes(1)
})

test('Should not allow all 3 hidden settings to be checked at a given time', () => {
  const settings = {
    hidden: {
      characters: false,
      piyin: true,
      description: true,
    },
  }

  const onSettingsChange = jest.fn()

  const { getByLabelText } = render(
    <PracticeSettingsDialog
      isOpen
      settings={settings}
      onSettingsChange={onSettingsChange}
      onClose={() => {}}
    />
  )

  const charactersCheckbox = getByLabelText(/characters/i)
  fireEvent.click(charactersCheckbox)
  expect(onSettingsChange).not.toHaveBeenCalled()
})

test('Should not allow all 3 hidden settings to be unchecked at the same time', () => {
  const settings = {
    hidden: {
      characters: false,
      piyin: true,
      description: false,
    },
  }

  const onSettingsChange = jest.fn()

  const { getByLabelText } = render(
    <PracticeSettingsDialog
      isOpen
      settings={settings}
      onSettingsChange={onSettingsChange}
      onClose={() => {}}
    />
  )

  const piyinCheckbox = getByLabelText(/piyin/i)
  fireEvent.click(piyinCheckbox)
  expect(onSettingsChange).not.toHaveBeenCalled()
})
