import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../utils/api';
import { showErrorDialog, showPasswordConfirmError, showSignUpFormValidateError } from '../utils/dialog';
import FormField from './FormField';

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
    const handleSignUp = useCallback(() => {
        if(Object.values(form).every(field => field)) {
            form.confirmPassword == form.password 
                ? (async () => {
                    try {
                        const result = await signUp(form);
                        // redirect to sign in page
                        if (result) navigate("/sign-in");
                    } catch (error) {
                        console.log(error);
                        await showErrorDialog(error);
                    }
                })()
                : showPasswordConfirmError();
        } else {
            showSignUpFormValidateError(form);
        }
    }, [form, navigate]);

    const handleKeyPress = useCallback(e => {
        const { keyCode } = e;
        if (keyCode == 13) handleSignUp();
    }, [handleSignUp]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [handleKeyPress]);

    useEffect(() => { document.title = "Sign Up"; });

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