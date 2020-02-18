import React from "react";
import { Thing } from "../domain/thing";
import { ThingView } from "./ThingView";

type Prop = {
  things: Thing[];
};
export const ThingListView: React.FC<Prop> = props => {
  const thingListView = props.things.map(thing => (
    <ThingView thing={thing}></ThingView>
  ));
  return <div>{thingListView}</div>;
};
