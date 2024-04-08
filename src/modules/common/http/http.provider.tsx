import { useMemo } from 'react'
import { HttpClient } from './httpClient'
import axios, { AxiosInstance } from 'axios'
import { useAuth } from '../../../app-factory'

interface Provider {
  get: AxiosInstance['get']
  getAxios: () => Promise<AxiosInstance>
  post: AxiosInstance['post']
  put: AxiosInstance['put']
  delete: AxiosInstance['delete']
  patch: AxiosInstance['patch']
}

const useHttpClient = (): Provider => {
  const { getAccessTokenSilently } = useAuth()

  return useMemo(() => {
    const http = new HttpClient(
      axios.create({
        baseURL: process.env.PORTAL_API,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    )

    return {
      get(...args) {
        return getAccessTokenSilently().then((token) => {
          http.attachToken(token)

          return http.get(...args)
        })
      },
      post(...args) {
        return getAccessTokenSilently().then((token) => {
          http.attachToken(token)

          return http.post(...args)
        })
      },
      put(...args) {
        return getAccessTokenSilently().then((token) => {
          http.attachToken(token)

          return http.put(...args)
        })
      },
      patch(...args) {
        return getAccessTokenSilently().then((token) => {
          http.attachToken(token)

          return http.patch(...args)
        })
      },
      delete(...args) {
        return getAccessTokenSilently().then((token) => {
          http.attachToken(token)

          return http.delete(...args)
        })
      },
      getAxios() {
        return getAccessTokenSilently().then((token) => {
          http.attachToken(token)

          return http.axios
        })
      },
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export class HttpProvider {
  static useHttpClient = useHttpClient
}
