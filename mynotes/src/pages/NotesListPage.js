import React, {useState, useEffect} from 'react'
// import notes from '../assets/data.js'
import ListItem from '../components/ListItem.js'
import AddButton from '../components/AddButton.js'
import Header from "../components/header";
import {useNavigate} from "react-router-dom";

const NotesListPage = () => {
    const [notes, setNote] = useState([])
    const navigate = useNavigate()
    if (!localStorage.getItem("user")) {
        navigate('/login');
    }

    const goAuthor = () => {
        navigate('/author')
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}")
    useEffect(() => {
        getNotes()
    }, []) // fires once when the component is mounted

    const getNotes = async () => {
        let response = await fetch(`/api/notes?user_id=${user.id}`)
        let data = await response.json()
        console.log(data)
        setNote(data)
    }

    return (
        <div className="container dark">
            <div className="app">
                <Header/>
                <div className='notes'>
                    <div className="notes-header">
                        <h2 className="notes-title">
                            &#9782; Notes
                        </h2>
                        <p className="notes-count">{notes.length}</p>
                    </div>
                    <div className='notes-list'>
                        {notes.map((note, index) => {
                            return (
                                <div className='note-preview' key={index}>
                                    <ListItem note={note}/>
                                </div>
                            )
                        })}
                    </div>
                    <AddButton/>
                    <div className="author-link" onClick={goAuthor}>
                        作者
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotesListPage