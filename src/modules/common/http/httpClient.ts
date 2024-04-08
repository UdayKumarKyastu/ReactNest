import { AxiosInstance } from 'axios'

export class HttpClient {
  axios: AxiosInstance
  get: AxiosInstance['get']
  post: AxiosInstance['post']
  put: AxiosInstance['put']
  delete: AxiosInstance['delete']
  patch: AxiosInstance['patch']
  options: AxiosInstance['options']

  constructor(axios: AxiosInstance) {
    if (!axios) {
      throw new Error('Axios instance is required')
    }

    this.axios = axios

    this.get = this.axios.get
    this.post = this.axios.post
    this.put = this.axios.put
    this.delete = this.axios.delete
    this.patch = this.axios.patch
    this.options = this.axios.options
  }

  attachToken(token: string) {
    this.axios.defaults.headers.common.Authorization = `Bearer ${token}`
  }
}
