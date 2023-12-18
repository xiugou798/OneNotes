import React, {useState, useEffect} from 'react'
// import notes from '../assets/data.js'
import ListItem from '../components/ListItem.js'
import AddButton from '../components/AddButton.js'
import Header from "../components/header";
import {useNavigate} from "react-router-dom";
import TodoAddButton from "../components/TodoAddButton";
import TodoListItem from "../components/TodoListItem";

const TodosListPage = () => {
    const [todos, setTodo] = useState([])
    const navigate = useNavigate()
    if (!localStorage.getItem("user")) {
        navigate('/login');
    }

    const goAuthor = () => {
        navigate('/author')
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}")
    useEffect(() => {
        getTodos()
    }, []) // fires once when the component is mounted


    const getTodos = async () => {
        let response = await fetch(`/api/todos?user_id=${user.id}`)
        let data = await response.json()
        console.log(data)
        setTodo(data)
    }

    const logout = () => {
        localStorage.clear()
        navigate('/login')
    }

    const goNote = () => {
        navigate(`/`)
    }

    return (
        <div className="container dark">
            <div className="app">
                <div className="app-header">
                    <div className="app-header-title">
                        <h1>一个待办</h1>
                        <p onClick={goNote}>一个笔记</p>
                    </div>
                    <div className="text" onClick={logout}>退出登录</div>
                </div>
                <div className='notes'>
                    <div className="notes-header">
                        <h2 className="notes-title">
                            &#9782; Todos
                        </h2>
                        <p className="notes-count">{todos.length}</p>
                    </div>
                    <div className='notes-list'>
                        {todos.map((todo, index) => {
                            return (
                                <div className='note-preview' key={index}>
                                    <TodoListItem todo={todo}/>
                                </div>
                            )
                        })}
                    </div>
                    <TodoAddButton/>
                    <div className="author-link" onClick={goAuthor}>
                        作者
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodosListPage