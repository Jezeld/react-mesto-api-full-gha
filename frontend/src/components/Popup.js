import { useEffect } from "react";

// создаем отдельный компонент `Popup` для обертки любых попапов
const Popup = ({ isOpen, name, onClose, children }) => {
// внутри указываем `useEffect` для обработчика `Escape`
  useEffect(() => {
    // ограничиваем навешивание обработчика: если не открыт, то не нужно навешивать
    if (!isOpen) return;
// объявляем внутри `useEffect` функцию, чтобы она не теряла ссылку при перерисовке компонента
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', closeByEscape)
    // обязательно удаляем обработчик в `clean-up` функции
    return () => document.removeEventListener('keydown', closeByEscape)
// обязательно следим за `isOpen`, чтобы срабатывало только при открытии, а не всегда
}, [isOpen, onClose])

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
  }

  return (
    <div
      className={`popup popup-${name} ${isOpen ? 'popup_opened' : ''}`}
      // добавляем обработчик оверлея
      onClick={handleOverlay}
    >
    {/* добавляем контейнер для контента попапа с возможностью изменения типа, чтобы ImagePopup можно было сделать с другими размерами */}
     <div className={`popup__container popup__container-${name}`}>
     <button
          className='popup__close'
          type='button'
          onClick={onClose}
        />
        {/* тут может быть любой контент попапа в `children`: хоть для попапа картинки, хоть для `InfoToolTip`,
        хоть для `PopupWithForm` */}
        {children}
      </div>
    </div>
  );
};

export { Popup };