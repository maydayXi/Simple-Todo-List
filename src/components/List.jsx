import { useState } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { showUpdateDialog } from '../utils/dialog.js';

const tabMapping = {
    "全部": "ALL",
    "未完成": "Pending",
    "已完成": "Finished"
};

const index = ["ALL", "Pending", "Finished"];

/**
 * @typedef {{
 *      deleteItem: func, 
 *      updateItem: func, 
 *      toggleItem: fun, 
 *      deleteFinishedItems: fun
 *  }} Handles
 * @typedef {{id: string, status: boolean, content: string}} List
 * @param {{list: Array<List>, handleList: Handles}}
 * @returns 
 */
const List = ({list, handleList}) => {
    /**
     * todo list
     * @type {Array<object>}
     */
    const todoList = list;
    const unFinishedList = list.filter(item => !item.status);
    const finishedList = list.filter(item => item.status);
    const { deleteItem, updateItem, toggleItem, deleteFinishedItems } = handleList;
    const [tab, setTab] = useState("ALL");

    const getList = i => i 
        ? i == 1
            ? unFinishedList
            : finishedList
        : todoList;

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

    const switchTab = e => {
        const { innerText } = e.target;
        setTab(tabMapping[innerText]);
    };

    const getLeft = tab => ({
        left: `${index.indexOf(tab) * -100}%`
    });

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
                <div className='todo-content w-full overflow-hidden'>
                    <div className="all-content flex" style={getLeft(tab)}>
                        {Object.keys(tabMapping).map((key, i) => {
                            return (
                                <ul className='w-full px-8 pb-8' key={tabMapping[key]}>
                                    {getList(i).map(item => {
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
                                        {i < 2 
                                            ? (
                                                <div className='text-primary'>
                                                    {todoList.filter(item => !item.status).length} 個待完成項目
                                                </div>
                                            ) : null
                                        }
                                        {i == 1 
                                            ? null
                                            : (
                                                <div className='text-secondary cursor-pointer' onClick={handleDeleteFinished}>
                                                    清除所有已完成項目
                                                </div>
                                            )
                                        }
                                    </li>
                                </ul>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
List.propTypes = {
    list: PropTypes.array.isRequired,
    handleList: PropTypes.object.isRequired
};

export default List;