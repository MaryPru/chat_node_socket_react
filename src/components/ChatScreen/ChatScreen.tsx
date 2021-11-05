import React, {useEffect, useRef, useState} from 'react';
import "./ChatScreen.css"
import Clip from "../../assets/Icons/Clip";
import Microphone from "../../assets/Icons/Microphone";
import {images} from "../../assets/images";
import {OneMessage, RoomReducer} from "../../reducers/types";
import socket from "../../socket";
import MessageBlock from "./MessageBlock";

interface ChatScreenInterface {
    state: RoomReducer
}

const ChatScreen = (props: ChatScreenInterface) => {
    const [messageValue, setMessageValue] = useState('')
    const {messages, users, userName, roomId, userId} = props.state
    const messageRef = useRef(null)
/*
    useEffect(() => {
        messageRef?.current?.scroolTo(0, 99999)
    }, [messages])*/

    const onSendMessage = () => {
        socket.emit('ROOM_NEW_MESSAGE', {
            roomId,
            userName,
            text: messageValue,
            userId
        })
        setMessageValue('')
    }
    return (
        <div className={'chat'}>
            <div ref={messageRef} className="chat_screen">
                {messages.map((message) => (
                    <MessageBlock
                        message={message}
                        users={users}
                        myUserId={userId}
                    />
                ))}
            </div>

            <div className="chat_message">
                <input
                    type="text"
                    className={"chat_input"}
                    placeholder={'Your message'}
                    value={messageValue}
                    onChange={(event) => setMessageValue(event.target.value)}
                />
                <div className="chat_icons">
                    <Clip/>
                    <Microphone/>
                </div>
                <div onClick={onSendMessage} className="chat_sendButton">
                    <button>Send</button>
                    <img className={'chat_screen_img'} src={images.send} alt="send"/>
                </div>
            </div>
        </div>
    );
};

export default ChatScreen;