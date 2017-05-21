import * as React from "react";

import Config from "../configs/DataBase";
import Migrator from "../migration/Migrator"
import IDBConnector from "../infrastructure/IndexedDBConnector"
import IndexedDBAdapter from "../models/IndexedDBAdapter";

import SubjectRecord from "../interfaces/SubjectRecord";
import {Subject} from "../components/Subject";
import {AddSubject} from "../components/AddSubject";
import SubjectRepository from "../models/SubjectRepository"

import {Observer} from "../interfaces/Observer"
import observable from "../infrastructure/IndexedDBStoreObservable"

interface AppState {
    subjects: SubjectRecord[];
}

export class App extends React.Component<undefined, AppState> implements Observer {
    private dbAdapter = new IndexedDBAdapter();
    constructor() {
        super();
        this.state = {
            subjects: []
        };
        IDBConnector.open(Config, new Migrator())
            .then(() => {
                console.log('opened Database.', 'read subjects.');
                this.pullSubjects();
            });
    }
    componentWillMount(){
        console.log("will mount");
        observable.instance.addObserverToStore("subject", this);
    }
    componentWillUnmount(){
        console.log("will unmount");
        observable.instance.removeObserverByStore("subject", this);
    }
    addSubject(name:string){
        const repo = new SubjectRepository(this.dbAdapter);
        repo.add({name: name}).then(() => {
            console.log('added subject.');
        }).catch((reason) => {
            console.error('catch error:', reason);
        });
    }
    update(){
        console.log('start update');
        this.pullSubjects();
    }
    pullSubjects(){
        const repo = new SubjectRepository(this.dbAdapter);
        repo.findAll().then((subjects: SubjectRecord[]) => {
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
                <AddSubject onSubmit={(name)=>{this.addSubject(name)}} ></AddSubject>
                <Subject subjects={this.state.subjects} ></Subject>
            </div>
        );
    }
}
