import React from 'react';
import {images} from "../../assets/images";
import "./User.css"
import {RoomReducer} from "../../reducers/types";

interface UserInterface{
    state:RoomReducer
}

const User = (props:UserInterface) => {
    const {userName}=props.state
    return (

        <div className="user">
            <div className="user_info">
                <div className="user_avatar_wrapper">
                    <img src={images.avatar} className="user_avatar"/>
                    <div className="user_isActive blink"></div>
                </div>

                <div className="user_name">{userName}</div>
                <div className="user_status">
                    <div className="user_status_text">В сети</div>
                    <div className="user_status_isActive "></div>
                </div>

            </div>
            <div className="user_button">
                <img className={'user_dots'} src={images.dots} alt=""/>
            </div>
        </div>

    );
};

export default User;