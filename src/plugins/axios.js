import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import router from '../plugins/router'

import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
// Agregamos la URL base de nuestra API
const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
axios.defaults.baseURL = RUTA_SERVIDOR;   

Vue.prototype.$axios = axios

// Request interceptor
axios.interceptors.request.use(request => {
    const token = store.getters['auth/token']
    if (token){
        request.headers['Authorization'] = 'Bearer ' + token; 
    }

    return request
})
axios.interceptors.response.use(response => response, error => {
    const { status } = error.response
    if (status === 401){
        router.push({ name: 'login' })
    }
    return Promise.reject(error)
})