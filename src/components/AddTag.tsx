import * as React from "react";

import IndexedDBAdapter from "../models/IndexedDBAdapter";
import TagRepository from "../models/TagRepository"

interface AddTagProps {
}

interface AddTagState {
    name:string;
}

export class AddTag extends React.Component<AddTagProps, AddTagState> {
    constructor(){
        super();
        this.state = {
            name: "",
        }
    }
    handleChange(event:React.FormEvent<HTMLInputElement>){
        event.preventDefault();
        let input = event.target as HTMLInputElement;
        this.setState({
            name: input.value
        });
    }
    onSubmit(name: string) {
        const repo = new TagRepository(new IndexedDBAdapter());
        repo.add({name: name}).then(() => {
            console.log('added tag.');
            this.setState({
                name: ""
            });
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
                <input type="submit" value="Add tag"/>
            </form>
        );
    }
}
