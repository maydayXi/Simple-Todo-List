import { HashRouter, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import './App.css'
import Todo from './pages/Todo';

function App() {
    /**
     * Router table 
     */
    return (
        <HashRouter>
            <Routes>
                <Route path='/' element={<Auth />} >
                    <Route path='sign-up' element={<SignUpForm />} />
                    <Route path='sign-in' element={<SignInForm />} />
                </Route>
                <Route path='/todo' element={<Todo />} />
            </Routes>
        </HashRouter>
    );
}

export default App
