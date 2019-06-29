<template>
  <b-card no-body class="shadow-sm border-secondary">
    <b-table
      hover
      bordered
      :items="actions"
      class="mb-0"
      @row-clicked="rowClicked"
      show-empty
    >
      <template slot="empty" slot-scope="emptyHtml">
        <h4>Click to add an action</h4>
      </template>
    </b-table>
  </b-card>
</template>

<script>
export default {
  name: 'action-table',
  computed: {
    selected () {
      return this.$store.state.Actions.selected
    },
    actions () {
      return this.$store.state.Actions.actions.map((action, index) => {
        return {
          ...action,
          index,
          _rowVariant: index === this.selected ? 'secondary' : null
        }
      })
    }
  },
  methods: {
    rowClicked (action) {
      this.$store.dispatch('SELECT_ACTION', {
        index: action.index
      })
    }
  }
}
</script>

<style lang="sass">
table
  border: 0 !important

  td
    cursor: pointer

  th,
  tr.b-table-empty-row td
    border-top: 0 !important

  tr:focus
    color: #212529
    background-color: rgba(0, 0, 0, 0.05)
    outline: none

  td
    padding: 0.5rem 0.75rem !important

  td:first-child,
  th:first-child
    border-left: 0 !important

  td:last-child,
  th:last-child
    border-right: 0 !important

  tr:last-child td
    border-bottom: 0 !important
</style>
