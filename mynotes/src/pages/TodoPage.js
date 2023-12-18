import React, {useEffect, useState} from 'react'
import {useParams, useNavigate, Link} from 'react-router-dom'
// import notes from '../assets/data.js'
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'
import Header from "../components/header";

const TodoPage = () => {
    let {id} = useParams();
    let navigate = useNavigate()
    let [note, setNote] = useState({})
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    if (!localStorage.getItem("user")) {
        navigate('/login');
    }
    useEffect(() => {
        let getNote = async () => {
            if (id === 'new') return
            let response = await fetch(`/api/todos/${id}`)
            let data = await response.json()
            console.log(data)
            setNote(data)
        }
        getNote()
    }, [id])

    let createNote = async () => {
        await fetch(`/api/todos/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...note, 'updated': new Date(), 'userId': user.id})
        })
    }

    let updateNote = async () => {
        await fetch(`/api/todos/${id}/update/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...note, 'updated': new Date()})
        })
    }

    let deleteNote = async () => {
        await fetch(`/api/todos/${id}/delete/`, {
            method: 'DELETE'
        })
        navigate('/todo')
    }

    let handleSubmit = () => {
        if (id !== 'new' && !note.body) {
            deleteNote()
        } else if (id !== 'new') {
            updateNote()
        } else if (id === 'new' && note !== null) {
            createNote()
        }
        navigate('/todo')
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
                <div className='note'>
                    <div className="note-header">
                        <h3>
                            <Link to='/todo'>
                                <ArrowLeft onClick={handleSubmit}/>
                            </Link>
                        </h3>
                        {id !== 'new' ? (
                            <button onClick={deleteNote}>Delete</button>
                        ) : (
                            <button onClick={handleSubmit}>Save</button>
                        )}
                    </div>
                    <div className="note-body">
        <textarea onChange={(e) => {
            setNote({...note, 'body': e.target.value})
        }} value={note.body}>
        </textarea>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoPage