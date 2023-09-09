import axios from "axios";
import Swal from "sweetalert2";

const { VITE_APP_API, VITE_APP_API_TODO } = import.meta.env;

const getTodoList = token => {
    return axios.get(`${VITE_APP_API}/${VITE_APP_API_TODO}`, {
        headers: {
            Authorization: token
        }
    }).then(response => {
        const { data } = response;
        return data;
    });
}

/**
 * Add todo item 
 * @param {string} token Swagger UI bearer token
 * @param {string} content todo item content
 * @returns {Promise} add promise
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
 * @returns {Promise} delete promise
 */
const deleteTodo = (token, id) => {
    return axios.delete(`${VITE_APP_API}/${VITE_APP_API_TODO}/${id}`, {
        headers: {
            Authorization: token
        },
        data: {
            id
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
    deleteTodo
};