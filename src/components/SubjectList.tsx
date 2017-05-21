import * as React from "react";

import SubjectRecord from "../interfaces/SubjectRecord";

export interface SubjectProps {
    subjects: SubjectRecord[];
}

export class SubjectList extends React.Component<SubjectProps, undefined> {
    render() {
        const subjects = this.props.subjects.map((subject) => {
            return (
                <li key={subject.id} >{subject.name}</li>
            );
        });
        return (
            <ol>{subjects}</ol>
        );
    }
}
