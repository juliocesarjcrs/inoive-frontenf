import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import './assets/app.css'
import VueNumeric from 'vue-numeric'
Vue.use(VueNumeric)
import { ValidationProvider,ValidationObserver  } from 'vee-validate';
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
// import VeeValidate, { Validator } from "vee-validate";
// Vue.use(VeeValidate);
// import es from 'vee-validate/dist/locale/es'
// Indicar uso de idioma español

import { localize } from 'vee-validate';
import es from 'vee-validate/dist/locale/es.json';
localize({
    es,
});
localize('es');
// Validator.localize("es", es);
import { extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';

Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});

Vue.config.productionTip = false
const $ = require('jquery')
// Lo declaramos globalmente
window.$ = $

new Vue({
    render: h => h(App),
}).$mount('#app')
