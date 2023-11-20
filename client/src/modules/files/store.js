import create from "zustand";
import {devtools} from "zustand/middleware";

export const useFile = create( devtools((set,get) => ({
    files: [],
    currentDir: null,
    popupDisplay: "none",
    dirStack: [],
    setFiles: (files) => {
         set(() => ({files: files}))
    },
    setCurrentDir: (currentDir) => {
        set(() => ({currentDir: currentDir}))
    },
    addFile: (file) => {
        if(file !== undefined)
        set(() => ({files: [...get().files, file]}))
    },
    setPopupDisplay: (display) => {
      set(() => ({popupDisplay: display}))
    },
    pushToStack: (dir) => {
        set(() => ({dirStack: [...get().dirStack, dir]}))
    },
    deleteFile: (dirId) => {
        set(() => ({files: [...get().files.filter(file => file._id !== dirId)]}))
    }
})));