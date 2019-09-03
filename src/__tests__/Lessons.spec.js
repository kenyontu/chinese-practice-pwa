import React from 'react';
import '@testing-library/react/cleanup-after-each';
import '@testing-library/jest-dom/extend-expect';
import {render} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';

import {renderWithProviders} from '../testUtils';
import Lesson from '../pages/Lessons';

test('Renders with no errors', () => {
  renderWithProviders(
    <MemoryRouter>
      <Lesson />
    </MemoryRouter>
  );
});
