const state = {
  actions: [],
  selected: null
}

const mutations = {
  SELECT_ACTION (state, { index }) {
    state.selected = index
  },
  CREATE_ACTION (state, { action }) {
    state.actions.splice(state.selected + 1, 0, { ...action })
    state.selected += 1
  },
  DELETE_ACTION (state, { index }) {
    state.actions.splice(index, 1)
    state.selected = Math.min(state.selected, state.actions.length - 1)
  },
  UPDATE_ACTION (state, { index, action }) {
    state.actions.splice(index, 1, { ...action })
  },
  MOVE_ACTION_UP (state, { index }) {
    if (index === 0) {
      return
    }
    const action = state.actions.splice(index, 1)[0]
    state.actions.splice(index - 1, 0, action)
    state.selected -= 1
  },
  MOVE_ACTION_DN (state, { index }) {
    if (index === state.actions.length - 1) {
      return
    }
    const action = state.actions.splice(index, 1)[0]
    state.actions.splice(index + 1, 0, action)
    state.selected += 1
  }
}

// Pass the payload of each action to the respective mutation
const actions = Object.keys(mutations).map(mutation => {
  return {
    name: mutation,
    function ({ commit }, payload) {
      commit(mutation, payload)
    }
  }
}).reduce((actions, action) => Object.assign(
  actions,
  {
    [action.name]: action.function
  }
), {})

export default {
  state,
  mutations,
  actions
}
