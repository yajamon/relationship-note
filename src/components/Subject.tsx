import * as React from "react";

import SubjectRecord from "../interfaces/SubjectRecord";

export interface SubjectProps {
    subjects: SubjectRecord[];
}

export function Subject(props: SubjectProps) {
    const subjects = props.subjects.map((subject) => {
        return (
            <li key={subject.id} >{subject.name}</li>
        );
    });
    return (
        <ol>{subjects}</ol>
    );
}
