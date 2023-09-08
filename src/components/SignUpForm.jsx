import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import FormField from './FormField';

const { VITE_APP_API, VITE_APP_API_SIGN_UP } = import.meta.env;

/**
 * Sign up form input properties array
 */
const signUpInputs = [
    { id: "signInEmail", name: "email", type: "email", placeholder: "請輸入Email", label: "Email" },
    { id: "signInNickname", name: "nickname", type: "text", placeholder: "請輸入暱稱", label: "Nickname" },
    { id: "signInPassword", name: "password", type: "password", placeholder: "請輸入密碼", label: "Password" },
    { id: "confirmPassword", name: "confirmPassword", type: "password", placeholder: "請再次輸入密碼", label: "Confirm Password" }
];

/**
 * SignUpForm component
 * @param {object} param0 Sign up form props contain toggle form method and form state(force form field error reset)
 * @returns Sign up form
 */
const SignUpForm = () => {
    const navigate = useNavigate();
    const [resetError, setResetError] = useState(true);

    /**
     * form value object
     */
    const [form, setForm] = useState({
        email: "",
        nickname: "",
        password: "",
        confirmPassword: ""
    });

    /**
     * navigate to sign in page.
     */
    const handleLogin = () => {
        setForm({
            email: "", nickname: "", password: "", passwordConfirm: ""
        });
        setResetError(true);
        navigate("/sign-in");
    };

    /**
     * Update form value
     * @param {object} field form field contain name and value
     */
    const updateForm = field => {
        setForm(oldField => ({
            ...oldField,
            ...field
        }));
    };

    /**
     * Handle sign up event
     */
    const handleSignUp = () => {
        if(Object.values(form).every(field => field)) {
            form.confirmPassword == form.password 
                ? (async () => {
                    try {
                        let response = await axios.post(`${VITE_APP_API}/${VITE_APP_API_SIGN_UP}`, form);
                        const { statusText, config } = response;
                        const { data } = config;
                        const request = JSON.parse(data);
                        const user = request.nickname;
                        const result = await Swal.fire({
                            icon: "success",
                            title: statusText,
                            text: `${user} sign up success please login again`
                        });

                        if (result) navigate("/todo");

                    } catch (err) {
                        const { code, response } = err;
                        const { data } = response;
                        const { message } = data;
                        await Swal.fire({
                            icon: "error",
                            title: code,
                            text: message
                        });
                    }
                })()
                : Swal.fire("Oops", "兩次密碼輸入不一致", "error");
        } else {
            Swal.fire("Oops", `${Object.keys(form).map(key => !form[key] 
                ? `<p class='alert-text'>請輸入：[${key}]</p>` : "")
                .join("")}`, "error");
        }
    };

    useEffect(() => { document.title = "Sign Up"; })

    return (<>
        <div className="flex flex-col justify-between items-center">
            <h1 className="text-2xl inline-block">註冊帳號</h1>
            {signUpInputs.map(input => {
                const { label, ...rest } = input;
                return (
                    <div className="input-group w-full" key={input.id}>
                        <FormField inputProps={rest} label={label} handleForm={updateForm} resetError={resetError} />
                    </div>
                )
            })}
            <button className='btn-primary w-3/6' onClick={handleSignUp}>
                註冊帳號
            </button>
            <button className="btn-secondary w-3/6" onClick={handleLogin}>
                登入
            </button>
        </div>
    </>);
};

export default SignUpForm;