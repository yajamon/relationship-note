import React from "react";
import { Thing } from "../domain/thing";

type Prop = {
  things: Thing[];
};
export const ThingListView: React.FC<Prop> = props => {
  const thingListView = props.things.map(thing => (
    <div>{thing.name.value}</div>
  ));
  return <div>{thingListView}</div>;
};
