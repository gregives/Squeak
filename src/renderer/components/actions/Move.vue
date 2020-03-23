<template>
  <form>
    <b-button @click="getPosition" block variant="primary" class="mb-3">Click position</b-button>
    <b-row>
      <b-col>
        <b-form-group label="X position">
          <b-form-input v-model="editAction.firstPosition.x" type="number" number :step="1" @input="updateAction"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Y position">
          <b-form-input v-model="editAction.firstPosition.y" type="number" number :step="1" @input="updateAction"></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-form-group>
      <b-form-checkbox v-model="editAction.random" @input="updateAction">Random</b-form-checkbox>
    </b-form-group>
    <b-row v-show="editAction.random">
      <b-col>
        <b-form-group label="X position">
          <b-form-input v-model="editAction.secondPosition.x" type="number" number :step="1" @input="updateAction"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Y position">
          <b-form-input v-model="editAction.secondPosition.y" type="number" number :step="1" @input="updateAction"></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-form-group label="Duration">
      <b-input-group append="ms">
        <b-form-input v-model="editAction.duration" type="number" number @input="updateAction"></b-form-input>
      </b-input-group>
    </b-form-group>
  </form>
</template>

<script>
const ioHook = require('iohook')

export default {
  props: {
    action: Object
  },
  computed: {
    editAction () {
      return { ...this.action }
    }
  },
  methods: {
    getPosition () {
      ioHook.start()
      ioHook.disableClickPropagation()
      this.$nextTick(() => {
        ioHook.on('mousedown', firstEvent => {
          ioHook.on('mouseup', secondEvent => {
            this.editAction.firstPosition.x = firstEvent.x
            this.editAction.firstPosition.y = firstEvent.y
            this.editAction.secondPosition.x = secondEvent.x
            this.editAction.secondPosition.y = secondEvent.y
            this.editAction.random = this.editAction.firstPosition.x !== this.editAction.secondPosition.x ||
              this.editAction.firstPosition.y !== this.editAction.secondPosition.y
            this.updateAction()

            ioHook._events = []
            ioHook._eventsCount = 0
            ioHook.enableClickPropagation()
          })
        })
      })
    },
    defaultAction () {
      return {
        action: 'Move',
        firstPosition: {
          x: 0,
          y: 0
        },
        random: false,
        secondPosition: {
          x: 0,
          y: 0
        },
        duration: 0
      }
    },
    getTableValue (action) {
      const firstPosition = `[${action.firstPosition.x}, ${action.firstPosition.y}]`
      const secondPosition = `[${action.secondPosition.x}, ${action.secondPosition.y}]`
      return `${firstPosition}${action.random ? ` to ${secondPosition}` : ''}, ${action.duration}ms`
    },
    updateAction () {
      this.$store.dispatch('UPDATE_ACTION', {
        action: this.editAction
      })
    },
    actionFunction (action, robot, callback) {
      const endPosition = {
        x: Math.floor(Math.random() *
          (action.firstPosition.x - action.secondPosition.x + 1)) + action.secondPosition.x,
        y: Math.floor(Math.random() *
          (action.firstPosition.y - action.secondPosition.y + 1)) + action.secondPosition.y
      }

      if (action.duration === 0) {
        robot.moveMouse(endPosition.x, endPosition.y)
        callback()
      } else {
        const startPosition = robot.getMousePos()
        let startTimestamp
        requestAnimationFrame(function moveMouse (timestamp) {
          startTimestamp = startTimestamp || timestamp
          const ratio = (timestamp - startTimestamp) / action.duration
          if (ratio < 1) {
            const x = (endPosition.x - startPosition.x) * ratio + startPosition.x
            const y = (endPosition.y - startPosition.y) * ratio + startPosition.y
            robot.moveMouse(x, y)
            requestAnimationFrame(moveMouse.bind(action))
          } else {
            robot.moveMouse(endPosition.x, endPosition.y)
            callback()
          }
        })
      }
    }
  }
}
</script>
