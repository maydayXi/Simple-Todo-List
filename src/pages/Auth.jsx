import { Outlet, useNavigate } from 'react-router-dom';
import LogoText from '../assets/logo-text.svg';
import Content from '../layout/Content';
import TodoImg from '../assets/todo.svg';
import { useEffect } from 'react';

const Auth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/sign-in");
    }, [navigate])
    
    return (
        <Content>
            <div className="flex h-full justify-between">
                <div className="w-3/5 text-center">
                    <h1 className='inline-block'><img src={LogoText} alt="logo-text" /></h1>
                    <div><img src={TodoImg} alt="todo" className='w-full' /></div>
                </div>
                <div className="w-2/6 flex">
                    <Outlet />
                </div>
            </div>
        </Content>
    );
};

export default Auth;