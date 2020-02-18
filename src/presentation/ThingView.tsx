import React from "react";
import { Thing } from "../domain/thing";

type Prop = {
  thing: Thing;
};
export const ThingView: React.FC<Prop> = props => {
  return <div>{props.thing.name.value}</div>;
};
