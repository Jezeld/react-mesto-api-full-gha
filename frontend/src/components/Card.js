import React, { useContext } from 'react'
import '../index.css'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card ({
  card,
  onCardClick,
  onCardLike,
  onCardDelete,
  onEditAvatar,
  onEditProfile,
  onAddPlace
}) {
  const currentUser = useContext(CurrentUserContext)
  const handleClick = () => onCardClick(card)
  const handleLikeClick = () => onCardLike(card)
  const handleDeleteClick = () => onCardDelete(card)
  const isOwn = card.owner._id === currentUser._id
  const isLiked = card.likes.some(i => i._id === currentUser._id)
  const cardLikeButtonClassName = `place__like ${
    isLiked && 'place__like_active'
  }`
  return (
    <article className='place'>
      {isOwn && (
        <button
          onClick={handleDeleteClick}
          className='place__urn'
          type='button'
        />
      )}
      <img
        src={card.link}
        alt={card.name}
        className='place__image'
        onClick={handleClick}
      />
      <div className='place__name'>
        <h2 className='place__title'>{card.name}</h2>
        <div className='place__box'>
          <button
            type='button'
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <h2 className='place__number-likes'>{card.likes.length}</h2>
        </div>
      </div>
    </article>
  )
}

export { Card }
