import * as React from "react";

import Config from "../configs/DataBase";
import Migrator from "../migration/Migrator"
import IDBConnector from "../infrastructure/IndexedDBConnector"

import {SubjectList} from "../components/SubjectList";
import {AddSubject} from "../components/AddSubject";

interface AppState {
}

export class App extends React.Component<undefined, AppState> {
    constructor() {
        super();
        this.state = {
        };
        IDBConnector.open(Config, new Migrator());
    }

    render() {
        return (
            <div>
                <h1>The App!</h1>
                <AddSubject />
                <SubjectList />
            </div>
        );
    }
}
