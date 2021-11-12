import React from 'react';
import {images} from "../../assets/images";
import {OneMessage, OneUser} from "../../reducers/types";

interface ListUserInterface {
    user: OneUser
    messages: OneMessage[] | undefined
}

const ListUser = (props: ListUserInterface) => {
    const {userName, userId} = props.user
    const {messages = []} = props

    const lastMessage = messages.filter((message) => message.userId === userId)

    return (
        <div className={'user_wrapper'}>
            <div className="user_wrapper_ava ">
                <img className={'user_ava'} src={images.avatar} alt="avatar"/>
                <div className="user_ava_isActive blink"></div>
            </div>
            <div className="user_body">
                <div className="user_wrapper_name">{userName}</div>
                <div
                    className="user_wrapper_message">
                    {lastMessage.length !== 0 && lastMessage[lastMessage.length - 1].text}
                </div>
            </div>

        </div>
    );
};

export default ListUser;