import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function AddTodo() {
  const navigate = useNavigate();
  const [todo, setTodo] = useState({
    name: '',
    description: ''
  })
  const handleChange = (e) => {
    const { value, name } = e.target
    setTodo(() => {
      return {...todo, [name]: value }
    })
  }
  const handleSubmit = async () => {
    await axios.post('http://localhost:3000/TodoList', todo)
    navigate('/list')
  }
  return (
    <div>
      <h4>AddTodo</h4>
      <form>
        <div className='form-group'>
          <label>name</label>
          <input onChange={handleChange} className='form-control' type='text' name="name" />
        </div>

        <div className='form-group'>
          <label>description</label>
          <input onChange={handleChange} className='form-control' type='text' name="description"/>
        </div>

        <input type='button' value='addTodo' onClick={handleSubmit} className='btn btn-dark'/>
      </form>
    </div>
  )
}
export default AddTodo