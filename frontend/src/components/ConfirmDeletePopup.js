import { PopupWithForm } from './PopupWithForm'

function ConfirmDeletePopup ({ isOpen, onClose, isLoading, onSubmit, card }) {
  function handleSubmit (e) {
    e.preventDefault()
    onSubmit(card)
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title='Вы уверены?'
      name='delete'
      onSubmit={handleSubmit}
      isLoading={isLoading}
      buttonText='Да'
      loadingText={'Удаление...'}
      isDisabled={false}
      isValid={true}
    />
  )
}

export { ConfirmDeletePopup }
