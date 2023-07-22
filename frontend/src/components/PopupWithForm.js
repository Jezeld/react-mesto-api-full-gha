// import {usePopupClose} from '../hooks/usePopupClose.js'
import React from 'react'
import { Popup } from './Popup'

function PopupWithForm ({
  title,
  name,
  children,
  isOpen,
  onClose,
  onSubmit,
  buttonText,
  isLoading,
  loadingText,
  isDisabled,
  isValid
})
{
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
        <form
          className={`form form_type_${name}`}
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          <h2 className='form__title'>{title}</h2>
          {children}
          <button
            className={`form__button-submit ${(!isValid || isDisabled) ? 'form__button-submit_disabled' :''}`}
            //  className='form__button-submit form__button-submit_disabled'
            type='submit'
          >
            {isLoading ? loadingText : buttonText}
          </button>
        </form>
    </Popup>
  )
}

export { PopupWithForm }


// function PopupWithForm ({
//   title,
//   name,
//   children,
//   isOpen,
//   onClose,
//   onSubmit,
//   buttonText,
//   isLoading,
//   loadingText
// })
// {
//   usePopupClose(isOpen, onClose)
//   return (
//     <div className={`popup ${name} ${isOpen ? 'popup_opened' : ''}`}>
//       <div className='popup__container'>
//         <button
//           type='button'
//           className='popup__close'
//           onClick={onClose}
//         />
//         <form
//           className={`form form_type_${name}`}
//           name={name}
//           onSubmit={onSubmit}
//           // noValidate
//         >
//           <h2 className='form__title'>{title}</h2>
//           {children}
//           <button
//             className='form__button-submit'
//             //  className='form__button-submit form__button-submit_disabled'
//             type='submit'
//           >
//             {isLoading ? loadingText : buttonText}
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }


