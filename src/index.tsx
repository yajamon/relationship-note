import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";
import Config from "./configs/DataBase";
import IndexedDBAdapter from "./models/IndexedDBAdapter";

const dbAdapter = new IndexedDBAdapter();
dbAdapter.open(Config);

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("mainApp")
);
