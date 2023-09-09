import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPlusLg, BsCheckLg, BsSquare } from 'react-icons/bs';
import { TodoContext } from './TodoProvider.jsx';
import PropTypes from 'prop-types';
import axios from 'axios';
import { addTodo, deleteTodo } from '../utils/api.js';
import Swal from 'sweetalert2';
import Empty from '../assets/empty.svg';

const { VITE_APP_API, VITE_APP_API_TODO } = import.meta.env;

const tabMapping = {
    "全部": "ALL",
    "未完成": "Pending",
    "已完成": "Finished"
};

const catchError = (error) => {
    const { response, code } = error;
    const { data } = response;
    const { message } = data;
    return Swal.fire({
        icon: "error",
        title: code,
        text: message || data
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

const List = ({list, deleteItem}) => {
    const todoList = list;
    const [tab, setTab] = useState("ALL");

    const className = text => text == tab ? "active" : "";
    const switchTab = e => setTab(tabMapping[e.target.innerText]);

    const handleDelete = e => {
        const { id } = e.target;
        deleteItem(id);
    }

    return (
        <div className='todo-list w-full mt-4'>
            <div className="flex flex-col w-full">
                <div className="todo-tab text-center grid grid-cols-3 w-full">
                    <button className={className("ALL")} onClick={switchTab}>全部</button>
                    <button className={className("Pending")} onClick={switchTab}>未完成</button>
                    <button className={className("Finished")} onClick={switchTab}>已完成</button>
                </div>
                <ul className='w-full px-8 pb-8'>
                    {todoList.map(item => {
                        const { id, content, status } = item;

                        return (
                            <li key={id} className="todo-item py-4 flex items-center">
                                {status 
                                    ? <BsCheckLg className='mr-4' /> 
                                    : <BsSquare className='mr-4 cursor-pointer' /> 
                                }
                                {content}
                                <button id={id} className='btn-delete absolute right-0' onClick={handleDelete}>
                                    +
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
};
List.propTypes = {
    list: PropTypes.array.isRequired,
    deleteItem: PropTypes.func.isRequired
};

const TodoList = () => {
    const { token } = useContext(TodoContext);
    const [ list, setList ] = useState([]);
    const [ content, setContent ] = useState("");
    const [ reset, setReset] = useState(true);
    const navigate = useNavigate();

    const triggerReset = () => setReset(!reset);

    const handleChange = e => setContent(e.target.value);
    const handlePlus = async () => {
        try {
            await addTodo(token, content);
            setContent("");
            triggerReset();
        } catch (error) {
            await catchError(error);
        } 
    };

    const deleteItem = async (id) => {
        try {
            await deleteTodo(token, id);
            triggerReset();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${VITE_APP_API}/${VITE_APP_API_TODO}`, {
                    headers: {
                        Authorization: token
                    }
                });
                console.log(response);
                const { data } = response.data
                setList(data);
            } catch(error) {
                catchError(error);
                navigate("/sign-in");
            }
        })();
    }, [navigate, token, reset]);

    return (
        <div className="flex flex-col justify-center items-center w-full todo-container">
            <div className="flex input-todo w-full items-center">
                <input type="text" value={content}  onChange={handleChange} className="w-full" placeholder="新增待辦事項"/>
                <button className="btn-plus btn-primary absolute w-10 !px-2.5 right-1" onClick={handlePlus}>
                    <BsPlusLg />
                </button>
            </div>
            {!list.length 
                ? <TodoEmpty /> 
                : <List list={list} deleteItem={deleteItem} />
            }
        </div>
    )
};

export default TodoList;