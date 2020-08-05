import axios from 'axios'
// state
const state = {
    usuarioDB: null,
    token: localStorage.getItem('token')
}

// getters
const getters = {
    token : state => state.token,
    usuarioDB : state => state.usuarioDB,
    estaActivo: state => !!state.token
}

const mutations = {
    SET_TOKEN(state, user){
        state.token = user
    },
    SET_usuarioDB(state, payload){
        state.usuarioDB = payload
    }
}
// actions
const actions = {
    async login({ commit }, payload){
        try {
            const {data} = await axios.post('login', payload).catch(e =>Helper.HandlingErrors(e))  
            if(data.token){
                localStorage.setItem('token', data.token);
                commit('SET_TOKEN', data.token)
                commit('SET_usuarioDB', data.usuarioDB)               
            }            
        } catch (e){
            Helper.error_catch(e)
        }  
    },
    cerrarSesion({commit}){
        commit('SET_usuarioDB', null);
        localStorage.removeItem('token');
        router.push({name: 'login'});
    },
    leerToken({commit}){
        const token = localStorage.getItem('token');
        if(token){
            commit('SET_TOKEN', token);
        }else{
            commit('SET_usuarioDB', null);
        }
    }
}
export default {
    namespaced: true,
    name: 'auth',
    state,
    getters,
    actions,
    mutations
}
