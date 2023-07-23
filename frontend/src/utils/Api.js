class Api {
  constructor ({ baseUrl, headers }) {
    this._headers = headers
    this._baseUrl = baseUrl
  }

  _checkResponse (res) {
    if (res.ok) {
      return res.json()
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  _request (url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  getInfo () {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
  }

  getInitialCards () {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
  }

  changeUserInfo (data) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
  }

  addNewCard (data) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
  }

  deleteCard (cardid) {
    return this._request(`${this._baseUrl}/cards/${cardid}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  // deleteLike(cardid) {
  //     return fetch(`${this._baseUrl}/cards/${cardid}/likes`, {
  //         method: 'DELETE',
  //         headers: this._headers
  //     })
  //         .then(this._checkResponse)
  // }

  // addLike(cardid) {
  //     return fetch(`${this._baseUrl}/cards/${cardid}/likes`, {
  //         method: 'PUT',
  //         headers: this._headers
  //     })
  //         .then(this._checkResponse)
  // }

  changeLike (cardId, isLiked) {
    if (isLiked) {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
    } else {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
    }
  }

  changeAvatar (data) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.jezeld.nomoredomains.xyz',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
})

export { api }

// const api = new Api({
//   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
//   headers: {
//     authorization: '141f19a7-2a64-4734-9dd2-fa8ceaaaa66b',
//     'Content-Type': 'application/json'
//   }
// })
