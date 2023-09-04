import { useState } from 'react';
import LogoText from './assets/logo-text.svg';
import TodoImg from './assets/todo.svg';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import './App.css'

function App() {
    const [isLogin, setIsLogin] = useState(true);

    const toggleLogin = login => setIsLogin(login);

    return (
        <div className='w-3/5'>
            <div className="flex h-full justify-between">
                <div className="w-3/5 text-center">
                    <h1 className='inline-block'><img src={LogoText} alt="logo-text" /></h1>
                    <div><img src={TodoImg} alt="todo" className='w-full' /></div>
                </div>
                <div className="w-2/6 flex">
                    { isLogin ? <LoginForm toggleLogin={toggleLogin} /> : <SignUpForm toggleLogin={toggleLogin} /> }
                </div>
            </div>
        </div>
    );
}

export default App
