import React, {useId} from "react";

function Input ({type, label, ...props}) {
    const id = useId()
    const InputComponent = type === 'textarea' ? 'textarea' : 'input'
    return <div>
        {label && <label htmlFor={id} className="form-label">{label}</label>}
        <InputComponent className="form-control" id={id} {...props}/>
    </div>
}
export default Input;
