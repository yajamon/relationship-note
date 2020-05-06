import React from "react";
import { Thing } from "../thing";
import { ThingRepository } from "../thing_repository";
import { ThingListView } from "./ThingListView";

type Prop = {
  thingRepository: ThingRepository;
};
export const AllThings: React.FC<Prop> = props => {
  const [things, setThings] = React.useState([] as Thing[]);

  const fetch = (): void => {
    setThings(props.thingRepository.query(() => true));
  };
  React.useEffect(() => {
    props.thingRepository.subscribe(fetch);
    return (): void => {
      props.thingRepository.unsubscribe(fetch);
    };
  });

  return <ThingListView things={things}></ThingListView>;
};
