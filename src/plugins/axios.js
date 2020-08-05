console.log('dsdsds');
import Vue from 'vue'
import axios from 'axios'
import store from '../store'

import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
// Agregamos la URL base de nuestra API
axios.defaults.baseURL = 'http://localhost:3000/api';   // LOCAL
// axios.defaults.baseURL = 'https://invoice-generetor-2.herokuapp.com/api';
Vue.prototype.$axios = axios

// Request interceptor
axios.interceptors.request.use(request => {
    const token = store.getters['auth/token']
    // console.log('interceptors token', token);
    if (token){
        // request.headers = {
        //     token: token
        // }
        request.headers['Authorization'] = 'Bearer ' + token; 
        // request.headers.common['Authorization'] = `Bearer ${token}`
    }

    // const locale = store.getters['lang/locale']
    // if (locale){
    //     request.headers.common['Accept-Language'] = locale
    // }

    // request.headers['X-Socket-Id'] = Echo.socketId()

    return request
})