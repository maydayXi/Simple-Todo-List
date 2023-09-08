import PropTypes from 'prop-types';
import { useState } from 'react';
import { createContext } from 'react';

export const TodoContext = createContext();

const TodoProvider = ({children}) => {
    const [token, setToken] = useState("");
    const [userName, setUserName] = useState("");

    const value = {
        token,
        setToken,
        userName,
        setUserName
    };

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    );
};

TodoProvider.propTypes = {
    children: PropTypes.element.isRequired
}

export default TodoProvider;
