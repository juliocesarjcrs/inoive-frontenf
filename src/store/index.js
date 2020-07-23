// import Vue from 'vue'
// import Vuex from 'vuex'
// import user from './modules/user'
// Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

// export default new Vuex.Store({
//     modules: {
//         user
//     },
//     strict: debug,
//     // plugins: debug ? [createLogger()] : []
// })


import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production';

// Load store modules dynamically.
// const requireContext = require.context('./modules', true, /.*\.js$/)

// const modules = requireContext.keys().map(file =>[file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)]).reduce((modules, [name, module]) => {
//     if(module.namespaced === undefined){
//         module.namespaced = true
//     }
//     return { ...modules, [name]: module }
// }, {})

// export default new Vuex.Store({
//     modules
// })
// https://dev.to/wonder95/dynamically-importing-vuex-store-modules-from-directory-structure-o54
// Import all of the resource store files.
function loadStores(){
    const context = require.context('./modules', true, /.*\.js$/);
    return context.keys().map(context).map(m => m.default)  // get `default` export from each resolved module
}
  
const resourceModules = {};
loadStores().forEach((resource) => {
    resourceModules[resource.name] = resource;
});
export default new Vuex.Store({
    modules: resourceModules,
    strict: debug,
});