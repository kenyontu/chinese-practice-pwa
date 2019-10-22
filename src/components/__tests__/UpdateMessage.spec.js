import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/dont-cleanup-after-each'
import { render, fireEvent, cleanup } from '@testing-library/react'
import '../../testUtils'
import UpdateMessage from '../UpdateMessage'
import * as UpdateContext from '../../context/updateContext'

const mockedUseUpdateContext = {
  updateAvailable: true,
  updateApp: jest.fn(),
}

UpdateContext.useUpdateContext = jest.fn(() => mockedUseUpdateContext)

beforeEach(cleanup)

test('Renders correctly', () => {
  const { getByText } = render(<UpdateMessage />)

  const reloadBtn = getByText(/Reload/)
  fireEvent.click(reloadBtn)
  expect(mockedUseUpdateContext.updateApp).toHaveBeenCalledTimes(1)
})
