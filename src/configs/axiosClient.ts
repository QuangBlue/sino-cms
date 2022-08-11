import axios from 'axios'

const axiosClient = axios.create({
  // baseURL: 'https://sino-elite-api-stg.mlpert.com',

  baseURL: 'http://ironore-api-dev.eba-spqgruhh.ap-southeast-1.elasticbeanstalk.com',
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosClient.interceptors.request.use(
  function (config: any) {
    const accessToken = localStorage.getItem('accessToken') || ''
    config.headers['Authorization'] = accessToken
    const lang = localStorage.getItem('i18nextLng') || 'en-US'
    config.headers['lang'] = lang

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
