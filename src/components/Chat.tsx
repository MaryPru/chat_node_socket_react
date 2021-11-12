import React, {useState} from 'react';
import User from "./User/User";
import Header from "./Header/Header";
import List from "./List/List";
import ChatScreen from "./ChatScreen/ChatScreen";
import {RoomReducer} from "../reducers/types";

interface ChatInterface {
    state: RoomReducer
}

const Chat = (props: ChatInterface) => {
    const {state} = props

    return (
        <div className="app_wrapper">
            <div className="app_user">
                <User state={state}/>
            </div>
            <div className="app_header">
                <Header/>`
            </div>
            <div className="app_list">
                <List state={state}/>
            </div>
            <div className="app_chat">
                <ChatScreen state={state}/>
            </div>
        </div>
    );
};

export default Chat;