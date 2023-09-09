import axios from "axios";
import Swal from "sweetalert2";

const { VITE_APP_API, VITE_APP_API_TODO } = import.meta.env;

const resolveData = response => {
    const { data } = response;
    return data;
};

/**
 * Get todo list
 * @param {string} token Swagger UI bearer token
 * @returns {Array<object>} Todo list data 
 */
const getTodoList = token => {
    return axios.get(`${VITE_APP_API}/${VITE_APP_API_TODO}`, {
        headers: {
            Authorization: token
        }
    })
    .then(resolveData)
    .then(resolveData);
};

/**
 * Add todo item 
 * @param {string} token Swagger UI bearer token
 * @param {string} content todo item content
 * @returns add promise
 */
const addTodo = (token, content) => {
    return axios.post(`${VITE_APP_API}/${VITE_APP_API_TODO}`, {content}, {
        headers: {
            Authorization: token
        }
    }).then(response => {
        const { statusText } = response;
        return Swal.fire({
            icon: "success",
            title: statusText,
            text: content
        })
    });
};

/**
 * Delete todo item
 * @param {string} token Swagger UI bearer token
 * @param {string} id todo item identity
 * @returns delete promise
 */
const deleteTodo = (token, id) => {
    return axios.delete(`${VITE_APP_API}/${VITE_APP_API_TODO}/${id}`, {
        headers: {
            Authorization: token
        }
    }).then(response => {
        const { data } = response;
        const { message } = data;
        return Swal.fire({
            icon: "success",
            title: message
        });
    });
};

/**
 * Update todo item with content by id.
 * @param {string} token Swagger UI bearer token
 * @param {string} id Todo item identity
 * @param {string} content Todo item new content
 * @returns Update promise
 */
const updateTodo = (token, id, content) => {
    return axios.put(`${VITE_APP_API}/${VITE_APP_API_TODO}/${id}`, {
        id, content
    }, {
        headers: {
            Authorization: token
        }
    }).then(response => {
        const { data } = response;
        const { message } = data;
        return Swal.fire({
            icon: "success",
            title: message,
            text: content
        });
    });
};

/**
 * Toggle todo item status
 * @param {string} token Swagger UI bearer token
 * @param {string} id Todo item identity
 * @returns Toggle promise
 */
const toggleTodo = (token, id) => {
    return axios.patch(`${VITE_APP_API}/${VITE_APP_API_TODO}/${id}/toggle`, {id}, {
        headers: {
            Authorization: token
        }
    }).then(response => {
        const { data } = response;
        const { message } = data;
        return Swal.fire({
            icon: "success",
            title: message
        });
    });
}

export {
    getTodoList,
    addTodo,
    deleteTodo,
    updateTodo,
    toggleTodo
};