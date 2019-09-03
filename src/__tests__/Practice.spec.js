import React from 'react';
import '@testing-library/react/cleanup-after-each';
import '@testing-library/jest-dom/extend-expect';
import {render} from '@testing-library/react';
import {MemoryRouter, Route} from 'react-router-dom';

import {renderWithProviders, getFirstLessonId} from '../testUtils';
import {books} from '../data/index';
import Practice from '../pages/Practice';

const lessonId = getFirstLessonId(books);

test('Renders with no errors', () => {
  renderWithProviders(
    <MemoryRouter initialEntries={[`/lessons/${lessonId}/practice`]}>
      <Route path="/lessons/:lesson_id/practice" component={Practice} />
    </MemoryRouter>
  );
});
