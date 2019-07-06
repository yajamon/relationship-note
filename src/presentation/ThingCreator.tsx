import React from "react";

export const ThingCreator: React.FC = props => {
  const [thingName, setThingName] = React.useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(thingName);
  }

  return (<form onSubmit={handleSubmit}>
    <input type="text" value={thingName} onChange={event => setThingName(event.target.value)} />
    <button type="submit">作成</button>
  </form >)
}
