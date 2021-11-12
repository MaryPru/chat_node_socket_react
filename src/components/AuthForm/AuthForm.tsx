import React, {useState} from 'react';
import "./AuthForm.css"
import {images} from "../../assets/images";
import io from "socket.io-client";
import axios from "axios";
import {Room} from "../../reducers/types";

interface AuthProps {
    onLogin: (obj: Room) => void
}

const connectSocket = () => {
    io('http://localhost:8888')
}

// компонент авторизации нового пользователя
const AuthForm = (props: AuthProps) => {
    const {onLogin} = props
    const [roomId, setRoomId] = useState('')
    const [userName, setUserName] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onEnter = async () => {
        if (!userName || !roomId) {
            alert("Заполните пустые поля")
            return
        }
        const obj = {
            roomId,
            userName,
        }
        setIsLoading(true);
        await axios.post('http://localhost:8888/rooms', obj,
            {
                headers: {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
                    'Access-Control-Allow-Origin': 'http://localhost:8888'
                }
            });
        onLogin(obj);
        setIsLoading(false);
    }

    return (
        <div className={"auth_wrapper"}>
            <div className="auth">
                <div className="auth_header">
                    <img
                        className={'auth_header_img'}
                        src={images.head}
                        alt="head"
                        onClick={connectSocket}
                    />
                </div>
                <div className="auth_form">
                    <img className={'auth_login'} src={images.login}/>
                    <input type="text" className={'auth_input'}
                           placeholder={'your Name'}
                           value={userName}
                           onChange={(event) => setUserName(event.target.value)}
                    />
                    <input type={'text'} className={'auth_input'}
                           placeholder={'room id'}
                           value={roomId}
                           onChange={(event) => setRoomId(event.target.value)}
                    />
                    <button className={'auth_button'}
                            onClick={onEnter}
                            disabled={isLoading}>
                        {isLoading ? 'ENTER...' : 'LOGIN'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;