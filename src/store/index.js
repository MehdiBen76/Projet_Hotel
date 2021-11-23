import Vue from 'vue'
import Vuex from 'vuex'
import { SET_LOG } from '@/store/mutation-types';
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            nomCompte: "Veuillez vous connectez",
            connected: false,
        }
    },
    getters: {
        getUser(state) {
          return state.user.nomCompte;
        }
      },
    mutations: {
        connexion(state, ndc) {
            state.user.nomCompte = ndc;
            state.user.connected = true;
        },
        deconnexion(state) {
            state.user.nomCompte = "Veuillez vous connectez";
            state.user.connected = false;
        },
        [SET_LOG](state, ndc) {
            state.user.nomCompte = ndc;

        }
    },
    actions: {
    },
    modules: {
    }
})
