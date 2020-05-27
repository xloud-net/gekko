import axios from 'axios'
import { Endpoint } from '@@/utils/ApiUtils'

export const state = () => ({
  total: 0,
  list: []
})

export const mutations = {
  // https://mseeeen.msen.jp/deal-with-multiple-arguments-with-action-or-mutation-in-vuex/
  set(state, { total, list }) {
    state.total = total
    state.list = list
  }
}

export const getters = {
  getTotal(state) {
    return state.total
  },
  getList(state) {
    return state.list
  }
}

export const actions = {
  async fetchData({ commit, state }, { offset, limit }) {
    const { data } = await axios.get(Endpoint.Users.list(), {
      params: {
        offset,
        limit
      }
    })
    commit('set', { total: data.total, list: data.users })
  }
}
