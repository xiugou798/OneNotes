import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes, Switch} from 'react-router-dom';
import Login from './LoginPage';
import Register from './RegisterPage';
import Home from './Home';
import Header from "../components/header";
import NotesListPage from "./NotesListPage";
import NotePage from "./NotePage";


const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <div className="container dark">
            <div className="app">
                <Header/>
                <Routes>
                    <Route path='/' element={<NotesListPage/>}/>
                    <Route path=':id' element={<NotePage/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default App;
