import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
function Login() {
  const Navigate = useNavigate();
  const [logingFom, setLogingForm] = useState({
    email: '',
    password: '',
  })
  const handleChange = (e) => {
    const { value, id } = e.target
    setLogingForm(() => { return { ...value, [id]: value } });
  }
  const handleSubmit = async () => {
    try {
      const data = await axios.get('http://localhost:3000/users')
      const Find = await data.data.find((user) => logingFom.email === user.email && logingFom.password === user.password)
      if (Find !== undefined) {
        Navigate('/register')
      } else {
        alert('check your email and password')
      }
    }
    catch (errors) { console.log(errors) }
  }
  return (
    <div>
      <label>email</label>
      <input className='form-control' type='email' name="email" onChange={handleChange} />
      <label>password</label>
      <input onChange={handleChange} className='form-control' type='password' name="password" />
      <button value='/login' onClick={handleSubmit} className='btn btn-dark' type='button' >submit</button>
    </div>
  )
}
export default Login