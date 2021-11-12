import React, {useState} from 'react';
import './ChatScreen.css'
import {images} from "../../assets/images";
import {FilesInterface} from "./ChatScreen";

interface AddFileBlockInterface {
    file: FilesInterface
    handleDeleteFile: (id: string) => void
}

// компонент прикрепленного файла
const AddFileBlock = (props: AddFileBlockInterface) => {
    const {file, handleDeleteFile} = props

    return (

        <div className="addFileName">
            {file.name} <img className={'clearIcon'} src={images.x} alt="x" onClick={() => handleDeleteFile(file.id)}/>
        </div>
    );
};

export default AddFileBlock;
