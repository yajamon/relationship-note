import React from "react";
import { Thing } from "../domain/thing";
import { Name } from "../domain/name";
import { ThingFactory } from "../domain/thing_factory";

type Prop = {
  onCreate?: (thing: Thing) => void;
  thingFactory: ThingFactory;
};
export const ThingCreator: React.FC<Prop> = props => {
  const [thingName, setThingName] = React.useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const name = Name.create(thingName);
    if (name.isError) {
      return;
    }
    const thing = props.thingFactory.create(name.ok);
    if (props.onCreate) {
      props.onCreate(thing);
    }
  }

  return (<form onSubmit={handleSubmit}>
    <input type="text" value={thingName} onChange={event => setThingName(event.target.value)} />
    <button type="submit">作成</button>
  </form >)
}
