<template>
  <form>
    <b-row>
      <b-col>
        <b-form-group label="X position">
          <b-form-input v-model="editAction.position.x" type="number" :step="1" @change="updateAction"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Y position">
          <b-form-input v-model="editAction.position.y" type="number" :step="1" @change="updateAction"></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-form-group label="Duration (ms)" class="mt-3">
      <b-form-input v-model="editAction.duration" type="number" :step="1" @change="updateAction"></b-form-input>
    </b-form-group>
  </form>
</template>

<script>
const robot = require('robotjs')
function animationFrame (fun) {
  setImmediate(() => fun(Date.now()))
}

export default {
  props: {
    action: Object
  },
  computed: {
    editAction () {
      return { ...this.action }
    },
    selected () {
      return this.$store.state.ActionList.selected
    }
  },
  methods: {
    defaultAction () {
      return {
        name: 'action-move',
        position: {
          x: 0,
          y: 0
        },
        duration: 0,
        play (callback) {
          if (this.duration === 0) {
            robot.moveMouse(this.position.x, this.position.y)
          } else {
            const startPosition = robot.getMousePos()
            let startTimestamp
            animationFrame(function moveMouse (timestamp) {
              startTimestamp = startTimestamp || timestamp
              const ratio = (timestamp - startTimestamp) / this.duration
              if (ratio < 1) {
                const x = (this.position.x - startPosition.x) * ratio + startPosition.x
                const y = (this.position.y - startPosition.y) * ratio + startPosition.y
                robot.moveMouse(x, y)
                animationFrame(moveMouse.bind(this))
              } else {
                robot.moveMouse(this.position.x, this.position.y)
                callback()
              }
            }.bind(this))
          }
        }
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
