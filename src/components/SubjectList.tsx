import * as React from "react";

import IndexedDBAdapter from "../models/IndexedDBAdapter";
import SubjectRepository from "../models/SubjectRepository"

import SubjectRecord from "../interfaces/SubjectRecord";

import {Observer} from "../interfaces/Observer"
import observable from "../infrastructure/IndexedDBStoreObservable"

interface SubjectStatus {
    subjects: SubjectRecord[];
}

export class SubjectList extends React.Component<undefined, SubjectStatus> implements Observer {

    constructor() {
        super();
        this.state = {
            subjects: []
        };
    }

    componentWillMount(){
        console.log("will mount");
        this.pullSubjects();
        observable.instance.addObserverToStore("subject", this);
    }
    componentWillUnmount(){
        console.log("will unmount");
        observable.instance.removeObserverByStore("subject", this);
    }

    pullSubjects(){
        const repo = new SubjectRepository(new IndexedDBAdapter());
        repo.findAll().then((subjects: SubjectRecord[]) => {
            console.log('complete read subjects.');
            this.setState({
                subjects: subjects
            });
        });
    }

    update() {
        this.pullSubjects();
    }

    render() {
        const subjects = this.state.subjects.map((subject) => {
            return (
                <li key={subject.id} >{subject.name}</li>
            );
        });
        return (
            <ol>{subjects}</ol>
        );
    }
}
