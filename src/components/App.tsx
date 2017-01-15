import * as React from "react";

import Config from "../configs/DataBase";
import Migrator from "../migration/Migrator"
import IndexedDBAdapter from "../models/IndexedDBAdapter";

export class App extends React.Component<undefined, undefined> {
    private dbAdapter = new IndexedDBAdapter();
    constructor() {
        super();
        this.dbAdapter.open(Config, new Migrator());
    }
    render() {
        return <h1>The App!</h1>;
    }
}
