import React from 'react';
import {render} from '@testing-library/react';

import {UpdateProvider} from './context/updateContext';
import {SpeechProvider} from './context/speechContext';

export const renderWithProviders = element => {
  return render(
    <UpdateProvider>
      <SpeechProvider>{element}</SpeechProvider>
    </UpdateProvider>
  );
};

export const getFirstLessonId = books => books[0].lessons[0].id;
