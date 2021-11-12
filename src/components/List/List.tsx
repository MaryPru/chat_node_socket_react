import React from 'react';
import "./List.css"
import ListUser from "./ListUser";
import {RoomReducer} from "../../reducers/types";

interface ListInterface {
    state: RoomReducer
}

const List = (props: ListInterface) => {
    const {messages, users} = props.state

    return (
        <div className={"list"}>
            {
                users.map((user) => (
                        <ListUser user={user} messages={messages}/>
                    )
                )
            }
        </div>
    );
};

export default List;