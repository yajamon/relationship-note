import * as React from "react";

export interface AddSubjectProps{
    onSubmit(name:string):void;
}

interface AddSubjectState {
    name:string;
}

export class AddSubject extends React.Component<AddSubjectProps, AddSubjectState> {
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
    render(){
        return (
            <form onSubmit={(event)=>{event.preventDefault();}}>
                <input type="text"
                    value={this.state.name}
                    onChange={(event)=>{this.handleChange(event)}}
                />
                <input type="submit" value="Add subject"/>
            </form>
        );
    }
}
