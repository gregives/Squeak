<template>
  <b-card class="shadow-sm">
    <div slot="header">Edit Action <strong>#{{ selected + 1 }}</strong></div>
    <component :is="action ? `action-${action.action}` : null" :action="action"></component>
  </b-card>
</template>

<script>
import ActionClick from './actions/Click'
import ActionMove from './actions/Move'
import ActionPixel from './actions/Pixel'
import ActionWait from './actions/Wait'

export default {
  computed: {
    selected () {
      const selected = this.$store.state.Actions.selected
      return selected[selected.length - 1]
    },
    action () {
      return this.$store.state.Actions.actions[this.selected]
    }
  },
  components: {
    ActionClick,
    ActionMove,
    ActionPixel,
    ActionWait
  }
}
</script>

<style lang="sass">
.card-header .float-right
  margin-top: -6.5px
  margin-bottom: -6.5px

form > .form-group:last-of-type
  margin-bottom: 0
</style>
