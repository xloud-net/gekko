/*
 * state
 */
export const state = () => ({
  errors: []
})

/*
 * mutations
 */
export const mutations = {
  set(state, errors) {
    state.errors = errors
  }
}

/**
 * getters
 */
export const getters = {
  get(state) {
    return state.errors
  }
}

/*
 * actions
 */
export const actions = {
  set({ commit, state }, errors) {
    commit('set', errors)
  },
  clear({ commit, state }, errors) {
    commit('set', [])
  }
}
