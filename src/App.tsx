import React, {useEffect, useReducer} from 'react';
import './App.css';
import Header from "./components/Header/Header"
import List from "./components/List/List";
import ChatScreen from "./components/ChatScreen/ChatScreen";
import User from "./components/User/User";
import AuthForm from "./components/AuthForm/AuthForm";
import socket from './socket'
import socketClient from 'socket.io-client'
import reducer from './reducers/reducer'
import {Provider, useDispatch} from "react-redux";
import {OneMessage, OneUser, Room, RoomReducer} from "./reducers/types";
import Chat from "./components/Chat";
import axios from "axios";
import {v4} from "uuid";

function App() {
    const socket = socketClient("http://localhost:8888");
    const [state, dispatch] = useReducer(reducer, {
        joined: false,
        roomId: '',
        userName: '',
        users: [],
        messages: [],
        userId:''
    })

    const onLogin = async (obj: Room) => {
        const user = {
            ...obj,
            userId: v4()
        }
        socket.emit('ROOM_JOIN', user)
       const {data}= await axios.get(`/rooms/${obj.roomId}`)
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

    const addMessage = (message:OneMessage)=>{
        dispatch({
            type:'NEW_MESSAGE',
            payload:message
        })
    }
    useEffect(() => {
        socket.on('ROOM_SET_USERS', setUsers)
        socket.on('ROOM_NEW_MESSAGE',addMessage)
    }, [])

    console.log('state.messages',state.messages)

    return (
        <>
            {
                !state.joined && <AuthForm onLogin={onLogin}/>
            }

            {state.joined && <Chat state={state} />
            }
        </>


    );
}

export default App;
