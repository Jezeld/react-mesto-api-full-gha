import { PopupWithForm } from './PopupWithForm.js'
import { useEffect, useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import { useValidation } from '../hooks/useValidation.js'

function EditProfilePopup ({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext)
  const {values, handleChange, errors, isValid, setValues, resetForm} = useValidation({name: '', about: ''})

  useEffect(() => {
    if (currentUser.name && currentUser.about) {
        setValues({
            name: currentUser.name,
            about: currentUser.about
        });
    }
    if (!isOpen)
    resetForm();
}, [currentUser.about, currentUser.name, isOpen, resetForm, setValues])

  function handleSubmit(e) {
    e.preventDefault();
    if(isValid) {
      onUpdateUser({
        name: values.name,
        about: values.about,
      });
    }
  }


  // const [name, setName] = useState('')
  // const [description, setDescription] = useState('')

  // useEffect(() => {
  //   setName(currentUser.name)
  //   setDescription(currentUser.about)
  // }, [currentUser, isOpen])

  // function handleSubmit (e) {
  //   e.preventDefault()
  //   onUpdateUser({
  //     name,
  //     about: description
  //   })
  // }

  // function handleUserName (e) {
  //   setName(e.target.value)
  // }

  // function handleUserAbout (e) {
  //   setDescription(e.target.value)
  // }

    return (
    <PopupWithForm
      name='edit'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      buttonText='Cохранить'
      loadingText={'Сохранение...'}
      isValid={isValid}
    >
      <fieldset className='form__fieldset'>
        <input
          type='text'
          name='name'
          id='name-input'
          className='form__input form__input_information_name'
          placeholder='Имя'
          minLength={4}
          maxLength={40}
          onChange={handleChange}
          value={values.name || ''}
          required
        />
        <span className={`form__span-error name-input-error ${isValid && '' }`}>{errors.name}</span>
        <input
          type='text'
          name='about'
          id='job-input'
          className='form__input form__input_information_job'
          placeholder='О себе'
          minLength={4}
          maxLength={200}
          value={values.about || ''}
          onChange={handleChange}
          required
        />
         <span className={`form__span-error job-input-error ${isValid && '' }`}>{errors.about}</span>
      </fieldset>
    </PopupWithForm>
  )
}

//   return (
//     <PopupWithForm
//       name='edit'
//       title='Редактировать профиль'
//       isOpen={isOpen}
//       onClose={onClose}
//       onSubmit={handleSubmit}
//       isLoading={isLoading}
//       buttonText='Cохранить'
//       loadingText={'Сохранение...'}
//     >
//       <fieldset className='form__fieldset'>
//         <input
//           type='text'
//           name='name'
//           id='name-input'
//           className='form__input form__input_information_name'
//           placeholder='Имя'
//           minLength={2}
//           maxLength={40}
//           onChange={handleUserName}
//           value={name || ''}
//           required
//         />
//         <span className='form__span-error name-input-error' />
//         <input
//           type='text'
//           name='about'
//           id='job-input'
//           className='form__input form__input_information_job'
//           placeholder='О себе'
//           minLength={2}
//           maxLength={200}
//           value={description || ''}
//           onChange={handleUserAbout}
//           required
//         />
//         <span className='form__span-error job-input-error' />
//       </fieldset>
//     </PopupWithForm>
//   )
// }

export { EditProfilePopup }
