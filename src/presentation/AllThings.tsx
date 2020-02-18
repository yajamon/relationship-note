import React from "react";
import { ThingRepository } from "../domain/thing_repository";

type Prop = {
  thingRepository: ThingRepository;
};
export const AllThings: React.FC<Prop> = props => {
  const things = props.thingRepository.query(() => true);

  const thingListView = things.map(thing => <div>{thing.name.value}</div>);
  return <div>{thingListView}</div>;
};
