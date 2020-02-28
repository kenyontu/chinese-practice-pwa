import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/dont-cleanup-after-each'
import { render, cleanup, fireEvent } from '@testing-library/react'

import '../../../testUtils'
import HeaderButton from './HeaderButton'

beforeEach(cleanup)

test('Should render correctly', () => {
  const onClick = jest.fn()
  const { getByTestId } = render(
    <HeaderButton data-testid="btn" icon="arrow-left" onClick={onClick} />
  )
  const button = getByTestId('btn')
  fireEvent.click(button)
  expect(onClick).toHaveBeenCalledTimes(1)
})
