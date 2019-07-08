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
        <b-button @click="addClick">Mouse</b-button>
        <b-button>Key</b-button>
        <b-button>Text</b-button>
        <b-button>Wait</b-button>
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

export default {
  methods: {
    addClick () {
      this.$store.dispatch('CREATE_ACTION', {
        action: ActionClick.methods.defaultAction()
      })
    },
    startPlayback () {
      this.$store.dispatch('START_PLAYBACK', {
        index: 0
      })
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
