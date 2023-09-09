import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPlusLg, BsCheckLg } from 'react-icons/bs';
import { TodoContext } from './TodoProvider.jsx';
import PropTypes from 'prop-types';
import { addTodo, deleteFinished, deleteTodo, getTodoList, toggleTodo, updateTodo } from '../utils/api.js';
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

const List = ({list, handleList}) => {
    /**
     * todo list
     * @type {Array<object>}
     */
    const todoList = list;
    const { deleteItem, updateItem, toggleItem, deleteFinishedItems } = handleList;
    const [tab, setTab] = useState("ALL");

    /**
     * Get className by text
     * @param {string} text Todo list tab text
     * @returns tab className
     */
    const isActive = text => text == tab ? "active" : "";
    /**
     * Get className by status
     * @param {boolean} status todo item status
     * @returns todo item className
     */
    const isFinished = status => "cursor-pointer "
        .concat(
            status ? "item-finished text-secondary" : "text-primary"
        );

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
    };

    const handleDeleteFinished = () => {
        deleteFinishedItems(
            todoList.filter(item => item.status).map(item => item.id)
        );
    };

    return (
        <div className='todo-list w-full mt-4'>
            <div className="flex flex-col w-full">
                <div className="todo-tab text-center grid grid-cols-3 w-full">
                    <button className={isActive("ALL")} onClick={switchTab}>全部</button>
                    <button className={isActive("Pending")} onClick={switchTab}>未完成</button>
                    <button className={isActive("Finished")} onClick={switchTab}>已完成</button>
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
                                <p id={id} className={isFinished(status)} onClick={handleUpdate}>{content}</p>
                                <button id={id} className='btn-delete absolute right-0' onClick={handleDelete}>
                                    +
                                </button>
                            </li>
                        )
                    })}
                    <li className='flex py-6 items-center justify-between'>
                        <div className='text-primary'>{todoList.filter(item => !item.status).length} 個待完成項目</div>
                        <div className='text-secondary cursor-pointer' onClick={handleDeleteFinished}>清除所有已完成項目</div>
                    </li>
                </ul>
            </div>
        </div>
    );
};
List.propTypes = {
    list: PropTypes.array.isRequired,
    handleList: PropTypes.object.isRequired
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

    /**
     * Toggle todo item status
     * @param {string} id todo item identity
     */
    const toggleItem = async (id) => {
        try {
            await toggleTodo(token, id);
            triggerReset();
        } catch (error) {
            showErrorDialog(error);
        }
    };

    const deleteFinishedItems = async (ids) => {
        try {
            await deleteFinished(token, ids);
            triggerReset();
        } catch (error) {
            showErrorDialog(error);
        }
    };

    const handleList = {
        deleteItem,
        updateItem,
        toggleItem,
        deleteFinishedItems
    };

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
                : <List list={list} handleList={handleList} />
            }
        </div>
    )
};

export default TodoList;