import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import LessonsPage from '../pages/LessonsPage'
import WordsPage from '../pages/WordsPage'
import PracticePage from '../pages/PracticePage'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/lessons/:lesson_id" exact component={WordsPage} />
        <Route
          path="/lessons/:lesson_id/practice"
          exact
          component={PracticePage}
        />
        <Route path="/lessons" component={LessonsPage} />
        <Redirect to="/lessons" />
      </Switch>
    </Router>
  )
}

export default App
