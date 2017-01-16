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
    render(){
        return (
            <form onSubmit={(event)=>{event.preventDefault();}}>
            </form>
        );
    }
}
