import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({ tasks, removeTask, editTask }) => {
  return (
    <div className='task-list'>
      {tasks.map((task) => {
        const { id, title } = task
        return (
          <article className='task-item' key={id}>
            <p className='title'>{title}</p>
            <div className='btn-conatiner'>
              <button
                onClick={() => editTask(id)}
                type='button'
                className='edit-btn'
              >
                <FaEdit />
              </button>
              <button
                onClick={() => removeTask(id)}
                type='button'
                className='delete-btn'
              >
                <FaTrash />
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}
export default List
