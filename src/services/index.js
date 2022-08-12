import axios from 'axios'
import { RFID_API_URL_STAGING, RFID_TIME_OUT, ERROR_CONNECTION } from 'react-native-dotenv'

export default class InstanceServices {
  constructor(anotherApiUrl, anotherTimeOut, anotherApiKey = null) {
    this.initInstance(anotherApiUrl, anotherTimeOut, anotherApiKey)
  }

  apiKey(anotherApiKey) {
    return anotherApiKey ? {
      'apikey': anotherApiKey
    } : {}
  }

  initInstance(anotherApiUrl, anotherTimeOut, anotherApiKey) {
    this.instance = axios.create({
      baseURL: anotherApiUrl || RFID_API_URL_STAGING,
      timeout: Number(anotherTimeOut || RFID_TIME_OUT),
      headers: {
        'Accept-Language': 'id',
        ...this.apiKey(anotherApiKey)
      }
    })
  }

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

  async searchGet(endPointSearch, token) {
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

  async searchAdd(endPointSearch, token) {
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

  async detailSPrintList(endPointSPrint, token) {
    this.instance.defaults.headers.common['Authorization'] = 'Bearer ' + token

    try {
      return await this.instance.get(endPointSPrint)
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
