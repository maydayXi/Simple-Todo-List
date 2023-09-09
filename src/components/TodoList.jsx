import { useContext, useEffect, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { TodoContext } from './TodoProvider.jsx';
import axios from 'axios';
import Empty from '../assets/empty.svg';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const { VITE_APP_API, VITE_APP_API_TODO } = import.meta.env;

/**
 * Icon style
 */
const iconStyle = {
    width: "20px",
    height: "20px",
    strokeWidth: "2px"
};

const catchError = async (error) => {
    const { response, code } = error;
    const { data } = response;
    await Swal.fire({
        icon: "error",
        title: code,
        text: data
    });
}

const TodoEmpty = () => {
    return (
        <div className="text-center mt-16">
            <h3 className='mb-6'>
                目前尚無待辦事項
            </h3>
            <img src={Empty} alt="empty" />
        </div>
    );
}

const TodoList = () => {
    const { token } = useContext(TodoContext);
    const [ list, setList ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${VITE_APP_API}/${VITE_APP_API_TODO}`, {
                    headers: {
                        Authorization: token
                    }
                });
                console.log(response);
                const { data } = response;
                setList(data.data);
            } catch(error) {
                catchError(error);
                navigate("/sign-in");
            }
        })();
    });

    return (
        <div className="flex flex-col justify-center items-center w-full todo-container">
            <div className="flex input-todo w-full items-center">
                <input type="text" className="w-full" placeholder="新增待辦事項"/>
                <button className="btn-primary absolute w-10 !px-2.5 right-1">
                    <BsPlusLg style={iconStyle} />
                </button>
            </div>
            {list ? <TodoEmpty /> : "Todo List"}
        </div>
    )
};

export default TodoList;