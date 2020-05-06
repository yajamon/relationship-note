import React from "react";
import { Thing } from "../core/thing";
import { ThingRepository } from "../core/thing_repository";
import { ThingListView } from "./ThingListView";

type Prop = {
  thingRepository: ThingRepository;
};
export const SearchThingsByNamePart: React.FC<Prop> = props => {
  const [namePart, setNamePart] = React.useState("");
  // 副作用によってStateを更新することで、コンポーネントに変化を要求できる
  const [, setCount] = React.useState(0);

  const countUp = (): void => {
    setCount(c => c + 1);
  };
  const filtered = ((): Thing[] => {
    if (namePart.length < 1) {
      return [];
    }
    return props.thingRepository.query(thing =>
      thing.name.value.includes(namePart)
    );
  })();

  React.useEffect(() => {
    props.thingRepository.subscribe(countUp);
    return (): void => {
      props.thingRepository.unsubscribe(countUp);
    };
  });

  return (
    <div>
      <label>
        Thingの名前で検索
        <input
          type="text"
          value={namePart}
          onChange={(e): void => {
            setNamePart(e.target.value);
          }}
        />
      </label>
      <ThingListView things={filtered}></ThingListView>
    </div>
  );
};
