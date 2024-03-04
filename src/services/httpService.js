import axios from 'axios'

class httpService {
  constructor() {
    this.http = axios.create({
      baseURL: 'https://run.mocky.io/'
    })
  }

  async get(url) {
    try {
      const response = await this.http({
        method: 'get',
        url: url
      })
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export default new httpService()
