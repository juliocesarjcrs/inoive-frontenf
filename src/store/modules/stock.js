import axios from 'axios'
import Helper from '../../services/helper'
const state = {
    products: [],
    providers: []
}

const getters = {
    products: state => state.products,
    providers: state => state.providers,
}

const mutations = {
    SET_PRODUCTS(state, products){
        state.products = products
    },
    SET_PROVIDERS(state, providers){
        state.providers = providers
    }
}
const actions = {
    
    async getProducts({ commit }){
        try {
            const {data} = await axios.get('product').catch(e =>Helper.HandlingErrors(e))              
            commit('SET_PRODUCTS', data.body)
        } catch (e){
            Helper.error_catch(e)
        }    
    },
    async getProviders({ commit }){
        try {
            const {data} = await axios.get('provider').catch(e =>Helper.HandlingErrors(e))              
            commit('SET_PROVIDERS', data.body)
        } catch (e){
            Helper.error_catch(e)
        }    
    }
}
export default {
    namespaced: true,
    name: 'stock',
    state,
    getters,
    actions,
    mutations
}
