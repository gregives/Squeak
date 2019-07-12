<template>
  <form>
    <b-button @click="getPosition" block variant="primary" class="mb-3">Click position</b-button>
    <b-row>
      <b-col>
        <b-form-group label="X position">
          <b-form-input v-model="editAction.firstPosition.x" type="number" number :step="1" @change="updateAction"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Y position">
          <b-form-input v-model="editAction.firstPosition.y" type="number" number :step="1" @change="updateAction"></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-form-group>
      <b-form-checkbox v-model="editAction.random" @change="updateAction">Random</b-form-checkbox>
    </b-form-group>
    <b-row v-show="editAction.random">
      <b-col>
        <b-form-group label="X position">
          <b-form-input v-model="editAction.secondPosition.x" type="number" number :step="1" @change="updateAction"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="Y position">
          <b-form-input v-model="editAction.secondPosition.y" type="number" number :step="1" @change="updateAction"></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-form-group label="Duration">
      <b-input-group append="ms">
        <b-form-input v-model="editAction.duration" type="number" number @change="updateAction"></b-form-input>
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
            this.editAction.firstPosition.x = firstEvent.x
            this.editAction.firstPosition.y = firstEvent.y
            this.editAction.secondPosition.x = secondEvent.x
            this.editAction.secondPosition.y = secondEvent.y
            this.editAction.random = this.editAction.firstPosition.x !== this.editAction.secondPosition.x ||
              this.editAction.firstPosition.y !== this.editAction.secondPosition.y
            ioHook._events = []
            ioHook._eventsCount = 0
            ioHook.enableClickPropagation()
          })
        })
      })
    },
    defaultAction () {
      return {
        action: 'move',
        firstPosition: {
          x: 0,
          y: 0
        },
        random: true,
        secondPosition: {
          x: 0,
          y: 0
        },
        duration: 0
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
