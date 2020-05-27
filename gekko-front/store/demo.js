export const state = () => ({
  title: 'Store Example',
  message: 'Hello World',
  count1: 0,
  count2: 0
})

export const mutations = {
  increment1(state) {
    state.count1++
  },
  increment2(state) {
    state.count2++
  },
  setCount1(state, num) {
    state.count1 = num
  },
  setCount2(state, num) {
    state.count2 = num
  }
}

export const getters = {
  getCount1(state) {
    return 'Count1 = ' + state.count1
  },
  getCount2(state) {
    return 'Count2 = ' + state.count2
  }
}

export const actions = {
  countup1({ commit, state }) {
    commit('increment1')
  },
  countup2({ commit, state }) {
    commit('increment2')
  }
}
