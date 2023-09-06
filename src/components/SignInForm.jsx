import { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import FormField from "./FormField.jsx";
import { useNavigate } from "react-router-dom";

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

/**
 * LoginForm component
 * @param {object} param0 toggle login form method and login state(force form field error reset)
 * @returns Login form
 */
const SignInForm = () => {
    const navigate = useNavigate();

    const [resetError, setResetError] = useState(true);
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    useEffect(() => { document.title = "Sign In - Todo List"; });

    /**
     * Toggle component with sign in
     * @returns {null}
     */
    const handleSignUp = () => {
        setResetError(true);
        navigate("/sign-up");
    }

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
                            return;
                        }
                    });
                }
            })();
        } else {
            !form.email 
                ? Swal.fire("Oops", "請輸入 Email", "error") 
                : Swal.fire("Oops", "請輸入密碼", "error");
        }
    };

    return (
        <div id="loginForm" className='flex flex-col flex-1 justify-evenly items-center'>
            <h1 className='text-2xl mt-4'>最實用的線上代辦事項服務</h1>
            {loginInputs.map(input => {
                const { label, ...rest } = input;
                return (
                    <div className="input-group w-full" key={input.id}>
                        <FormField inputProps={rest} label={label} handleForm={updateForm} resetError={resetError} />
                    </div>
                );
            })}
            <button className='w-3/6 btn-primary' onClick={handleLogin}>
                登入
            </button>
            <button className='w-3/6 btn-secondary' onClick={handleSignUp} >
                註冊帳號
            </button>
        </div>
    );
};

export default SignInForm;