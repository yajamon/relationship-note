import * as React from "react";

export interface ContentSet {
    key: number;
    conntent: any;
}

export interface OrderdListProps {
    contentList: ContentSet[];
}

export default function OrderdList(props: OrderdListProps) {
    const list = props.contentList.map(set => (<li key={set.key} >{set.conntent}</li>));
    return (
        <ol>{list}</ol>
    );
}
