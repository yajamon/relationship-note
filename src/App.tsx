import * as React from "react";
import "./App.css";

import { ThingCreator } from "./presentation/ThingCreator";
import { ThingFactory } from "./domain/thing_factory";
import { MapThingRepository } from "./infrastructure/map_thing_repository";

const logo = require("./logo.svg");

class App extends React.Component {
  render() {
    const thingRepository = new MapThingRepository();
    const thingFactory = new ThingFactory(thingRepository);
    return (
      <div className="App">
        <ThingCreator
          thingFactory={thingFactory}
          onCreate={thing => {
            console.log(thing);
          }}
        />
      </div>
    );
  }
}

export default App;
