import { useState } from "react";
import InvalidText from './InvalidText.jsx';
import PropType from 'prop-types';
import axios from "axios";
import Swal from 'sweetalert2'
import "../styles/login-form.css"

const { VITE_APP_API, VITE_APP_API_SIGN_IN } = import.meta.env;

const LoginForm = ({toggleLogin}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);

    /**
     * Input event
     * @param {object} e 
     */
    const handleInput = e => {
        const { name, value } = e.target;
        name === "email" 
            ? value ? setEmailValid(true) : setEmailValid(false)
            : value ? setPasswordValid(true) : setPasswordValid(false);

        name === "email" ? setEmail(value) : setPassword(value);
    };

    /**
     * Toggle component with sign in
     * @returns {null}
     */
    const handleSignIn = () => toggleLogin(false);

    /**
     * Login event
     */
    const handleLogin = () => {
        if(email && password) {
            (async () => {
                try {
                    const response = await axios.post(`${VITE_APP_API}/${VITE_APP_API_SIGN_IN}`, {
                        email,
                        password
                    });

                } catch(err) {
                    const { response } = err;
                    console.log(response);
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
                } finally {
                    setEmail("");
                    setPassword("");
                    setEmailValid(true);
                    setPasswordValid(true);
                }
            })();
        } else {
            !email ? setEmailValid(false) : setEmailValid(true);
            !password ? setPasswordValid(false) : setPasswordValid(true);
        }
    };

    return (
        <>
            <h1 className='text-2xl'>最實用的線上代辦事項服務</h1>
            <div id="loginForm" className='flex flex-col flex-1 justify-around items-center'>
                <div className="input-group w-full">
                    <label htmlFor="inputEmail" className="w-full inline-block pb-1">Email</label>
                    <input type="email" id="inputEmail" name="email"
                        className='w-full leading-6 mb-1' placeholder="請輸入Email" value={email} onChange={handleInput} />
                    {emailValid ? null : <InvalidText text="此欄不可為空白" /> }
                </div>
                <div className="input-group w-full">
                    <label htmlFor="inputPassword" className="w-full inline-block pb-1">Password</label>
                    <input type="password" id="inputPassword" name="password"
                        className='w-full leading-6 mb-1' placeholder="請輸入密碼" value={password} onChange={handleInput} />
                    {passwordValid ? null : <InvalidText text="此欄不可為空白" /> }
                </div>
                <button id="btnLogin" className='w-2/5' onClick={handleLogin}>
                    登入
                </button>
                <button id="btnSignIn" className='w-2/5' onClick={handleSignIn} >
                    註冊帳號
                </button>
            </div>
        </>
    );
};

LoginForm.propTypes = {
    toggleLogin: PropType.func.isRequired
};

export default LoginForm;