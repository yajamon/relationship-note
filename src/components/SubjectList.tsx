import * as React from "react";

import SubjectRecord from "../interfaces/SubjectRecord";

interface SubjectStatus {
    subjects: SubjectRecord[];
}

export class SubjectList extends React.Component<undefined, SubjectStatus> {
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
