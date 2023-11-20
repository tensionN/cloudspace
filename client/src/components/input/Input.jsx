import React from 'react';
import "./Input.scss";
const Input = ({...props}) => {
    return (
        <>
            <div className="Input">
                <input multiple={props.multiple} value={props.value} onChange={props.onChange} placeholder={props.placeholder} id={props.id} type={props.type}/>
                <label htmlFor={props.id}>{props.label}</label>
            </div>
        </>
    );
};

export default Input;