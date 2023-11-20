import create from "zustand";
import {devtools} from "zustand/middleware";

export const useUser = create(devtools(set => ({
    currentUser: {},
    isAuth: false,
    setUser: (user) => {
        set(() => ({currentUser: user, isAuth: true}))
    },
    logoutUser: () => {
        set(() => ({currentUser: {}, isAuth: false}));
        localStorage.removeItem("token");
    }
})));