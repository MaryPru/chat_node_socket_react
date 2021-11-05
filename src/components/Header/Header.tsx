import React from 'react';
import {images} from "../assets/images";
import "./Header.css"

const Header = () => {
    return (
        <div className={'header'}>

            <div className="user">
                <div className="user_info">
                    <img src={images.avatar} className="user_avatar"/>
                    <div className="user_name">Марина Прудыус</div>
                    <div className="user_status">
                       <div className="user_status_text">В сети</div>
                        <div className="user_status_isActive "></div>
                    </div>
                    <div className="user_isActive blink"></div>
                </div>
                <div className="user_button">
                    <img  className={'user_dots'} src={images.dots} alt=""/>
                </div>
            </div>
            <div className="title">
                <div className="title_text">Ваш чат</div>
            </div>
        </div>
    );
};

export default Header;