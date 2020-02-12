import React from "react";
import { Thing } from "../domain/thing";
import { ThingRepository } from "../domain/thing_repository";

type Prop = {
  thingRepository: ThingRepository;
};
export const SearchThingsByNamePart: React.FC<Prop> = props => {
  const [things, setThings] = React.useState([] as Thing[]);
  const [namePart, setNamePart] = React.useState("");

  const fetchThings = () => {
    if (namePart.length < 1) {
      setThings([]);
      return;
    }
    const newThings = props.thingRepository.query(thing =>
      thing.name.value.includes(namePart)
    );
    console.log(newThings);
    setThings(newThings);
  };
  React.useEffect(() => {
    fetchThings();
  }, [namePart]);
  React.useEffect(() => {
    props.thingRepository.subscribe(fetchThings);
    return () => {
      props.thingRepository.unsubscribe(fetchThings);
    };
  });

  const thingList = things.map(thing => (
    <div key={thing.name.value}>{thing.name.value}</div>
  ));
  return (
    <div>
      <label>
        Thingの名前で検索
        <input
          type="text"
          value={namePart}
          onChange={e => {
            setNamePart(e.target.value);
          }}
        />
      </label>
      <div>{thingList}</div>
    </div>
  );
};
