import * as React from "react";

import Config from "../configs/DataBase";
import Migrator from "../migration/Migrator"
import IDBConnector from "../infrastructure/IndexedDBConnector"
import IndexedDBAdapter from "../models/IndexedDBAdapter";

import SubjectRecord from "../interfaces/SubjectRecord";
import {SubjectList} from "../components/SubjectList";
import {AddSubject} from "../components/AddSubject";
import SubjectRepository from "../models/SubjectRepository"

interface AppState {
    subjects: SubjectRecord[];
}

export class App extends React.Component<undefined, AppState> {
    constructor() {
        super();
        this.state = {
            subjects: []
        };
        IDBConnector.open(Config, new Migrator())
            .then(() => {
                console.log('opened Database.', 'read subjects.');
            });
    }

    addSubject(name: string) {
    }

    render() {
        return (
            <div>
                <h1>The App!</h1>
                <AddSubject onSubmit={(name)=>{this.addSubject(name)}} ></AddSubject>
                <SubjectList />
            </div>
        );
    }
}
