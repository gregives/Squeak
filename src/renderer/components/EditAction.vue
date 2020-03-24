<template>
  <b-card class="edit-action h-100 border-top-0 border-right-0 border-bottom-0">
    <div slot="header">
      Edit Action
      <strong v-if="selected !== undefined">#{{ selected + 1 }}</strong>
    </div>
    <component :is="action ? action.action : null" :action="action"></component>
    <b-card-text v-if="selected === undefined">Select or create an action.</b-card-text>
  </b-card>
</template>

<script>
import actions from '@/components/actions'

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
  components: actions
}
</script>

<style lang="sass">
.edit-action .card-body
  flex: 1 1 0
  overflow-y: auto

  > form > .form-group:last-child
    margin-bottom: 0
</style>
