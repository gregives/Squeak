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
    defaultAction () {
      return {
        action: 'key',
        key: 'enter',
        type: 'press'
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
