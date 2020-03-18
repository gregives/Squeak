<template>
  <form>
    <b-form-group label="Go to">
      <b-input-group prepend="#">
        <b-form-input v-model="editAction.goTo" type="number" number :step="1" @input="updateAction"></b-form-input>
      </b-input-group>
    </b-form-group>
  </form>
</template>

<script>
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
    defaultAction () {
      return {
        action: 'goTo',
        goTo: 0
      }
    },
    getTableValues (action) {
      return {
        action: 'Go to',
        value: `Action #${action.goTo}`
      }
    },
    updateAction () {
      this.$store.dispatch('UPDATE_ACTION', {
        action: this.editAction
      })
    },
    actionFunction (action, robot, callback) {
      callback(action.goTo)
    }
  }
}
</script>
