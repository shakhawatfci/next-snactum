import axios from 'axios'
import Cookies from 'js-cookie'


axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1/'

const apiInstance = axios.create()

apiInstance.interceptors.request.use(
    async config => {
        // const token = await AsyncStorage.getItem('userToken')
        const token = Cookies.get('access_token'); 
        //console.log(token)
        if (token) {
            config.headers.Authorization = 'Bearer ' + token
            //console.log(config.headers.Authorization)
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export default apiInstance