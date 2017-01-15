import * as React from "react";

import Config from "../configs/DataBase";
import Migrator from "../migration/Migrator"
import IndexedDBAdapter from "../models/IndexedDBAdapter";

interface AppState {
    subjects: any[];
}

export class App extends React.Component<undefined, AppState> {
    private dbAdapter = new IndexedDBAdapter();
    constructor() {
        super();
        this.dbAdapter.open(Config, new Migrator());
        this.state = {
            subjects: []
        };

    }
    render() {
        return <h1>The App!</h1>;
    }
}
