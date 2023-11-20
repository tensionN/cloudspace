import React, {useRef, useState} from 'react';
import { useForm } from "react-hook-form";
import "./auth.scss";
import {NavLink} from "react-router-dom";
import {useUser} from "../../modules/users/store";
import {registration} from "../../actions/user";
import button from "../button/Button";
const Register = () => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const [loading, setLoading] = useState(false);
    const password = useRef({});
    password.current = watch("password", "");
    const {setUser, logoutUser} = useUser((state) => ({
        setUser: state.setUser,
        logoutUser: state.logoutUser
    }));

    const onSubmit = async data => {
        setLoading(true);
        registration(data.email, data.password).then(user => {
            user === undefined ? logoutUser() : setUser(user);
            setLoading(false);
        });
    };

    return (
        <div className="newAuth">
            <div className="auth_container">
                <h1>Register</h1>
                <p>Please fill in this form to create an account</p>
                <hr/>
                <form onSubmit={e => e.preventDefault()}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input className="auth__input" id="email" {...register("email", { required: 'Email is required',
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Please enter a valid email',
                            } })} />
                        {errors.email && <span className="auth__errors">{errors.email.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            className="auth__input"
                            id="password"
                            {...register("password", { required: "You must specify a password",
                            minLength: {
                                value: 8,
                                message: "Password must have at least 8 characters"
                            } })} />
                        {errors.password && <span className="auth__errors">{errors.password.message}</span>}
                    </div>
                   <div>
                       <label htmlFor="repeatpassword">Repeat password</label>
                       <input className="auth__input" id="repeatpassword" {...register("password_repeat", { required: "You must specify a password", validate: value =>
                               value === password.current || "The passwords do not match"
                        })} />
                       {errors.password_repeat && <span className="auth__errors">{errors.password_repeat.message}</span>}
                   </div>

                    <input className="auth__btn" type="submit" onClick={handleSubmit(onSubmit)}/>
                </form>
                <hr/>
                <p className="auth__footer">Already have an account? <NavLink to="/login">Sign in</NavLink></p>
            </div>
        </div>
    );
};

export default Register;