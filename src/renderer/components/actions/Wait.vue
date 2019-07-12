<template>
  <form>
    <b-form-group label="Wait">
      <b-input-group append="ms">
        <b-form-input v-model="editAction.wait" type="number" number @change="updateAction"></b-form-input>
      </b-input-group>
    </b-form-group>
    <b-form-group label="Random">
      <b-input-group append="ms">
        <b-form-input v-model="editAction.random" type="number" number @change="updateAction"></b-form-input>
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
      return this.$store.state.Actions.selected
    }
  },
  methods: {
    defaultAction () {
      return {
        action: 'wait',
        wait: 1000,
        random: 1000
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
