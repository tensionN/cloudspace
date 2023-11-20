import React, {useState} from 'react';
import Input from "../input/Input";
import Button from "../button/Button";
import {useFile} from "../../modules/files/store";
import {createDir} from "../../actions/file";
const Popup = () => {
    const [dirName, setDirName] = useState("");
    const popupDisplay = useFile(state => state.popupDisplay)
    const setPopupDisplay = useFile(state => state.setPopupDisplay)
    const addFile = useFile(state => state.addFile)
    const currentDir = useFile(state => state.currentDir)

    function createFolderHandler() {
        createDir(currentDir, dirName).then(data => addFile(data))
        setDirName("");
        setPopupDisplay("none");
    }

    return (
        <div className="popup" onClick={() => setPopupDisplay("none")} style={{display: popupDisplay}}>
            <div className="popup__content" onClick={e => e.stopPropagation()}>
                <div className="popup__header">
                    <div className="popup__title">Create new folder</div>
                    <Button onClick={() => setPopupDisplay("none")} className="popup__close">X</Button>
                </div>
                <Input value={dirName} onChange={e => setDirName(e.target.value)} type="text" placeholder="Enter name of folder..."/>
                <Button onClick={() => createFolderHandler()}>Create</Button>
            </div>
        </div>
    );
};

export default Popup;