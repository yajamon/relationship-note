import * as React from "react";

export interface ContentSet {
    key: number;
    content: any;
}

export interface OrderdListProps {
    contentList: ContentSet[];
}

export default function OrderdList(props: OrderdListProps) {
    const list = props.contentList.map(set => (<li key={set.key} >{set.content}</li>));
    return (
        <ol>{list}</ol>
    );
}
