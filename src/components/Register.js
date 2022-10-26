import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Formik } from "formik"
function Register() {
  const navigate = useNavigate();
  return (
    <div>
      <h1> Register</h1>
      <div className='container'>
        <Formik
          initialValues={{ name: '', lastname: '', email: '', password: '' }}
          validate={values => {
            const errors = {};
            if (values.name === '') { errors.name = 'Required'; }
            if (values.lastname === '') { errors.lastname = 'Required'; }
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) { errors.email = 'Invalid email address' }
            if (values.password === '') { errors.password = 'Required'; }
            console.log(values);
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const users = await axios.get('http://localhost:3000/users')
              if (users) {
                const Find = users.data.find(user => values.email === user.email)
                if (Find !== undefined) {
                  alert('email already exists')
                } else {
                  await axios.post('http://localhost:3000/users', values)
                  navigate('/login')
                  setSubmitting(false);
                }
              }
            } catch (errors) { console.log(errors) }
          }}  >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <label className='form-label'>name</label>
              <input
                type="text"
                name="name"
                className='form-control'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <p styled={{ color: 'red' }}>  {errors.name && touched.name && errors.name}</p>
              <label className='form-label'>lastname</label>
              <input
                type="text"
                name="lastname"
                className='form-control'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastname}
              />
              <p styled={{ color: 'red' }}>  {errors.lastname && touched.lastname && errors.lastname}</p>
              <label className='form-label'>email</label>
              <input
                type="email"
                name="email"
                className='form-control'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <p styled={{ color: 'red' }}> {errors.email && touched.email && errors.email}</p>
              <label className='form-label'>password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className='form-control' />
              <p styled={{ color: 'red' }}> {errors.password && touched.password && errors.password}</p>
              <button type="submit" className='btn btn-dark mt-5' disabled={isSubmitting}>   Submit  </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
};
export default Register