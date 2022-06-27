import axios from 'axios'
import { API_URL, TIME_OUT, ERROR_CONNECTION } from 'react-native-dotenv'

export default class InstanceServices {
  instance = axios.create({
    baseURL: API_URL,
    timeout: Number(TIME_OUT),
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

  async homeMenuList(token) {
    this.instance.defaults.headers.common['Authorization'] = 'Bearer ' + token

    try {
      return await this.instance.get('/screen/home')
    }
    catch (err) {
      if (err.response) {
        return err.response
      }
      return ERROR_CONNECTION
    }
  }

  async integrationModuleMenuList(token) {
    this.instance.defaults.headers.common['Authorization'] = 'Bearer ' + token

    try {
      return await this.instance.get('/screen/integration')
    }
    catch (err) {
      if (err.response) {
        return err.response
      }
      return ERROR_CONNECTION
    }
  }

  async detailUrlList(token) {
    this.instance.defaults.headers.common['Authorization'] = 'Bearer ' + token

    try {
      return await this.instance.get('/uri')
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

  async uriUpdate(data, token) {
    this.instance.defaults.headers.common['Authorization'] = 'Bearer ' + token

    try {
      return await this.instance.put('/uri', data)
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
