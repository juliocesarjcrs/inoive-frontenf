import axios from 'axios'
// state
const state = {
    user: {
        name: null,
        address: null,
        city: null,
        date: null,
        nit: null,
        phone: null,
        typeId:null,
        email:null,
    }
}

// getters
const getters = {
    user: state => state.user,
}

const mutations = {
    SET_USER(state, user){
        state.user = user
    }
}
// actions
const actions = {
    async getLoggedUser({ commit }){
        // const {data} = await axios.get('user/5f0e3eadd5dcc6207c3fd5d8') // local
        const {data} = await axios.get('user/5f0948da92d5b73308946151') // produccion
        
        commit('SET_USER', data.body)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}