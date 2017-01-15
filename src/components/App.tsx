import * as React from "react";

import Config from "../configs/DataBase";
import Migrator from "../migration/Migrator"
import IndexedDBAdapter from "../models/IndexedDBAdapter";

import SubjectRecord from "../interfaces/SubjectRecord";
import {Subject} from "../components/Subject";

interface AppState {
    subjects: SubjectRecord[];
}

export class App extends React.Component<undefined, AppState> {
    private dbAdapter = new IndexedDBAdapter();
    constructor() {
        super();
        this.state = {
            subjects: []
        };
        this.dbAdapter.open(Config, new Migrator())
            .then(() => {
                console.log('opened Database.', 'read subjects.');
                return this.dbAdapter.readAllSubject();
            })
            .then((subjects: SubjectRecord[]) => {
                console.log('complete read subjects.');
                this.setState({
                    subjects: subjects
                });
            });
    }
    render() {
        return (
            <div>
                <h1>The App!</h1>
                <Subject subjects={this.state.subjects} ></Subject>
            </div>
        );
    }
}
