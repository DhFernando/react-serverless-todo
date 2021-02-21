import './App.css';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Header from './components/Header'
import Todo from './components/Todo'

Amplify.configure(awsconfig)

const App = () => {
  return (
    <div className="App">
      <header className="App-header"> 
        <Router>
          <Header />

            <Switch>
              <Route exact path="/" component={ Todo } />
            </Switch>
        
        </Router>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
