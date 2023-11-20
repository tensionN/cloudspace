import React from 'react';
import './FileList.scss';
import File from "./file/File";
import {useFile} from "../../../modules/files/store";
const FileList = () => {
    const files = useFile(state => state.files).map(file => <File file={file} key={file._id}/>)
    return (
        <div className="filelist">
            <div className="filelist__header">
                <div className="filelist__name">Name</div>
                <div className="filelist__date">Date</div>
                <div className="filelist__size">Size</div>
            </div>
            {files}
        </div>
    );
};

export default FileList;