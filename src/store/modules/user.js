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
        // const {data} = await axios.get(`user/5f0948da92d5b73308946151`) // produccion
        const ID_USER = process.env.VUE_APP_ID_USER;
        console.log('ID_USER', ID_USER);
        const {data} = await axios.get(`user/${ID_USER}`) // produccion
        
        commit('SET_USER', data.body)
    }
    
}
export default {
    namespaced: true,
    name: 'user',
    state,
    getters,
    actions,
    mutations
}
