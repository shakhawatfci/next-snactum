import axios from 'axios'
import Cookies from 'js-cookie'

// import nextCookie from "next-cookies";


axios.defaults.baseURL =  "https://tutor.publicdemo.xyz/api/v1/";

const apiInstance = axios.create()

//    const token = Cookies.get('access_token'); 

//     if (token) {
//         apiInstance.defaults.headers.common['Authorization'] = 'Bearer ' + '8|SM3uuJQD9iwkri7fyz5p5opdlOiLlqjPtjO4XgAc';
//     }

// apiInstance.defaults.headers.common["Authorization"] = "Bearer " + token;

apiInstance.interceptors.request.use(
    async config => {
        // const token = await AsyncStorage.getItem('userToken')
        const token = Cookies.get('access_token'); 

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