import React from 'react'
import {Link} from "react-router-dom";

let getTitle = (todo) => {
    let title = todo.body.split('\n')[0]
    if (title.length > 25) {
        title = title.slice(0, 25) + '...'
    }
    return title
}
let getDate = (todo) => {
    return new Date(todo.updated).toLocaleDateString()
}
let getContent = (todo) => {
    let title = todo.body.split('\n')[0]
    let content = todo.body.replace(title, "")
    if (content.length > 69) {
        return content.slice(0, 69) + '...'
    }
    return content
}

const TodoListItem = ({todo}) => {
    return (
        <div className='notes-list-item'>
            <Link to={`/todo/${todo.id}`}>
                <h3>{getTitle(todo)}</h3>
                <p>{getContent(todo)}</p>
                <p>{getDate(todo)}</p>
            </Link>
        </div>
    )
}

export default TodoListItem