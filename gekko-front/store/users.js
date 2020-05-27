import axios from 'axios'
import { Endpoint } from '@@/utils/ApiUtils'

/*
 * state
 */
export const state = () => ({
  user: {
    id: null,
    name: '',
    email: ''
  }
})

/*
 * mutations
 */
export const mutations = {
  set(state, user) {
    state.user = user
  }
}

/**
 * getters
 */
export const getters = {
  getUser(state) {
    return state.user
  }
}

/*
 * actions
 */
export const actions = {
  async fetchUser({ commit, state }, id) {
    const { data } = await axios.get(Endpoint.Users.detail(id))
    commit('set', data.user)
  }
}
