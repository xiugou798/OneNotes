import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Addicon } from '../assets/add.svg'

const TodoAddButton = () => {
  return (
    <div className='floating-button'>
        <Link to='/todo/new/'>
            <Addicon/>
        </Link>
    </div>
  )
}

export default TodoAddButton