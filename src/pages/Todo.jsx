import { useContext, useEffect } from "react";
import Content from "../layout/Content";
import LogoText from '../assets/logo-text.svg';
import { TodoContext } from '../components/TodoProvider.jsx';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const { VITE_APP_API, VITE_APP_API_CHECK_OUT, VITE_APP_API_SIGN_OUT } = import.meta.env;

const Todo = () => {
    const { userName, token, setToken, setUserName } = useContext(TodoContext);
    const navigate = useNavigate();
    
    const handleSignOut = () => {
        (async () => {
            try {
                const response = await axios.post(`${VITE_APP_API}/${VITE_APP_API_SIGN_OUT}`, {},
                {
                    headers: {
                        Authorization: token
                    }
                });
                const { data } = response;
                const { status, message } = data;
                await Swal.fire({
                    icon: status ? "success" : "error",
                    title: "Sign out",
                    text: message
                });
                setToken("");
                setUserName("");
                navigate("/sign-in");
            } catch(error) {
                console.log(error);
                const { code, response } = error;
                const { data } = response;
                const { message } = data;
                await Swal.fire({
                    icon: "error",
                    title: code,
                    html: message.join("<br />")
                });
            }

        })();

        // setToken("");
        // setUserName("");
    };

    useEffect(() => {
        document.title = "Todo List";
        (async () => {
            const response = await axios.get(`${VITE_APP_API}/${VITE_APP_API_CHECK_OUT}`, {
                headers: {
                    Authorization: token
                }
            });
            const { data } = response;
            const { status } = data;
            if (!status) handleSignOut();

        })();
    })

    return (
        <div className="todo">
            <nav className="flex py-6 px-12 w-full justify-between items-center">
                <img src={LogoText} alt="logo" />
                <div className="flex gap-x-10 items-center">
                    <h2 className="text-xl">{userName} 的待辦事項</h2>
                    <button onClick={handleSignOut}>
                        登出
                    </button>
                </div>
            </nav>
            <Content>
                <div>Todo</div>
            </Content>
        </div>
    );
};

export default Todo;