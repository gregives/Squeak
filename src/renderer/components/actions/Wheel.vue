<template>
  <form>
    <b-form-group label="Horizontal scroll">
      <b-form-input v-model="editAction.scroll.x" type="number" :step="1" @change="updateAction"></b-form-input>
    </b-form-group>
    <b-form-group label="Vertical scroll">
      <b-form-input v-model="editAction.scroll.y" type="number" :step="1" @change="updateAction"></b-form-input>
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
        action: 'wheel',
        scroll: {
          x: 0,
          y: 0
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
