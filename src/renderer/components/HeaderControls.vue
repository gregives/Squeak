<template>
  <b-row no-gutters class="bg-white border-bottom">
    <b-col cols="auto" class="border-right p-4">
      <b-dropdown split text="Play" variant="success" class="mr-2" @click="startPlayback">
        <b-dropdown-item @click="startPlaybackSelected">Play from selected</b-dropdown-item>
      </b-dropdown>
      <b-button variant="info" @click="pausePlayback">Stop</b-button>
    </b-col>
    <b-col cols="auto" class="border-right p-4">
      <b-button @click="addClick">Click</b-button>
      <b-button @click="addMove">Move</b-button>
      <small class="position-absolute text-muted bottom-left text-center mb-1 w-100">
        Mouse
      </small>
    </b-col>
    <b-col cols="auto" class="border-right p-4">
      <b-button @click="addWait">Wait</b-button>
      <b-button @click="addPixel">Pixel</b-button>
      <small class="position-absolute text-muted bottom-left text-center mb-1 w-100">
        Wait
      </small>
    </b-col>
    <b-col cols="auto" class="border-right p-4">
      <b-button @click="addGoTo">Go to</b-button>
    </b-col>
  </b-row>
</template>

<script>
import ActionClick from './actions/Click'
import ActionMove from './actions/Move'
import ActionPixel from './actions/Pixel'
import ActionWait from './actions/Wait'
import ActionGoTo from './actions/GoTo'

const { ipcRenderer } = require('electron')

export default {
  computed: {
    repeat () {
      return this.$store.state.Actions.repeat
    },
    selected () {
      const selected = this.$store.state.Actions.selected
      return selected[selected.length - 1]
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
    addMove () {
      this.$store.dispatch('CREATE_ACTION', {
        action: ActionMove.methods.defaultAction()
      })
    },
    addPixel () {
      this.$store.dispatch('CREATE_ACTION', {
        action: ActionPixel.methods.defaultAction()
      })
    },
    addWait () {
      this.$store.dispatch('CREATE_ACTION', {
        action: ActionWait.methods.defaultAction()
      })
    },
    addGoTo () {
      this.$store.dispatch('CREATE_ACTION', {
        action: ActionGoTo.methods.defaultAction()
      })
    },
    startPlayback () {
      ipcRenderer.send('START_PLAYBACK', this.actions, 0, this.repeat)
    },
    startPlaybackSelected () {
      ipcRenderer.send('START_PLAYBACK', this.actions, this.selected, this.repeat)
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
