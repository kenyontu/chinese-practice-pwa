import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import UpdateMessage from './components/UpdateMessage';
import Lessons from './pages/Lessons';
import Practice from './pages/Practice/index';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/lessons" exact component={Lessons} />
          <Route path="/lessons/:lesson_id/practice" component={Practice} />
          <Redirect to="/lessons" />
        </Switch>
      </Router>
      <UpdateMessage />
    </>
  );
}

export default App;
