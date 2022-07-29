import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'https://sino-elite-api-stg.mlpert.com',
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosClient.interceptors.request.use(
  function (config: any) {
    const accessToken = localStorage.getItem('accessToken') || ''
    config.headers['Authorization'] = accessToken

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default axiosClient
