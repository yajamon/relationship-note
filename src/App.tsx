import * as React from 'react';
import './App.css';

import { ThingCreator } from './presentation/ThingCreator';

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ThingCreator onCreate={(thing) => { console.log(thing) }} />
      </div>
    );
  }
}

export default App;
