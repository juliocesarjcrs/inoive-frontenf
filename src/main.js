import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import './assets/app.css'
import VueNumeric from 'vue-numeric'
import router from './plugins/router'
import './plugins/axios'
import vuetify from '@/plugins/vuetify' 
Vue.use(VueNumeric)
import { ValidationProvider, ValidationObserver, extend, localize } from 'vee-validate'
// Register it globally
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
// import VeeValidate, { Validator } from "vee-validate";
// Vue.use(VeeValidate);
// import es from 'vee-validate/dist/locale/es'
// Indicar uso de idioma español


import es from 'vee-validate/dist/locale/es.json';
localize({
    es,
});
localize('es');
// Validator.localize("es", es);

import * as rules from 'vee-validate/dist/rules';

Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});

Vue.config.productionTip = false
const $ = require('jquery')
// Lo declaramos globalmente
window.$ = $

import Multiselect from 'vue-multiselect'
// register globally
Vue.component('multiselect', Multiselect)

// import axios from 'axios'
// import VueAxios from 'vue-axios'
 
// Vue.use(VueAxios, axios)
// // Agregamos la URL base de nuestra API
// axios.defaults.baseURL = 'http://localhost:3000/api';
// axios.defaults.baseURL = 'https://invoice-generetor-2.herokuapp.com/api';



// Vue.prototype.$axios = axios
import Global from './mixins/global'

Vue.mixin(Global)
import store from './store'
new Vue({
    render: h => h(App),
    router,
    store,
    vuetify
}).$mount('#app')
