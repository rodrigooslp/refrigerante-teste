import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drinks: [],
    loading: false
  },
  getters: {
    drinks: state => state.drinks,
    loading: state => state.loading
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },

    setDrinks (state, payload) {
      state.drinks = payload
    }
  },
  actions: {
    async getDrinks ({ commit }) {
      commit('setLoading', true)

      const { data } = await axios.get('https://api.adsim.co/crm/api/v1/refrigerante/listar')

      commit('setDrinks', data)
      commit('setLoading', false)
    }
  }
})
