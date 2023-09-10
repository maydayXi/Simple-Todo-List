import { useState, useEffect, useContext, useCallback } from "react";
import FormField from "./FormField.jsx";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "./TodoProvider.jsx";
import { signIn } from "../utils/api.js";
import { showEmailEmpty, showPasswordEmpty, showRedirectToSignIn, showUserNotFoundError } from "../utils/dialog.js";

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
    const { setToken, setUserName } = useContext(TodoContext);

    const [resetError, setResetError] = useState(true);
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

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
    const handleLogin = useCallback(() => {
        if(form.email && form.password) {
            (async () => {
                try {
                    const response = await signIn(form);
                    const { nickname, token } = response;
                    setToken(token);
                    setUserName(nickname); 
                    navigate("/todo");
                } catch(error) {
                    const status = await showUserNotFoundError(error);
                    
                    if (status == 404) {
                        await showRedirectToSignIn();
                        navigate("/sign-up");
                    }
                }
            })();
        } else {
            !form.email ? showEmailEmpty() : showPasswordEmpty();
        }
    }, [navigate, form, setUserName, setToken]);

    const handleKeyPress = useCallback(e => {
        const { keyCode } = e;
        if (keyCode == 13) handleLogin();
    }, [handleLogin]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [handleKeyPress]);

    useEffect(() => { document.title = "Sign In - Todo List"; });

    return (
        <div id="loginForm" className='flex flex-col flex-1 justify-evenly items-center'>
            <h1 className='text-2xl mt-4'>最實用的線上待辦事項服務</h1>
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