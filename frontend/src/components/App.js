import React, { useCallback, useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import '../index.css'
import { api } from '../utils/Api'
import Header from './Header'
import Footer from './Footer'
import { EditProfilePopup } from './EditProfilePopup.js'
import { ImagePopup } from './ImagePopup.js'
import { Main } from './Main.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { EditAvatarPopup } from './EditAvatarPopup.js'
import { AddPlacePopup } from './AddPlacePopup.js'
import { ConfirmDeletePopup } from './ConfirmDeletePopup.js'
import { ProtectedRoute } from './ProtectedRoute.js'
import { Register } from './Register.js'
import { Login } from './Login.js'
import { InfoTooltip } from './InfoTooltip'
import { auth } from '../utils/Auth.js'
import {PageNotFound} from './PageNotFound.js'

function App () {
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState({})
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isFullImagePopupOpen, setFullImagePopupOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [deleteCard, setDeleteCard] = useState({})
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false)
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isSuccessInfoTooltipStatus, setIsSuccessInfoTooltipStatus] =
    useState(false)
  const [userEmail, setUserEmail] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      Promise.all([api.getInfo(), api.getInitialCards()])
        .then(([dataUser, resCard]) => {
          // console.log('dataUser', dataUser)
          // console.log('resCard', resCard)
          setCurrentUser(dataUser)
          setCards(resCard)
        })
        .catch(error => console.log(`Ошибка: ${error}`))
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  function handleCardLike (card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id)
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLike(card._id, isLiked)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)))
      })
      .catch(error => console.log(`Ошибка: ${error}`))
  }

  const handleUpdateUser = info => {
    setIsLoading(true)
    api
      .changeUserInfo(info)
      .then(newData => {
        setCurrentUser(newData)
        closeAllPopups()
      })
      .catch(error => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoading(false))
  }

  const handleUpdateAvatar = avatar => {
    setIsLoading(true)
    api
      .changeAvatar(avatar)
      .then(newAvatar => {
        setCurrentUser(newAvatar)
        closeAllPopups()
      })
      .catch(error => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoading(false))
  }

  const handleAddPlaceSubmit = card => {
    setIsLoading(true)
    api
      .addNewCard(card)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(error => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoading(false))
  }

  const handleCardDelete = card => {
    setIsLoading(true)
    api
      .deleteCard(card._id)
      .then(newCard => {

        const newCards = cards.filter(c => (c._id === card._id ? '' : newCard))
        setCards(newCards)
        closeAllPopups()

      })
      .catch(error => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoading(false))
  }

  function handleRegister (data) {
    return auth
      .register(data)
      .then(res => {
        console.log(res)
        setIsSuccessInfoTooltipStatus(true)
        openInfoTooltip()
        navigate('/sign-in')
      })
      .catch(err => {
        console.log(err)
        setIsSuccessInfoTooltipStatus(false)
        openInfoTooltip()
      })
  }

  function handleLogin (data) {
    return auth
      .login(data)
      .then(res => {
        console.log(res)
        localStorage.setItem('jwt', res.token)
        setUserEmail(data.email)
        setIsLoggedIn(true)
        navigate('/')
      })
      .catch(err => {
        console.log(err)
      })
  }


    const handleTokenCheck = useCallback(() => {
    const jwt = localStorage.getItem('jwt')
    console.log('jwt', jwt)
    if (!jwt) {
      return
    }
    auth
      .checkToken(jwt)
      .then(res => {
        console.log(res)
        setUserEmail(res.email)
        setIsLoggedIn(true)
        navigate("/", {replace: true})
      })
      .catch(err => {
        console.log(err)
      })
     }, [navigate])

     useEffect(() => {
      handleTokenCheck()
    }, [handleTokenCheck])

  function handleSignOut () {
    localStorage.removeItem('jwt')
    setIsLoggedIn(false)
    navigate('/sign-in')
  }

  const handleTrashClick = card => {
    setDeleteCard(card)
    setIsConfirmDeletePopupOpen(true)
  }

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true)
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true)
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick (card) {
    setSelectedCard(card)
    setFullImagePopupOpen(true)
  }

  function openInfoTooltip () {
    setInfoTooltipPopupOpen(true)
  }

  function closeAllPopups () {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard({})
    setFullImagePopupOpen(false)
    setIsConfirmDeletePopupOpen(false)
    setInfoTooltipPopupOpen(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header
          loggedIn={isLoggedIn}
          userEmail={userEmail}
          handleSignOut={handleSignOut}
        />
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={isLoggedIn}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards={cards}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onCardLike={handleCardLike}
                onCardDelete={handleTrashClick}
              />
            }
          />
          <Route
            path='/sign-in'
            element={<Login navigate={navigate} handleLogin={handleLogin} />}
          />

          <Route
            path='/sign-up'
            element={
              <Register navigate={navigate} handleRegister={handleRegister} />
            }
          />

          {/* <Route
            path='*'
            element={
              isLoggedIn ? <Navigate to='/' /> : <Navigate to='/sign-in' />
            }
          /> */}

          <Route
            path='*'
            element={<PageNotFound />}
          />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isFullImagePopupOpen}
          onClose={closeAllPopups}
        />
        <ConfirmDeletePopup
          card={deleteCard}
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onSubmit={handleCardDelete}
        />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          isConfirmStatus={isSuccessInfoTooltipStatus}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
