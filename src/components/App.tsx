import * as React from "react";

import Config from "../configs/DataBase";
import Migrator from "../migration/Migrator"
import IDBConnector from "../infrastructure/IndexedDBConnector"
import IndexedDBAdapter from "../models/IndexedDBAdapter";

import {SubjectList} from "../components/SubjectList";
import {AddSubject} from "../components/AddSubject";

interface AppState {
}

export class App extends React.Component<undefined, AppState> {
    constructor() {
        super();
        this.state = {
        };
        IDBConnector.open(Config, new Migrator())
            .then(() => {
                console.log('opened Database.', 'read subjects.');
            });
    }

    render() {
        return (
            <div>
                <h1>The App!</h1>
                <AddSubject></AddSubject>
                <SubjectList />
            </div>
        );
    }
}
