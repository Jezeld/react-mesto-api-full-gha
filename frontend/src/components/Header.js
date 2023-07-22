import React from 'react';
import {Route, Routes, Link} from 'react-router-dom'

function Header({userEmail, handleSignOut}) {
    return (
      <header className="header">
       <div className="header__logo"></div>
       <div className="header__container">
        <Routes>
          <Route path="/" element={
            <>
              <p className='header__link'>{userEmail}</p>
              <button className='header__link header__link_grey' type='button' onClick={handleSignOut}>Выйти</button>
            </>
          } />

          <Route path="/sign-up" element={
            <Link className='header__link' to='/sign-in'>Войти</Link>
          } />

          <Route path="/sign-in" element={
            <Link className='header__link' to='/sign-up'>Регистрация</Link>
          } />
        </Routes>
      </div>
      </header>
    );
  }
  export default Header;