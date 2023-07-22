import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Register ({ handleRegister }) {
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
    handleRegister(formValue)
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
        <h1 className='data__title'>Регистрация</h1>
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
          Зарегистрироваться
        </button>
        <p className='data__text'>
          Уже зарегистрированы?&#160;
          <Link to='/sign-in' className='data__text'>
            Войти
          </Link>
        </p>
      </form>
    </div>
  )
}

export { Register }
