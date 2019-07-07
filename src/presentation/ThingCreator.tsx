import React from "react";
import { Thing } from "../domain/thing";
import { Name } from "../domain/name";
import { ThingId } from "../domain/thing_id";
import { ThingFactory } from "../domain/thing_factory";
import { MapThingRepository } from "../infrastructure/map_thing_repository";

type Prop = {
  onCreate?: (thing: Thing) => void;
  thingFactory: ThingFactory;
};
export const ThingCreator: React.FC<Prop> = props => {
  const [thingName, setThingName] = React.useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const name = new Name(thingName);
    const thing = props.thingFactory.create(name)
    if (props.onCreate) {
      props.onCreate(thing);
    }
  }

  return (<form onSubmit={handleSubmit}>
    <input type="text" value={thingName} onChange={event => setThingName(event.target.value)} />
    <button type="submit">作成</button>
  </form >)
}
