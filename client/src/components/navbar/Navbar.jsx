import React from 'react';
import {NavLink} from "react-router-dom";
import "./Navbar.scss";
import {useUser} from "../../modules/users/store";

const Navbar = () => {
    const isAuth = useUser(state => state.isAuth);
    const logoutUser = useUser(state => state.logoutUser)
    return (
        <div className="Navbar">
           <div className="Navbar__container">
               <div className="Navbar__logo">CloudSpace</div>
               <div className="Navbar__links">

                   {!isAuth && <NavLink style={{color: 'white', textDecoration: "none"}} to={"/login"}>Login</NavLink>}
                   {!isAuth && <NavLink style={{color: 'white', textDecoration: "none"}} to={"/register"}>Register</NavLink>}
                   {isAuth && <NavLink onClick={() => logoutUser()} style={{color: 'white', textDecoration: "none"}} to={"/"}>Log out</NavLink>}
               </div>
           </div>
        </div>
    );
};

export default Navbar;