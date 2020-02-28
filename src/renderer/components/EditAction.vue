<template>
  <b-card class="edit-action h-100 border-top-0 border-right-0 border-bottom-0">
    <div slot="header">
      Edit Action
      <strong v-if="selected !== undefined">#{{ selected + 1 }}</strong>
    </div>
    <component :is="action ? `action-${action.action}` : null" :action="action"></component>
    <b-card-text v-if="selected === undefined">Select or create an action.</b-card-text>
  </b-card>
</template>

<script>
import ActionClick from '@/components/actions/Click'
import ActionMove from '@/components/actions/Move'
import ActionPixel from '@/components/actions/Pixel'
import ActionWait from '@/components/actions/Wait'
import ActionGoTo from '@/components/actions/GoTo'

export default {
  computed: {
    selected () {
      const selected = this.$store.state.actions.selected
      return selected[selected.length - 1]
    },
    action () {
      return this.$store.state.actions.actions[this.selected]
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
.edit-action .card-body
  flex: 1 1 0
  overflow-y: auto

  .form-group:last-child
    margin-bottom: 0
</style>
