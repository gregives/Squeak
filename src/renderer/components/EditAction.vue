<template>
  <b-card class="shadow-sm">
    <div slot="header">
      Edit Action
      <strong v-if="selected !== undefined">#{{ selected + 1 }}</strong>
    </div>
    <component :is="action ? `action-${action.action}` : null" :action="action"></component>
  </b-card>
</template>

<script>
import ActionClick from './actions/Click'
import ActionMove from './actions/Move'
import ActionPixel from './actions/Pixel'
import ActionWait from './actions/Wait'
import ActionGoTo from './actions/GoTo'

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
    ActionWait,
    ActionGoTo
  }
}
</script>

<style lang="sass">
.edit-action
  margin-top: -4rem

  form > .form-group:last-of-type
    margin-bottom: 0
</style>
