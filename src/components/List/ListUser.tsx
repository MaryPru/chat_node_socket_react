import React from 'react';
import {images} from "../../assets/images";

const ListUser = () => {
    return (
        <div className={'user_wrapper'}>
            <div className="user_wrapper_ava">
                <img src={images.avatar} alt="avatar"/>
            </div>
          <div className="user_wrapper_name"></div>
          <div className="user_wrapper_message"></div>
        </div>
    );
};

export default ListUser;