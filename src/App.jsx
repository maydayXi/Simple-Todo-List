import LogoText from './assets/logo-text.svg';
import TodoImg from './assets/todo.svg';
import LoginForm from './components/LoginForm';
import './App.css'
import { useState } from 'react';

function App() {
    const [isLogin, setIsLogin] = useState(true);

    const toggleLogin = login => {
        setIsLogin(login);
    };

    return (
        <div className='w-3/5 h-4/5'>
            <h1><img src={LogoText} alt="logo-text" /></h1>
            <div className="flex gap-x-16 h-full">
                <div className="flex-1">
                    <div><img src={TodoImg} alt="todo" className='w-full' /></div>
                </div>
                <div className="flex flex-col flex-1">
                    { isLogin ? <LoginForm toggleLogin={toggleLogin} /> : null }
                </div>
            </div>
        </div>
    );
}

export default App
