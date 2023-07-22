import React, { useEffect } from 'react'
import { PopupWithForm } from './PopupWithForm.js'
import {useValidation} from '../hooks/useValidation'

function AddPlacePopup ({ isOpen, onClose, onAddPlace, isLoading }) {
  const {values, handleChange, errors, isValid, isDisabled, resetForm} = useValidation({name: '', link: ''})

  useEffect(() => {
    if (!isOpen){
      resetForm();
    }
}, [isOpen, resetForm])

function handleSubmit(e) {
  e.preventDefault();
  if(isValid){
    onAddPlace({
      name: values.name,
      link: values.link
    })
  }
}

  // const [link, setLink] = useState('')
  // const [name, setName] = useState('')

  // function handleEditName (e) {
  //   setName(e.target.value)
  // }

  // function handleEditlink (e) {
  //   setLink(e.target.value)
  // }

  // function handleSubmit (e) {
  //   e.preventDefault()
  //   onAddPlace({
  //     name: name,
  //     link: link
  //   })
  // }

  // useEffect(() => {
  //   setLink('')
  //   setName('')
  // }, [isOpen])

  // const nameRef = useRef('')
  // const linkRef = useRef('')

  // useEffect(() => {
  //   if (!isOpen) {
  //     nameRef.current.value = ''
  //     linkRef.current.value = ''
  //   }
  // }, [isOpen])

  // function handleSubmitAdd (e) {
  //   e.preventDefault()
  //   onAddPlace({
  //     name: nameRef.current.value,
  //     link: linkRef.current.value
  //   })
  // }

  return (
    <PopupWithForm
      name='add'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText='Создать'
      isLoading={isLoading}
      loadingText={'Сохранение...'}
      isValid={isValid}
      isDisabled={isDisabled}
    >
      <fieldset className='form__fieldset'>
        <input
          type='text'
          name='name'
          id='image-input'
          className='form__input form__input_information_image'
          placeholder='Название'
          minLength={2}
          maxLength={30}
          value={values.name || ''}
          onChange={handleChange}
          // ref={nameRef}
          required
        />
        <span className={`form__span-error image-input-error ${isValid && '' }`}>{errors.name}</span>
        <input
          type='url'
          name='link'
          id='link-input'
          className='form__input form__input_information_link'
          placeholder='Ссылка на картинку'
          value={values.link || ''}
          onChange={handleChange}
          // ref={linkRef}
          required
        />
         <span className={`form__span-error link-input-error ${isValid && '' }`}>{errors.link}</span>
      </fieldset>
    </PopupWithForm>
  )
}

export { AddPlacePopup }
