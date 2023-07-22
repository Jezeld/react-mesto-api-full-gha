import React, { useState } from 'react'


const Login = ({ handleLogin }) => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    handleLogin(formValue)
  }

  return (
    <div className='data'>
      <form
        className='data__form'
        name='formdata'
        action='#'
        method='post'
        onSubmit={handleSubmit}
      >
        <h1 className='data__title'>Вход</h1>
        <div className='data__container'>
          <input
            type='email'
            name='email'
            value={formValue.email || ''}
            className='data__input'
            placeholder='Email'
            onChange={handleChange}
          />
          <span className='data__input-error'></span>
          <input
            type='password'
            name='password'
            value={formValue.password || ''}
            className='data__input'
            placeholder='Пароль'
            onChange={handleChange}
            minLength='4'
            maxLength='15'
          />
          <span className='data__input-error'></span>
        </div>
        <button type='submit' className='data__button'>
          Войти
        </button>
      </form>
    </div>
  )
}

export { Login }
