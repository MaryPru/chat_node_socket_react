import React, {useEffect, useRef, useState} from 'react';
import "./ChatScreen.css"
import Clip from "../../assets/Icons/Clip";
import Microphone from "../../assets/Icons/Microphone";
import {images} from "../../assets/images";
import {RoomReducer} from "../../reducers/types";
import socket from "../../socket";
import MessageBlock from "./MessageBlock";
import moment from 'moment'
import Picker, {SKIN_TONE_NEUTRAL} from 'emoji-picker-react';
import AddFileBlock from "./AddFileBlock";
import {v4} from "uuid";

interface ChatScreenInterface {
    state: RoomReducer
}

export interface FilesInterface {
    id: string
    name: string
}

const ChatScreen = (props: ChatScreenInterface) => {
    const [messageValue, setMessageValue] = useState('')
    const {messages, users, userName, roomId, userId} = props.state
    const messagesEndRef = useRef(null);
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [statusEmoji, setStatusEmoji] = useState<boolean>(false);
    const [files, setFiles] = useState<FilesInterface[]>([])

    const onEmojiClick = (event: any, emojiObject: any) => {
        setChosenEmoji(emojiObject);
        // @ts-ignore
        if (chosenEmoji?.emoji !== undefined) {
            // @ts-ignore
            setMessageValue(chosenEmoji?.emoji)
            setMessageValue((prevState => messageValue + prevState))
        }
    };

    const scrollToBottom = () => {
        //@ts-ignore
        messagesEndRef.current.scrollIntoView({behavior: "smooth"});
    };

    useEffect(scrollToBottom, [messages]);

    const onSendMessage = () => {
        let value = messageValue
        if (files.length) {
            value = `${value} ${files.map((file) => file).join(',')}`
        }
        if (value !== '') {
            socket.emit('ROOM_NEW_MESSAGE', {
                roomId,
                userName,
                text: value,
                userId,
                time: moment().format("LT")
            })
            setMessageValue('')
            setFiles([])
            setStatusEmoji(false)
        }
    }

    const onEnter = (event: any) => {
        if (event.which === 13 || event.keyCode === 13 || event.key === "Enter") {
            onSendMessage();
        }
    }

    const handleDeleteFile = (id: string) => {
        const withoutFile = files.filter((item) => item.id !== id)
        setFiles([...withoutFile])

    }

    return (
        <div className={'chat'}>
            <div className="chat_screen">
                {messages.map((message) => (
                    <MessageBlock
                        message={message}
                        users={users}
                        myUserId={userId}
                    />
                ))}
                <div className={'addFileBlock'}>
                    {
                        files.length !== 0 && files.map((file, index) =>
                            <AddFileBlock
                                key={index}
                                handleDeleteFile={handleDeleteFile} file={file}
                            />
                        )
                    }
                </div>
                <div ref={messagesEndRef}/>
            </div>
            <div className="chat_message">
                <input
                    type="text"
                    className={"chat_input"}
                    placeholder={'Your message'}
                    value={messageValue}
                    onChange={(event) => setMessageValue(event.target.value)}
                    onKeyPress={onEnter}
                />
                <div className="chat_icons">
                    <div className="chat_icons_add">
                        <input
                            className={'addFile'}
                            type="file"
                            onChange={(event) => setFiles((current) =>
                                [...current, {
                                    id: v4(),
                                    name: event.target.value
                                }])}
                        />
                        <div className={'addClip'}>
                            <Clip/>
                        </div>
                    </div>
                    <Microphone/>
                    <img
                        className={'smile'}
                        src={images.smile}
                        alt="smile"
                        onClick={() => setStatusEmoji(!statusEmoji)}
                    />

                </div>
                <div onClick={onSendMessage} className="chat_sendButton">
                    <button>Send</button>
                    <img className={'chat_screen_img'} src={images.send} alt="send"/>
                </div>
                <div className={statusEmoji ? 'pickerVisible' : 'pickerInvisible'}>
                    <Picker
                        onEmojiClick={onEmojiClick}
                        pickerStyle={{width: '100%'}}
                        skinTone={SKIN_TONE_NEUTRAL}
                        groupNames={{smileys_people: "PEOPLE"}}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChatScreen;