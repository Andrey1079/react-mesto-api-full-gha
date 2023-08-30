import { baseUrl, headers } from './constants';

class Authentication {
  constructor(obj) {
    this._baseUrl = obj.baseUrl;
    this._settingsObj = {};
    this._settingsObj.method = '';
    this._settingsObj.headers = obj.headers;
    this._url = '';
  }
  signUp(registrationData) {
    this._url = 'signup';
    this._settingsObj.method = 'POST';
    this._settingsObj.body = JSON.stringify(registrationData);
    return this._request(this._url);
  }
  signIn(loginData) {
    this._url = 'signin';
    this._settingsObj.method = 'POST';
    this._settingsObj.body = JSON.stringify(loginData);
    return this._request(this._url);
  }
  checkToken(token) {
    this.url = 'users/me';
    this._settingsObj.method = 'GET';
    this._settingsObj.headers.Authorization = `Bearer ${token}`;
    delete this._settingsObj?.body;
    return this._request(this.url);
  }
  _request(url) {
    return fetch(`${this._baseUrl}/${url}`, this._settingsObj).then(this._checkResponse);
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
}

const authentication = new Authentication({
  baseUrl: baseUrl,
  headers: headers,
});
export default authentication;
