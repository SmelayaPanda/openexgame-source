import * as firebase from 'firebase'

export default {
  // State ---------------------------------------------------
  state: {
    loading: false,
    error: null
  },
  // Mutations ---------------------------------------------------
  mutations: { // to change state
    LOADING:
      (state, payload) => {
        state.loading = payload
      },
    ERR:
      (state, payload) => {
        state.error = payload
      },
    CLEAR_ERR:
      (state) => {
        state.error = null
      }
  },
  // Actions ---------------------------------------------------
  actions: { // specify the mutation
    CLEAR_ERR:
      ({commit}) => {
        commit('CLEAR_ERR')
      },
    ERR:
      ({commit}, payload) => {
        commit('ERR', payload)
      },
    LOADING:
      ({commit}, payload) => {
        commit('LOADING', payload)
      },
    LOG:
      ({commit}, payload) => {
        commit('ERR', payload)
        commit('LOADING', false)
        if (payload.code !== 'aborted') { // offline client
          firebase.database().ref('errLog').push(payload.stack)
        }
      }
  },
  // Getters  ---------------------------------------------------
  getters: {
    loading:
      state => {
        return state.loading
      },
    error:
      state => {
        return state.error
      }
  }
}
