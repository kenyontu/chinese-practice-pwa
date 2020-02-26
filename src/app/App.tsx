import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from 'react-router-dom'

import UpdateMessage from '../components/UpdateMessage'
import CategoriesPage from '../pages/CategoriesPage/index'
import WordsPage from '../pages/WordsPage'
import WordDetailsPage from '../pages/WordDetailsPage/index'
import PracticePage from '../pages/PracticePage'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  const { action } = useHistory()

  useEffect(() => {
    if (action === 'PUSH') {
      window.scrollTo(0, 0)
    }
  }, [pathname, action])

  return null
}

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Switch>
          <Route path="/categories/:category_id" exact component={WordsPage} />
          <Route
            path="/categories/:category_id/practice"
            exact
            component={PracticePage}
          />
          <Route path="/categories" component={CategoriesPage} />
          <Route path="/words/:word_id" component={WordDetailsPage} />
          <Redirect to="/categories" />
        </Switch>
      </Router>
      <UpdateMessage />
    </>
  )
}

export default App
