import * as React from "react";

import IndexedDBAdapter from "../models/IndexedDBAdapter";
import SubjectRepository from "../models/SubjectRepository"

import SubjectRecord from "../interfaces/SubjectRecord";

import {Observer} from "../interfaces/Observer"
import observable from "../infrastructure/IndexedDBStoreObservable"

import OrderedList, {ContentSet} from "./OrderedList"

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
        const contentList: ContentSet[] = this.state.subjects.map((subject) => {
            return {
                key: subject.id,
                content: subject.name
            };
        });
        return (
            <OrderedList contentList={contentList} />
        );
    }
}
