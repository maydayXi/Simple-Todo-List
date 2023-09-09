import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPlusLg, BsCheckLg } from 'react-icons/bs';
import { TodoContext } from './TodoProvider.jsx';
import PropTypes from 'prop-types';
import { addTodo, deleteTodo, getTodoList, toggleTodo, updateTodo } from '../utils/api.js';
import { showErrorDialog, showUpdateDialog } from '../utils/dialog.js';
import Empty from '../assets/empty.svg';

const tabMapping = {
    "全部": "ALL",
    "未完成": "Pending",
    "已完成": "Finished"
};

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

const List = ({list, deleteItem, updateItem, toggleItem}) => {
    const todoList = list;
    const [tab, setTab] = useState("ALL");

    const className = text => text == tab ? "active" : "";
    const switchTab = e => setTab(tabMapping[e.target.innerText]);

    const handleDelete = e => {
        const { id } = e.target;
        deleteItem(id);
    };

    const handleUpdate = async (e) => {
        const { id, innerText } = e.target;
        const result = await showUpdateDialog(innerText);

        const { isConfirmed, value } = result;
        if(isConfirmed) updateItem(id, value);
    };

    const handleChange = e => {
        const { value } = e.target;
        toggleItem(value);
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
                                    ? <BsCheckLg className='icon-check mr-4' /> 
                                    : <input type="checkbox" className='toggle-status mr-4 cursor-pointer' 
                                        value={id} onChange={handleChange} />
                                }
                                <p id={id} className="cursor-pointer" onClick={handleUpdate}>{content}</p>
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
    deleteItem: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
    toggleItem: PropTypes.func.isRequired
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
            await showErrorDialog(error);
        } 
    };

    const deleteItem = async (id) => {
        try {
            await deleteTodo(token, id);
            triggerReset();
        } catch (error) {
            showErrorDialog(error);
        }
    };

    const updateItem = async (id, content) => {
        try {
            await updateTodo(token, id, content);
            triggerReset();
        } catch (error) {
            showErrorDialog(error);
        }
    };

    const toggleItem = async (id) => {
        try {
            await toggleTodo(token, id);
            triggerReset();
        } catch (error) {
            showErrorDialog(error);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const data = await getTodoList(token);
                setList(data);
            } catch(error) {
                showErrorDialog(error);
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
                : <List list={list} deleteItem={deleteItem} updateItem={updateItem} toggleItem={toggleItem} />
            }
        </div>
    )
};

export default TodoList;