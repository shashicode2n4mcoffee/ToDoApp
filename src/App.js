import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let tasks = localStorage.getItem('tasks')
  if (tasks) {
    return JSON.parse(localStorage.getItem('tasks'))
  } else {
    return []
  }
}

function App() {
  const [name, setName] = useState('')
  const [tasks, setTasks] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      //display alert
      showAlert(true, 'danger', 'Please enter value')
    } else if (name && isEditing) {
      //deal with edit
      setTasks(
        tasks.map((task) => {
          if (task.id === editId) {
            return { ...task, title: name }
          }
          return task
        })
      )
      setName('')
      setEditId(null)
      setIsEditing(false)
      showAlert(true, 'success', 'Modified the Task')
    } else {
      showAlert(true, 'success', 'Task Added Successfully')
      const newTask = { id: new Date().getTime().toString(), title: name }
      setTasks([...tasks, newTask])
      setName('')
      console.log(tasks)
    }
  }

  const removeTask = (id) => {
    showAlert(true, 'danger', 'Task removed')
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const editTask = (id) => {
    const modTask = tasks.find((task) => task.id === id)
    setEditId(id)
    setIsEditing(true)
    setName(modTask.title)
  }

  const clearAll = () => {
    showAlert(true, 'danger', 'Removed all tasks')
    setTasks([])
  }

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg })
  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  return (
    <section className='section-center'>
      <form className='task-form' onSubmit={handleSubmit}>
        {alert.show && (
          <Alert {...alert} removeAlert={showAlert} tasks={tasks} />
        )}
        <h3>ToDo Application</h3>
        <div className='form-control'>
          <input
            type='text'
            placeholder='Practice Competitive Programming'
            className='task'
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      <div className='task-conatiner'>
        <List tasks={tasks} removeTask={removeTask} editTask={editTask} />
        <button className='clear-btn' onClick={clearAll}>
          Clear All Tasks
        </button>
      </div>
    </section>
  )
}

export default App
