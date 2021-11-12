import React, {useEffect, useReducer, useState} from 'react';
import './App.css';
import AuthForm from "./components/AuthForm/AuthForm";
import socketClient from 'socket.io-client'
import reducer from './reducers/reducer'
import {OneMessage, OneUser, Room} from "./reducers/types";
import Chat from "./components/Chat";
import axios from "axios";
import {v4} from "uuid";

interface JoinedUser {
    roomId: string,
    userName: string,
    userId: string
}

function App() {
    const socket = socketClient("http://localhost:8888");
    const [state, dispatch] = useReducer(reducer, {
        joined: false,
        roomId: '',
        userName: '',
        users: [],
        messages: [],
        userId: ''
    })

    const [joinedUser, setJoinedUser] = useState<JoinedUser>()

    const onLogin = async (obj: Room) => {
        const user = {
            ...obj,
            userId: v4()
        }
        socket.emit('ROOM_JOIN', user)
        socket.emit('ROOM_SET_NEW_USER', {
            userId: user.userId,
            roomId: state.roomId
        })

        const {data} = await axios.get(`/rooms/${obj.roomId}`)
        setUsers(data.users)
        dispatch({
            type: 'JOINED',
            payload: user
        });
    };

    const setUsers = (users: OneUser[]) => {
        dispatch({
            type: 'SET_USERS',
            payload: users
        })
    }

    const addMessage = (message: OneMessage) => {
        dispatch({
            type: 'NEW_MESSAGE',
            payload: message
        })
    }

    const setUser = (user: JoinedUser) => {
        setJoinedUser(undefined)
        setJoinedUser(user)
    }

    useEffect(() => {
        socket.on('ROOM_SET_USERS', setUsers)
        socket.on('ROOM_NEW_MESSAGE', addMessage)
        socket.on('ROOM_SET_NEW_USER', setUser)
    }, [])

    return (
        <div className={'wrapper_app'}>
            {
                !state.joined && <AuthForm onLogin={onLogin}/>
            }
            {
                state.joined && <Chat state={state}/>
            }
            {
                joinedUser && state.joined && joinedUser.userId !== state.userId &&
                <div className="notification">К нам подключился {joinedUser.userName}</div>
            }
        </div>
    );
}

export default App;
