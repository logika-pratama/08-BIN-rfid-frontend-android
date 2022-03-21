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

  async login(data) {
    try {
      return await this.instance.post('/login', data)
    }
    catch (err) {
      return err
    }
  }

  async detailSearch(endPoint, token) {
    this.instance.defaults.headers.common['Authorization'] = 'Bearer ' + token

    try {
      return await this.instance.get(endPoint)
    }
    catch (err) {
      return err
    }
  }

  async detailConfirm(data, token) {
    this.instance.defaults.headers.common['Authorization'] = 'Bearer ' + token

    try {
      return await this.instance.post('/gatescan', data)
    }
    catch (err) {
      return err
    }
  }
}
