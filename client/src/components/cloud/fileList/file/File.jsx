import React from 'react';
import './File.scss';
import folderIcon from  "../../../../assets/folder.png";
import fileIcon from  "../../../../assets/file.png";
import {useFile} from "../../../../modules/files/store";
import {deleteFile, downloadFile} from "../../../../actions/file";
const File = ({file}) => {
    const setCurrentDir = useFile(state=> state.setCurrentDir)
    const currentDir = useFile(state => state.currentDir);
    const pushToStack = useFile(state => state.pushToStack)
    const deleteFileState = useFile(state => state.deleteFile)
    function openDirHandler() {
        if (file.type === "dir") {
            pushToStack(currentDir);
            setCurrentDir(file._id);
        }
    }

    function downloadClickHandler(e) {
        e.stopPropagation();
        downloadFile(file)
    }

    function deleteClickHandler(e) {
        e.stopPropagation();
        deleteFile(file)
        deleteFileState(file)
    }

    function getSize() {
        if (file.type !== "dir") {
            if ((file.size / 1024) < 1) {
                return "1 KB";
            } else if ((file.size / 1024) > 1024) {
                return (file.size / 1024 / 1024).toFixed(2) + " MB";
            } else return Math.round(file.size / 1024) + " KB";
        } else {
            return "-";
        }
    }

    return (
        <div onClick={() => openDirHandler(file)} className="file">
            <img src={file.type === "dir" ? folderIcon : fileIcon} alt="" className="file__img"/>
            <div className="file__name">{file.name}</div>
            <div className="file__date">{file.date.slice(0,10)}</div>
            <div className="file__size">{getSize()}</div>
            {file.type !== 'dir' && <button onClick={(e) => downloadClickHandler(e)} className="file__btn file__download"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg></button>}
            <button onClick={(e) => deleteClickHandler(e)} className="file__btn file__delete"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
        </div>
    );
};

export default File;