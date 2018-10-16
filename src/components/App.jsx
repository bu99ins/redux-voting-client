import React, {Component}  from 'react';
import {Route, Switch} from 'react-router-dom';
import {VotingContainer} from './Voting';
import {ResultsContainer} from './Results';

class App extends Component {
  render() {
    return <Switch>
      <Route path="/results" component={ResultsContainer} />} />
      <Route path="/" component={VotingContainer} />
    </Switch>
  }
}

export default App;