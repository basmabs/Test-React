import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
function Modify() {
  const navigate = useNavigate();
  const params = useParams();
  const [target, SetTarget] = useState({
    name: '',
    description: '',
  })
  const handleChange = (e) => {
    const { value, name } = e.target
    SetTarget(() => {
      return { ...target, [name]: value }
    })
  }
  useEffect(() => {
    const Targets = async () => {
      const replace = await axios.get(`http://localhost:3000/TodoList/${params.id}`)
      SetTarget(replace.data)
    }
    Targets()
  }, [params.id])

  const handleSubmit = async () => {
    await axios.put(`http://localhost:3000/TodoList/${params.id}`, target)
    navigate ('/list')
}  
  return (
    <div>
      <h1>Modify</h1>
      <form>
        <div className='form-group'>
          <label>name</label>
          <input className='form-control' type='text' name='name' onChange={handleChange} value={target.name} />
        </div>
        <div className='form-group'>
          <label>description</label>
          <input className='form-control' type='text' name='description' onChange={handleChange} value={target.description} />
        </div>
      </form>
      <button className='btn btn-primary' type='button' id='button' onClick={handleSubmit}>update</button>
    </div>
  )
}
export default Modify;