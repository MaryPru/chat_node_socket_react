import React, {useEffect, useRef} from 'react';
import './ChatScreen.css'
import {OneMessage, OneUser} from "../../reducers/types";

interface MessageBlockInterface {
    message: OneMessage
    users:OneUser[]
    myUserId: string
}

const MessageBlock = (props: MessageBlockInterface) => {
    const {text, userName, userId} = props.message




    return (
        <div  className ={userId === props.myUserId? 'wrapper_message_yourSelf':'wrapper_message'}>
            <div className={'message_block'}>
                <div className="message_text">{text}</div>
            </div>
            <div className="message_user">{userName}</div>
        </div>

    );
};

export default MessageBlock;