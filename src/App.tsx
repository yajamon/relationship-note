import * as React from "react";
import "./App.css";
import { ThingFactory } from "./domain/thing_factory";
import { AllThings } from "./presentation/AllThings";
import { SearchThingsByNamePart } from "./presentation/SearchThingsByNamePart";
import { ThingCreator } from "./presentation/ThingCreator";
import { MapThingRepository } from "./thing_repository/map_thing_repository";

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
            thingRepository.save(thing);
          }}
        />
        <AllThings thingRepository={thingRepository}></AllThings>
        <SearchThingsByNamePart thingRepository={thingRepository} />
      </div>
    );
  }
}

export default App;
