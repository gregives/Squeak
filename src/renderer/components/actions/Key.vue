<template>
  <form>
    <b-form-group label="Key">
      <b-form-input v-model="editAction.key" @change="updateAction"></b-form-input>
    </b-form-group>
    <b-form-group label="Press type">
      <b-form-select v-model="editAction.type" @change="updateAction">
        <option value="press">Press</option>
        <option value="down">Key down</option>
        <option value="up">Key up</option>
      </b-form-select>
    </b-form-group>
  </form>
</template>

<script>
const robot = require('robotjs')

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
        name: 'action-key',
        key: 'enter',
        type: 'press',
        play (callback) {
          if (this.type === 'press') {
            robot.keyTap(this.key)
          } else {
            robot.keyToggle(this.key, this.type)
          }
          callback()
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
