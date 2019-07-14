const state = {
  actions: [],
  selected: []
}

const mutations = {
  SELECT_ACTION (state, { indices }) {
    state.selected = indices
  },
  CREATE_ACTION (state, { action }) {
    let selected
    if (state.selected.length > 0) {
      selected = state.selected[state.selected.length - 1]
    } else {
      selected = -1
    }
    state.actions.splice(selected + 1, 0, { ...action })
    state.selected = [selected + 1]
  },
  UPDATE_ACTION (state, { action }) {
    const selected = state.selected[state.selected.length - 1]
    state.actions.splice(selected, 1, { ...action })
  },
  DELETE_ACTION (state) {
    const selected = state.selected
    selected.sort()
    selected.reverse()
    for (let index of selected) {
      state.actions.splice(index, 1)
    }
    state.selected = [Math.min(Math.min(...state.selected), state.actions.length - 1)]
  },
  MOVE_ACTION_UP (state) {
    const selected = state.selected
    selected.sort()
    if (selected[0] === 0) {
      return
    }
    for (let index of selected) {
      const action = state.actions.splice(index, 1)[0]
      state.actions.splice(index - 1, 0, action)
    }
    state.selected = state.selected.map(index => index - 1)
  },
  MOVE_ACTION_DN (state) {
    const selected = state.selected
    selected.sort()
    selected.reverse()
    if (selected[0] === state.actions.length - 1) {
      return
    }
    for (let index of selected) {
      const action = state.actions.splice(index, 1)[0]
      state.actions.splice(index + 1, 0, action)
    }
    state.selected = state.selected.map(index => index + 1)
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
