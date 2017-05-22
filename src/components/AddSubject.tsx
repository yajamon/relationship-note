import * as React from "react";

import IndexedDBAdapter from "../models/IndexedDBAdapter";
import SubjectRepository from "../models/SubjectRepository"

interface AddSubjectState {
    name:string;
}

export class AddSubject extends React.Component<undefined, AddSubjectState> {
    constructor(){
        super();
        this.state = {
            name: ""
        };
    }
    handleChange(event:React.FormEvent<HTMLInputElement>){
        event.preventDefault();
        let input = event.target as HTMLInputElement;
        this.setState({
            name: input.value
        });
    }
    onSubmit(name: string) {
        const repo = new SubjectRepository(new IndexedDBAdapter());
        repo.add({name: name}).then(() => {
            console.log('added subject.');
        }).catch((reason) => {
            console.error('catch error:', reason);
        });
    }

    render(){
        return (
            <form onSubmit={(event)=>{event.preventDefault(); this.onSubmit(this.state.name)}}>
                <input type="text"
                    value={this.state.name}
                    onChange={(event)=>{this.handleChange(event)}}
                />
                <input type="submit" value="Add subject"/>
            </form>
        );
    }
}
