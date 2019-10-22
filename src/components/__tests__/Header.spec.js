import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/dont-cleanup-after-each'
import { render, cleanup } from '@testing-library/react'
import '../../testUtils'
import Header from '../Header'

beforeEach(cleanup)

test('Should render the header correctly', () => {
  const title = 'title'
  const rightButtonId = 'right-button'

  const { getByText, getByTestId } = render(
    <Header
      title={title}
      hasNavigateBack
      right={<button data-testid={rightButtonId}>foo</button>}
    />
  )
  getByText(title)
  getByTestId('nav-back-btn')
  getByTestId(rightButtonId)
})
