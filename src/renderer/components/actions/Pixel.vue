<template>
  <form>
    <b-button @click="getPosition" block variant="primary" class="mb-3">Click position</b-button>
    <b-row>
      <b-col>
        <b-form-group label="X position">
          <b-form-input v-model="editAction.position.x" type="number" number :step="1" @change="updateAction"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Y position">
          <b-form-input v-model="editAction.position.y" type="number" number :step="1" @change="updateAction"></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-form-group label="Color">
      <b-form-input v-model="editAction.color" type="color" @change="updateAction"></b-form-input>
    </b-form-group>
  </form>
</template>

<script>
const robot = require('robotjs')
const ioHook = require('iohook')

export default {
  props: {
    action: Object
  },
  computed: {
    editAction () {
      return { ...this.action }
    },
    selected () {
      return this.$store.state.Actions.selected
    }
  },
  methods: {
    getPosition () {
      ioHook.start()
      ioHook.disableClickPropagation()
      this.$nextTick(() => {
        ioHook.on('mousedown', firstEvent => {
          ioHook.on('mouseup', secondEvent => {
            this.editAction.position.x = secondEvent.x
            this.editAction.position.y = secondEvent.y
            this.editAction.color = '#' + robot.getPixelColor(secondEvent.x, secondEvent.y)
            ioHook._events = []
            ioHook._eventsCount = 0
            ioHook.enableClickPropagation()
          })
        })
      })
    },
    defaultAction () {
      return {
        action: 'pixel',
        position: {
          x: 0,
          y: 0
        },
        color: '#000000'
      }
    },
    updateAction () {
      this.$store.dispatch('UPDATE_ACTION', {
        index: this.selected,
        action: this.editAction
      })
    }
  }
}
</script>
