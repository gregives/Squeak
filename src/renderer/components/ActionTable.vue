<template>
  <b-card
    no-body
    class="d-flex flex-column shadow-sm mb-4"
    :footer="`${actions.length} actions, ${selected.length} selected`"
    footer-class="text-muted"
  >
    <b-table
      hover
      bordered
      :fields="fields"
      :items="actions"
      sticky-header="100%"
      class="flex-grow-1 flex-shrink-1 mb-0"
      @row-clicked="rowClicked"
    ></b-table>
  </b-card>
</template>

<script>
export default {
  computed: {
    selected () {
      return this.$store.state.Actions.selected
    },
    actions () {
      return this.$store.state.Actions.actions.map((action, index) => {
        return {
          ...action,
          index,
          _rowVariant: this.selected.includes(index) ? 'primary' : null
        }
      })
    }
  },
  methods: {
    rowClicked (action, clicked, event) {
      if (event.shiftKey) {
        const selected = this.selected[this.selected.length - 1]
        if (clicked > selected) {
          this.$store.dispatch('SELECT_ACTION', {
            indices: Array.from({
              length: clicked - selected + 1
            }, (value, index) => selected + index)
          })
        } else {
          this.$store.dispatch('SELECT_ACTION', {
            indices: Array.from({
              length: selected - clicked + 1
            }, (value, index) => selected - index)
          })
        }
      } else if (event.ctrlKey) {
        const selected = this.selected
        if (selected.includes(clicked)) {
          selected.splice(selected.indexOf(clicked), 1)
        } else {
          selected.push(clicked)
        }
        this.$store.dispatch('SELECT_ACTION', {
          indices: selected
        })
      } else {
        this.$store.dispatch('SELECT_ACTION', {
          indices: [clicked]
        })
      }
    }
  }
}
</script>

<style lang="sass">
table
  border: 0 !important
  user-select: none

  td
    cursor: pointer

  th,
  tr.b-table-empty-row td
    border-top: 0 !important

  tr:focus
    outline: 2px solid #007bff
    outline-offset: -1px

  td
    padding: 0.5rem 0.75rem !important

  td:first-child,
  th:first-child
    border-left: 0 !important

  td:last-child,
  th:last-child
    border-right: 0 !important
</style>
