import axios from 'axios'

export const baseClient = axios.create({
  responseType: 'json',
})

export const baseClientOptions = {
  interceptors: {
    request: [
      ({ getState }, config) => {

        const user = getState().user
        if (user && user.token) {
          config.headers[ 'Authorization' ] = 'Bearer ' + user.token
        }

        return config
      }
    ]
  }
}