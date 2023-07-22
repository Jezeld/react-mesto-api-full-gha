import React from 'react'
import error from '../images/error.svg'
import success from '../images/sucсess.svg'
import { Popup } from './Popup'


function InfoTooltip ({ isConfirmStatus, isOpen, onClose }) {
  return (
<Popup isOpen={isOpen} name='tooltip' onClose={onClose}>
          <div
            className='popup__tooltip-sucсess'
            style={{ backgroundImage: `url(${isConfirmStatus ? success : error})` }}
          ></div>
          <h2 className='popup__title'>
          {isConfirmStatus
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте еще раз.'}
          </h2>
          </Popup>
  )
}

// function InfoTooltip ({ isConfirmStatus, isOpen, onClose }) {
//   usePopupClose(isOpen, onClose)
//   return (
//     <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
//       <div className='popup__container'>
//         <button
//           type='button'
//           className='popup__close'
//           onClick={onClose}
//         ></button>
//         <div className='popup__tooltip-container popup__container-tooltip'>
//           <div
//             className='popup__tooltip-sucсess'
//             style={{ backgroundImage: `url(${isConfirmStatus ? success : error})` }}
//           ></div>
//           <h2 className='popup__title'>
//           {isConfirmStatus
//             ? 'Вы успешно зарегистрировались!'
//             : 'Что-то пошло не так! Попробуйте еще раз.'}
//           </h2>
//         </div>
//       </div>
//     </div>
//   )
// }

export { InfoTooltip }
