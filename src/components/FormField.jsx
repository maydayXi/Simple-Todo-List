import { useState, useEffect } from "react"
import PropTypes from 'prop-types';
import InvalidText from "./InvalidText";

/**
 * Form validation state
 */
const formError = {
    email: false,
    nickname: false,
    password: false,
    confirmPassword: false
};

/**
 * FormField component
 * @param {object} param0 input id, name, type, placeholder, label text and form handler
 * @returns label and input
 */
const FormField = ({inputProps, label, handleForm, resetError}) => {
    const {id, name, type, placeholder} = inputProps;
    const [value, setValue] = useState("");

    useEffect(() => {
        handleForm({[name]: value});
    }, [value]);

    useEffect(() => {
        if(resetError) Object.keys(formError).forEach(key => formError[key] = !resetError)
    }, [resetError])

    const handleInput = e => {
        formError[e.target.name] = !e.target.value;
        setValue(e.target.value);
    };

    return (
        <>
            <label htmlFor={id} className="w-full inline-block pb-1">{label}</label>
            <input type={type} id={id} name={name} className='w-full leading-6 mb-1' 
                placeholder={placeholder} 
                value={value} onChange={handleInput} />
            {formError[name] ? <InvalidText text="此欄不可為空白" /> : null }
        </>
    );
};

FormField.propTypes = {
    inputProps: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    handleForm: PropTypes.func.isRequired,
    resetError: PropTypes.bool.isRequired
};

export default FormField;