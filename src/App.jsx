import { HashRouter, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import Todo from './pages/Todo';
import TodoProvider from './components/TodoProvider';
import './App.css'

function App() {
    /**
     * Router table 
     */
    return (
        <HashRouter>
            <TodoProvider>
                <Routes>
                    <Route path='/' element={<Auth />} >
                        <Route path='sign-up' element={<SignUpForm />} />
                        <Route path='sign-in' element={<SignInForm />} />
                    </Route>
                    <Route path='/todo' element={<Todo />} />
                </Routes>
            </TodoProvider>
        </HashRouter>
    );
}

export default App
