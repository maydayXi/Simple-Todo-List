import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import Swal from 'sweetalert2'
import FormField from "./FormField.jsx";

const { VITE_APP_API, VITE_APP_API_SIGN_IN } = import.meta.env;

const loginInputs = [
    {
        id: "inputEmail",
        name: "email",
        type: "email",
        placeholder: "請輸入Email",
        label: "Email",
    },
    {
        id: "inputPassword",
        name: "password",
        type: "password",
        placeholder: "請輸入密碼",
        label: "Password",
    }
];

const LoginForm = ({toggleLogin}) => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    useEffect(() => { document.title = "Sign In - Todo List"; });

    /**
     * Toggle component with sign in
     * @returns {null}
     */
    const handleSignIn = () => toggleLogin(false);

    const updateForm = field => {
        setForm(oldForm => ({
            ...oldForm,
            ...field
        }));
    };

    /**
     * Login event
     */
    const handleLogin = () => {
        if(form.email && form.password) {
            (async () => {
                try {
                    const response = await axios.post(`${VITE_APP_API}/${VITE_APP_API_SIGN_IN}`, form);
                    console.log(response);
                } catch(err) {
                    const { response } = err;
                    const { status, statusText, data } = response;
                    const { message } = data;
                    Swal.fire({
                        icon: "error",
                        title: statusText,
                        text: status == 404 ? `User ${statusText}` : message[0]
                    }).then(() => {
                        if (status == 404) {
                            toggleLogin(false);
                        }
                    });
                }
            })();
        }
    };

    return (
        <div id="loginForm" className='flex flex-col flex-1 justify-evenly items-center'>
            <h1 className='text-2xl mt-4'>最實用的線上代辦事項服務</h1>
            {loginInputs.map((input, i) => {
                const { label, ...rest } = input;

                return (
                    <div className="input-group w-full" key={i}>
                        <FormField inputProps={rest} label={label} handleForm={updateForm} />
                    </div>
                );
            })}
            <button className='w-3/6 btn-primary' onClick={handleLogin}>
                登入
            </button>
            <button className='w-3/6 btn-secondary' onClick={handleSignIn} >
                註冊帳號
            </button>
        </div>
    );
};

LoginForm.propTypes = {
    toggleLogin: PropTypes.func.isRequired
};

export default LoginForm;