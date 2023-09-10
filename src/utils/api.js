import axios from "axios";
import Swal from "sweetalert2";

const { 
    VITE_APP_API, 
    VITE_APP_API_TODO, 
    VITE_APP_API_SIGN_UP, 
    VITE_APP_API_SIGN_IN 
} = import.meta.env;

/**
 * Sign in user
 * @param {{email: string, password: string}} form 
 * @returns Sign in promise
 */
const signIn = form => {
    return axios.post(`${VITE_APP_API}/${VITE_APP_API_SIGN_IN}`, form)
        .then(response => {
            const { data } = response;
            const { nickname, token } = data;
            return { nickname, token };
        }).catch(error => {
            throw error;
        });
};

/**
 * Sign up user.
 * @typedef {{email: string, nickname: string, password: string, passwordConfirm: string}} signUpForm
 * @param {signUpForm} form sign up form data
 * @returns sign up promise
 */
const signUp = form => {
    return axios.post(`${VITE_APP_API}/${VITE_APP_API_SIGN_UP}`, form)
        .then(response => {
            const { statusText, config } = response;
            const { data } = config;
            const request = JSON.parse(data);
            const user = request.nickname;

            return Swal.fire({
                icon: "success",
                title: statusText,
                text: `${user} sign up success please login again.`
            });
        }).catch(error => {
            throw error;
        });
};

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
 * Delete all finished todo item.
 * @param {string} token Swagger UI bearer token
 * @param {Array<string>} idList Todo item id array
 */
const deleteFinished = (token, idList) => {
    const deletePromiseAll = idList.map(id =>
        axios.delete(`${VITE_APP_API}/${VITE_APP_API_TODO}/${id}`, {
            headers: {
                Authorization: token
            }
        })
    );

    Promise.all(deletePromiseAll).then(responses => {
        const { data } = responses[0];
        const { message } = data;
        return Swal.fire({
            icon: "success",
            title: message
        });
    });
}

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
};

export {
    signIn,
    signUp,
    getTodoList,
    addTodo,
    deleteTodo,
    deleteFinished,
    updateTodo,
    toggleTodo
};