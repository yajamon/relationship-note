import React from "react";
import { Thing } from "../domain/thing";
import { ThingRepository } from "../domain/thing_repository";

type Prop = {
  thingRepository: ThingRepository;
};
export const AllThings: React.FC<Prop> = props => {
  const [things, setThings] = React.useState([] as Thing[]);

  const fetch = () => {
    setThings(props.thingRepository.query(() => true));
  };
  React.useEffect(() => {
    props.thingRepository.subscribe(fetch);
    return () => {
      props.thingRepository.unsubscribe(fetch);
    };
  });

  const thingListView = things.map(thing => <div>{thing.name.value}</div>);
  return <div>{thingListView}</div>;
};
