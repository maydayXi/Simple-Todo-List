import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPlusLg } from 'react-icons/bs';
import { TodoContext } from './TodoProvider.jsx';
import { addTodo, deleteFinished, deleteTodo, getTodoList, toggleTodo, updateTodo } from '../utils/api.js';
import { showErrorDialog } from '../utils/dialog.js';
import Empty from '../assets/empty.svg';
import List from './List.jsx';

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
    const [ content, setContent ] = useState("");
    const [ reset, setReset] = useState(true);
    const navigate = useNavigate();

    const triggerReset = useCallback(() => setReset(!reset), [reset]);

    const handleChange = e => setContent(e.target.value.trim());
    const handlePlus = useCallback(async () => {
        try {
            await addTodo(token, content);
            setContent("");
            triggerReset();
        } catch (error) {
            await showErrorDialog(error);
        } 
    }, [token, content, triggerReset]);

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

    const handleKeyPress = useCallback(e => {
        const { keyCode } = e;
        if (keyCode == 13) handlePlus();
    }, [handlePlus]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [handleKeyPress])

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