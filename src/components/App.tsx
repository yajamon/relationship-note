import * as React from "react";

import Config from "../configs/DataBase";
import Migrator from "../migration/Migrator"
import IndexedDBAdapter from "../models/IndexedDBAdapter";

import SubjectRecord from "../interfaces/SubjectRecord";
import {Subject} from "../components/Subject";
import {AddSubject} from "../components/AddSubject";
import SubjectRepository from "../models/SubjectRepository"

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
                const repo = new SubjectRepository(this.dbAdapter);
                return repo.findAll();
            })
            .then((subjects: SubjectRecord[]) => {
                console.log('complete read subjects.');
                this.setState({
                    subjects: subjects
                });
            });
    }
    addSubject(name:string){
        const repo = new SubjectRepository(this.dbAdapter);
        repo.add({name: name}).then(() => {
            console.log('added subject.');
            const repo = new SubjectRepository(this.dbAdapter);
            return repo.findAll();
        }).then((subjects: SubjectRecord[]) => {
            console.log('complete read subjects.');
            this.setState({
                subjects: subjects
            });
        }).catch((reason) => {
            console.error('catch error:', reason);
        });
    }
    render() {
        return (
            <div>
                <h1>The App!</h1>
                <AddSubject onSubmit={(name)=>{this.addSubject(name)}} ></AddSubject>
                <Subject subjects={this.state.subjects} ></Subject>
            </div>
        );
    }
}
