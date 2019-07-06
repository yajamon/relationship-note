import * as React from 'react';
import './App.css';

import { ThingCreator } from './presentation/ThingCreator';

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ThingCreator />
      </div>
    );
  }
}

export default App;
