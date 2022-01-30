import './App.css';
import React, { useState} from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import Navbar from './components/Navbar';
import News from './components/News';


function App() {
  const apiKey = process.env.REACT_APP_NEWS_API
  const pageSize = 5
  const [progress, setProgress] = useState(0)
  return (
    <>
     <Router>
          <Navbar />
          <LoadingBar
            height={3}
            color='crimson'
            progress={progress}
          />
          <Switch>
            <Route exact path="/"><News key="general" apiKey={apiKey} setProgress={setProgress} country="in" pagesize={pageSize} category="general" />
            </Route>
            <Route exact path="/business"><News key="business" apiKey={apiKey} setProgress={setProgress} country="in" pagesize={pageSize} category="business" />
            </Route>
            <Route exact path="/entertainment"><News key="entertainment" apiKey={apiKey} setProgress={setProgress} country="in" pageSize={pageSize} category="entertainment" />
            </Route>
            <Route exact path="/technology"><News key="technology" apiKey={apiKey} setProgress={setProgress} country="in" pagesize={pageSize} category="technology" />
            </Route>
            <Route exact path="/Science"><News key="Science" apiKey={apiKey} setProgress={setProgress} country="in" pagesize={pageSize} category="Science" />
            </Route>
            <Route exact path="/Sports"><News key="Sports" apiKey={apiKey} setProgress={setProgress} country="in" pagesize={pageSize} category="Sports" />
            </Route>
          </Switch>
        </Router> 
    </>
  )
}

export default App