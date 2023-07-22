import { useEffect } from 'react'
import { PopupWithForm } from './PopupWithForm'
import { useValidation } from '../hooks/useValidation'

function EditAvatarPopup ({ isOpen, onClose, onUpdateAvatar, isLoading}) {
  const {values, handleChange, errors, isValid, isDisabled, resetForm} = useValidation({avatar: ''})
  // const avatarRef = useRef('')

  // useEffect(() => {
  //   if (!isOpen) {
  //     avatarRef.current.value = ''
  //   }
  // }, [isOpen])

  // function handleSubmit (e) {
  //   e.preventDefault()
  //   onUpdateAvatar({
  //     avatar: avatarRef.current.value
  //   })
  // }

  useEffect(() => {
    if (!isOpen){
      resetForm();
    }
  }, [isOpen, resetForm])

  function handleSubmit(e) {
    e.preventDefault();
    if(isValid) {
      onUpdateAvatar({
        avatar: values.avatar,
      });
  }
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      buttonText='Cохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      loadingText={'Сохранение...'}
      isValid={isValid}
      isDisabled={isDisabled}
    >
      <fieldset className='form__fieldset'>
        <input
          // ref={avatarRef}
          onChange={handleChange}
          type='url'
          name='avatar'
          value={values.avatar || ''}
          id='avatar-input'
          className='form__input'
          placeholder='Ссылка на аватар'
          required
        />
        <span className={`form__span-error avatar-input-error ${isValid && '' }`}>{errors.avatar}</span>
      </fieldset>
    </PopupWithForm>
  )
}

export { EditAvatarPopup }
