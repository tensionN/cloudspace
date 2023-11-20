import React, {useEffect, useState} from 'react';
import FileList from "./fileList/FileList";
import './Cloud.scss';
import {useFile} from "../../modules/files/store";
import {createDir, getFiles, uploadFile} from "../../actions/file";
import Popup from "./Popup";
import Button from "../button/Button";
import Input from "../input/Input";
import Loader from "../loader/Loader";
const Cloud = () => {
    const {setFiles,
        currentDir,
        setPopupDisplay,
        dirStack,
        setCurrentDir,
        addFile
    } = useFile((state) => ({
        setFiles: state.setFiles,
        currentDir: state.currentDir,
        setPopupDisplay: state.setPopupDisplay,
        dirStack: state.dirStack,
        setCurrentDir: state.setCurrentDir,
        addFile: state.addFile
    }));

    const [dragEnter, setDragEnter] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getFiles(currentDir).then(data => {
            setFiles(data);
            setLoading(false);
        })
    }, [currentDir]);

    function showPopupHandler() {
        setPopupDisplay("flex");
    }

    function backClickHandler() {
        const backDirId = dirStack.pop();
        setCurrentDir(backDirId)
    }

    function fileUploadHandler(event) {
        const files = [...event.target.files];
        files.forEach(file => uploadFile(file, currentDir).then(data => addFile(data)))
    }

    function dragEnterHandler(event){
        event.stopPropagation();
        event.preventDefault();
        setDragEnter(true);
    }
    function dragLeaveHandler(event){
        event.stopPropagation();
        event.preventDefault();
        setDragEnter(false);
    }

    function dropHandler(event) {
        event.stopPropagation();
        event.preventDefault();
        let files = [...event.dataTransfer.files];
        setDragEnter(false);
        files.forEach(file => uploadFile(file, currentDir).then(data => addFile(data)))
    }

    return (
        loading ? <Loader/> :
        !dragEnter ?
        <div className="Cloud" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            <div className="Cloud__btns">
                <Button onClick={() => backClickHandler()}>Back</Button>
                <Button onClick={() => showPopupHandler()}>Create folder</Button>
                <div className="Cloud__upload">
                    <Input multiple={true} onChange={(event) => fileUploadHandler(event)} type="file" id="uploadfile" label="Upload File"/>
                </div>
            </div>
            <FileList/>
            <Popup/>
        </div>
            :
            <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                Drag and drop files here
            </div>
    );
};

export default Cloud;