import * as React from "react";

import IndexedDBAdapter from "../models/IndexedDBAdapter";
import TagRepository from "../models/TagRepository"

import TagRecord from "../interfaces/TagRecord";

import {Observer} from "../interfaces/Observer"
import observable from "../infrastructure/IndexedDBStoreObservable"


interface TagListProps {
}

interface TagListState {
    tags: TagRecord[];
}

export class TagList extends React.Component<TagListProps, TagListState> {
    constructor(){
        super();
        this.state = {
            tags: [],
        }
    }


    componentWillMount(){
        console.log("will mount");
        this.pullTags();
        observable.instance.addObserverToStore("tag", this);
    }
    componentWillUnmount(){
        console.log("will unmount");
        observable.instance.removeObserverByStore("tag", this);
    }

    pullTags(){
        const repo = new TagRepository(new IndexedDBAdapter());
        repo.findAll().then((tags: TagRecord[]) => {
            console.log('complete read subjects.');
            this.setState({
                tags: tags
            });
        });
    }

    update() {
        this.pullTags();
    }

    render() {
        const tags = this.state.tags.map((tag) => {
            return (
                <li key={tag.id} >{tag.name}</li>
            );
        });
        return (
            <ol>{tags}</ol>
        );
    }
}
