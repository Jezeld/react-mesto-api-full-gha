
class Auth {
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


  register (data) {
    return this._request(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
  }

  login (data) {
    return this._request(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
  }


  checkToken (token) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      }
    })
  }
}

const auth = new Auth({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
})

export { auth }




// const auth = new Auth({
//   baseUrl: 'https://auth.nomoreparties.co',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })