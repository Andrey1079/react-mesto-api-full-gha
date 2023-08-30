import { baseUrl, headers } from './constants';

class Api {
  constructor(obj) {
    this._baseUrl = obj.baseUrl;
    this._settingsObj = {};
    this._settingsObj.method = 'GET';
    this._settingsObj.headers = obj.headers;
    this._settingsObj.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }

  getStartInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, this._settingsObj);
  }
  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, this._settingsObj);
  }
  setUserInfo(userData) {
    this._settingsObj.method = 'PATCH';
    this._settingsObj.body = JSON.stringify(userData);
    return this._request(`${this._baseUrl}/users/me`, this._settingsObj);
  }
  postNewCard(newCard) {
    this._settingsObj.method = 'POST';
    this._settingsObj.body = JSON.stringify({
      name: newCard.name,
      link: newCard.link,
    });
    return this._request(`${this._baseUrl}/cards`, this._settingsObj);
  }
  deleteCard(id) {
    this._settingsObj.method = 'DELETE';
    return this._request(`${this._baseUrl}/cards/${id}`, this._settingsObj);
  }
  toggleLikes(id, method) {
    this._settingsObj.method = method ? 'PUT' : 'DELETE';
    return this._request(`${this._baseUrl}/cards/${id}/likes`, this._settingsObj);
  }
  patchAvatar(avatarLink) {
    this._settingsObj.method = 'PATCH';
    this._settingsObj.body = JSON.stringify({
      avatar: avatarLink,
    });
    return this._request(`${this._baseUrl}/users/me/avatar`, this._settingsObj);
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: baseUrl,
  headers: headers,
});
export default api;
