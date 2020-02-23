<template>
  <form>
    <b-button @click="getPosition" block variant="primary" class="mb-3">Click position</b-button>
    <b-form-group label="Color">
      <b-form-input v-model="editAction.color" type="color" @input="updateAction"></b-form-input>
    </b-form-group>
    <b-row>
      <b-col>
        <b-form-group label="X position">
          <b-form-input v-model="editAction.position.x" type="number" number :step="1" @input="updateAction"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Y position">
          <b-form-input v-model="editAction.position.y" type="number" number :step="1" @input="updateAction"></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-form-group label="Poll every">
      <b-input-group append="ms">
        <b-form-input v-model="editAction.polling" type="number" number @input="updateAction"></b-form-input>
      </b-input-group>
    </b-form-group>
    <b-form-group label="Timeout">
      <b-input-group append="ms">
        <b-form-input v-model="editAction.timeout" type="number" number @input="updateAction"></b-form-input>
      </b-input-group>
    </b-form-group>
    <b-form-group label="After timeout">
      <b-input-group prepend="#">
        <b-form-input v-model="editAction.afterTimeout" type="number" number @input="updateAction"></b-form-input>
      </b-input-group>
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
      return this.$store.state.actions.selected[0]
    }
  },
  methods: {
    getPosition () {
      ioHook.start()
      ioHook.disableClickPropagation()
      this.$nextTick(() => {
        ioHook.on('mousedown', firstEvent => {
          ioHook.on('mouseup', secondEvent => {
            const color = robot.getPixelColor(secondEvent.x, secondEvent.y)
            this.editAction.position.x = secondEvent.x
            this.editAction.position.y = secondEvent.y
            this.editAction.color = '#' + color
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
        color: '#000000',
        polling: 100,
        timeout: 10000,
        afterTimeout: 0
      }
    },
    getTableValues (action) {
      const position = `[${action.position.x}, ${action.position.y}]`

      return {
        action: 'Pixel',
        value: `Color ${action.color}, ${position}, poll ${action.polling}ms, timeout ${action.timeout}ms, #${action.afterTimeout}`
      }
    },
    updateAction () {
      this.$store.dispatch('UPDATE_ACTION', {
        action: this.editAction
      })
    }
  }
}
</script>
