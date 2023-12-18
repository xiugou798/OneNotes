import {
    HashRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import './App.css';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotesListPage from "./pages/NotesListPage";
import NotePage from "./pages/NotePage";
import React from "react";
import Author from "./pages/Author";
import TodoPage from "./pages/TodoPage";
import TodosListPage from "./pages/TodosListPage";

function App() {

    return (
        <Router>
            <Routes>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/author' element={<Author/>}/>
                <Route path='/' element={<NotesListPage/>}/>
                <Route path='/note/:id' element={<NotePage/>}/>
                <Route path='/todo/:id' element={<TodoPage/>}/>
                <Route path='/todo' element={<TodosListPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;