const state = {
  actions: [
    {
      type: 'Click',
      value: '123, 456',
      label: ''
    },
    {
      type: 'Click',
      value: '300ms',
      label: ''
    },
    {
      action: 'Right click',
      value: '345, 678',
      label: ''
    },
    {
      action: 'Left click',
      value: '456, 789',
      label: ''
    }
  ],
  selected: null
}

const mutations = {
  SELECT_ACTION (state, { index }) {
    state.selected = index
  },
  CREATE_ACTION (state, { action }) {
    state.actions.push(action)
  },
  DELETE_ACTION (state, { index }) {
    state.actions.splice(index, 1)
    state.selected = Math.min(state.selected, state.actions.length - 1)
  },
  UPDATE_ACTION (state, { index, action }) {
    state.actions[index] = Object.assign({}, state.actions[index], action)
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
