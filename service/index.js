import axios from 'axios'
import { API_URL } from 'react-native-dotenv'

export default class InstanceApi {
  instance = axios.create({
    baseURL: API_URL,
    timeout: 1000,
    headers: {
      'Accept-Language': 'id',
    }
  })

  async login(url, data) {
    try {
      return await this.instance.post(url, data)
    }
    catch (err) {
      return err
    }
  }

  async detailSearch(url) {
    token = localStorage.getItem('token')
    this.instance.defaults.headers.common['Authorization'] = token

    try {
      return await this.instance.get(url)
    }
    catch (err) {
      return err
    }
  }

  async detailConfirm(url, data) {
    token = localStorage.getItem('token')
    this.instance.defaults.headers.common['Authorization'] = token

    try {
      return await this.instance.post(url, data)
    }
    catch (err) {
      return err
    }
  }
}
