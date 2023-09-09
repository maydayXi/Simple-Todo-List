import { useContext, useEffect } from "react";
import { TodoContext } from '../components/TodoProvider.jsx';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Content from "../layout/Content";
import LogoText from '../assets/logo-text.svg';
import TodoList from "../components/TodoList.jsx";

const { 
    VITE_APP_API, 
    VITE_APP_API_CHECK_OUT, 
    VITE_APP_API_SIGN_OUT
} = import.meta.env;

const catchError = async (error) => {
    const { code, response } = error;
    const { data } = response;
    const { message } = data;
    await Swal.fire({
        icon: "error",
        title: code,
        html: message.join("<br />")
    });
};

const Todo = () => {
    const { userName, token, setToken, setUserName } = useContext(TodoContext);
    const navigate = useNavigate();
    
    /**
     * Sign out event
     */
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
                catchError(error);
                setToken("");
                setUserName("");
                navigate("/sign-in");
            }
        })();
    };

    useEffect(() => {
        document.title = "Todo List";
        (async () => {
            try {
                const response = await axios.get(`${VITE_APP_API}/${VITE_APP_API_CHECK_OUT}`, {
                    headers: {
                        Authorization: token
                    }
                });
                const { data } = response;
                const { status } = data;
                if (!status) handleSignOut();
            } catch(error) {
                catchError(error);
                handleSignOut();
            }
        })();
    });

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
                <TodoList />
            </Content>
        </div>
    );
};

export default Todo;