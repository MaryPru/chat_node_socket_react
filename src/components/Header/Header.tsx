import React from 'react';
import {images} from "../../assets/images";
import "./Header.css"

// компонент заголовка чата
const Header = () => {
    return (
        <div className={'header'}>
            <div className="title">
                <img className={'title_image'} src={images.head} alt=""/>
                <div className="title_text">Ваш чат</div>
            </div>
        </div>
    );
};

export default Header;