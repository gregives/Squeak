<template>
  <b-row no-gutters>
    <b-col cols="auto">
      <div class="bg-white border-bottom border-right shadow-sm p-4">
        <b-dropdown split text="Record" variant="danger" class="mr-2">
          <b-dropdown-item href="#">Play from beginning</b-dropdown-item>
          <b-dropdown-item href="#">Play from selected</b-dropdown-item>
        </b-dropdown>
        <b-dropdown split text="Play" variant="success" class="mr-2" @click="startPlayback">
          <b-dropdown-item href="#">Play from beginning</b-dropdown-item>
          <b-dropdown-item href="#">Play from selected</b-dropdown-item>
        </b-dropdown>
        <b-dropdown split text="Stop" variant="info" @click="pausePlayback">
          <b-dropdown-item href="#">Play from beginning</b-dropdown-item>
          <b-dropdown-item href="#">Play from selected</b-dropdown-item>
        </b-dropdown>
      </div>
    </b-col>
    <b-col cols="auto">
      <div class="bg-white border-bottom border-right shadow-sm p-4">
        <b-button @click="addClick">Click</b-button>
        <b-button @click="addWheel">Wheel</b-button>
        <b-button @click="addMove">Move</b-button>
        <b-button @click="addKey">Key</b-button>
        <small class="position-absolute text-muted bottom-left text-center w-100">
          New Action
        </small>
      </div>
    </b-col>
    <b-col>
      <div class="bg-white border-bottom shadow-sm p-4"></div>
    </b-col>
  </b-row>
</template>

<script>
import ActionClick from './actions/Click'
import ActionWheel from './actions/Wheel'
import ActionMove from './actions/Move'
import ActionKey from './actions/Key'

const { ipcRenderer } = require('electron')

export default {
  computed: {
    selected () {
      return this.$store.state.Actions.selected
    },
    actions () {
      return this.$store.state.Actions.actions
    }
  },
  methods: {
    addClick () {
      this.$store.dispatch('CREATE_ACTION', {
        action: ActionClick.methods.defaultAction()
      })
    },
    addWheel () {
      this.$store.dispatch('CREATE_ACTION', {
        action: ActionWheel.methods.defaultAction()
      })
    },
    addMove () {
      this.$store.dispatch('CREATE_ACTION', {
        action: ActionMove.methods.defaultAction()
      })
    },
    addKey () {
      this.$store.dispatch('CREATE_ACTION', {
        action: ActionKey.methods.defaultAction()
      })
    },
    startPlayback () {
      ipcRenderer.send('START_PLAYBACK', this.actions, 0)
    },
    pausePlayback () {
      this.$store.dispatch('PAUSE_PLAYBACK')
    }
  }
}
</script>

<style scoped lang="sass">
.row > div > div
  height: 100%
</style>
