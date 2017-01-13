import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";
import Config from "./configs/DataBase";
import Migrator from "./migration/Migrator"
import IndexedDBAdapter from "./models/IndexedDBAdapter";

const dbAdapter = new IndexedDBAdapter();
dbAdapter.open(Config, new Migrator());

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("mainApp")
);
