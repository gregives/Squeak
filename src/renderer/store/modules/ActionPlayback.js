const state = {
  playing: false
}

const mutations = {
  START_PLAYBACK (state, { index, actions }) {
    state.playing = true
    let nextAction = index
    do {
      nextAction = actions[nextAction].play() || nextAction + 1
      state.playing = nextAction < actions.length
    } while (state.playing)
  },
  PAUSE_PLAYBACK (state) {
    state.playing = false
  }
}

const actions = {
  START_PLAYBACK ({ commit, rootState }, { index }) {
    commit('START_PLAYBACK', {
      index,
      actions: rootState.ActionList.actions
    })
  },
  PAUSE_PLAYBACK ({ commit }) {
    commit('PAUSE_PLAYBACK')
  }
}

export default {
  state,
  mutations,
  actions
}
