<template>
  <b-card no-body class="shadow-sm">
    <b-table
      hover
      bordered
      selectable
      select-mode="single"
      selected-variant="secondary"
      :items="actions"
      class="mb-0"
    ></b-table>
  </b-card>
</template>

<script>
export default {
  name: 'action-table',
  data () {
    return {
      actions: [
        {
          action: 'Left click',
          value: '123, 456',
          label: ''
        }
      ]
    }
  }
}
</script>

<style lang="sass">
table
  border: 0 !important

  th
    border-top: 0 !important

  td:first-child,
  th:first-child
    border-left: 0 !important

  td:last-child,
  th:last-child
    border-right: 0 !important

  tr:last-child td
    border-bottom: 0 !important
</style>
