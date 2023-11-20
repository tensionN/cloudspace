import axios from 'axios';
import {useFile} from "../modules/files/store";

export const getFiles = async (dirId) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/files${dirId ? '?parent='+dirId : ''}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        })
        return response.data;
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const createDir = async (dirId, name) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/files`, {
            name,
            parent: dirId,
            type: 'dir'
        },{
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        })
        return response.data;
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const uploadFile = async (file, dirId) => {
    try {
        const formData = new FormData();
        formData.append("file",file);
        console.log(formData)
        if (dirId) {
            formData.append("parent", dirId);
        }
        const response = await axios.post(`http://localhost:5000/api/files/upload`, formData,{
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
            onUploadProgress: progressEvent => {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(percentCompleted)
            }
        })
        console.log(response.data)
        return response.data;
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const downloadFile = async (file) => {
   const response = await fetch(`http://localhost:5000/api/files/download?id=${file._id}`, {
       headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`
       }
   })
    console.log(response.status)
    if (response.status === 200) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
}

export const deleteFile = async (file) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/files/?id=${file._id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        useFile.getState().deleteFile(file._id);
    } catch (e) {
        alert(e.response.data.message)
    }
}