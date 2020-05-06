import React from "react";
import { ThingFactory } from "../domain/thing_factory";
import { Name } from "../name";
import { Thing } from "../thing";

type Prop = {
  onCreate?: (thing: Thing) => void;
  thingFactory: ThingFactory;
};
export const ThingCreator: React.FC<Prop> = props => {
  const [thingName, setThingName] = React.useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    e.stopPropagation();

    const name = Name.create(thingName);
    if (name.isError) {
      return;
    }
    const thing = props.thingFactory.create(name.value);
    if (props.onCreate) {
      props.onCreate(thing);
    }
    setThingName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={thingName}
        onChange={(event): void => setThingName(event.target.value)}
      />
      <button type="submit">作成</button>
    </form>
  );
};
