import axios from 'axios'
import { API_URL, ERROR_CONNECTION } from 'react-native-dotenv'

export default class InstanceApi {
  instance = axios.create({
    baseURL: API_URL,
    timeout: 1000,
    headers: {
      'Accept-Language': 'id',
    }
  })

  async login(data) {
    try {
      return await this.instance.post('/login', data)
    }
    catch (err) {
      if (err.response) {
        return err.response
      }
      return ERROR_CONNECTION
    }
  }

  async detailSearchGet(endPointSearch, token) {
    this.instance.defaults.headers.common['Authorization'] = 'Bearer ' + token

    try {
      return await this.instance.get(endPointSearch)
    }
    catch (err) {
      if (err.response) {
        return err.response
      }
      return ERROR_CONNECTION
    }
  }

  async detailSearchPost(endPointSearch, token) {
    this.instance.defaults.headers.common['Authorization'] = 'Bearer ' + token

    try {
      return await this.instance.post(endPointSearch)
    }
    catch (err) {
      if (err.response) {
        return err.response
      }
      return ERROR_CONNECTION
    }
  }

  async detailConfirm(data, token) {
    this.instance.defaults.headers.common['Authorization'] = 'Bearer ' + token

    try {
      return await this.instance.post('/gatescan', data)
    }
    catch (err) {
      if (err.response) {
        return err.response
      }
      return ERROR_CONNECTION
    }
  }
}
