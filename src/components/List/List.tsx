import React from 'react';
import "./List.css"
import ListUser from "./ListUser";
import {OneMessage, OneUser, RoomReducer} from "../../reducers/types";

interface ListInterface {
    state: RoomReducer
}

const List = (props: ListInterface) => {
    const {messages, users, userId} = props.state

    const lastMessage = messages.find((message) => message.userId === userId)
    return (
        <div className={"list"}>
            {
                users.map((user) => (
                        <ListUser user={user} messages={messages} />
                    )
                )
            }
        </div>
    );
};

export default List;