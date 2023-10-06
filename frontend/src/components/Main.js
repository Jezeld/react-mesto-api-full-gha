import React, { useContext } from 'react'
import '../index.css'
import { Card } from './Card.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main ({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete
}) {
  //   const [userName, setUserName] = useState('')
  //   const [userDescription, setUserDescription] = useState('')
  //   const [userAvatar, setUserAvatar] = useState('')
  //   const [cards, setCards] = useState([])

  //   useEffect(() => {
  //     Promise.all([api.getInfo(), api.getInitialCards()])
  //       .then(([dataUser, resCards]) => {
  //         setUserAvatar(dataUser.avatar)
  //         setUserName(dataUser.name)
  //         setUserDescription(dataUser.about)
  //         setCards(resCards)
  //         // console.log(resCards)
  //       })
  //       .catch(err => console.log(err))
  //   }, [])
  const currentUser = useContext(CurrentUserContext)
  return (
    <main className='content'>
      <section className='profile'>
        <div className='profile__profile'>
          <div className='profile__image-container'>
            <div
              className='profile__avatar'
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
            ></div>
            <button
              className='profile__change-avatar profile__change-avatar_icon'
              type='button'
              aria-label='Редактировать аватар'
              onClick={onEditAvatar}
            ></button>
          </div>
          <div className='profile__profile-info'>
            <div className='profile__name-edit'>
              <h1 className='profile__name'>{currentUser.name}</h1>
              <button
                type='button'
                aria-label='Редактировать'
                className='profile__edit-button profile__edit-button_type_about'
                onClick={onEditProfile}
              ></button>
            </div>
            <p className='profile__about'>{currentUser.about}</p>
          </div>
        </div>
        <button
          type='button'
          aria-label='Редактировать место'
          className='profile__add-button profile__add-button_type_add'
          onClick={onAddPlace}
        ></button>
      </section>
      <section className='places' aria-label='Фотосетка'>
        {cards.map(card => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  )
}

export { Main }
