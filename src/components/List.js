import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
function List() {
  const [Todo, setTodo] = useState([])
  const Data = async () => {
    const data = await axios.get('http://localhost:3000/TodoList')
    setTodo(data.data)
  }
  useEffect(() => {
    Data()
  }, [])
  const Deleting = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/TodoList/${id}`)
      Data();
    }
    catch (errors) { console.log(errors) }
  }
  return (
    <div>
      <div><h4>List</h4></div>
      <table className='table table-hover'>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>description</th>
          </tr>
        </thead>
        <tbody>
          {Todo.map((target) => {
            return (
              <tr key={target.id}>
                <td>{target.name}</td>
                <td>{target.description}</td>
                <td>
                  <button onClick={() => Deleting(target.id)} className="btn btn-primary" type='button'>delete</button>
                  <Link className='btn btn-primary' to={`/modify/${target.id}`} >modify</Link>
                </td>
              </tr>)
          })}
        </tbody>
      </table>
    </div>
  )
}
export default List;