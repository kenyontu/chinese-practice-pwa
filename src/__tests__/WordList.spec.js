import React from 'react';
import '@testing-library/react/cleanup-after-each';
import '@testing-library/jest-dom/extend-expect';
import {render} from '@testing-library/react';

import {renderWithProviders} from '../testUtils';
import WordList from '../pages/WordList';

test('Renders with no errors', () => {
  renderWithProviders(<WordList />);
});
