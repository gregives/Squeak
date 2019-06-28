<template>
  <sui-table selectable compact celled class="raised">
    <sui-table-header>
      <sui-table-row>
        <sui-table-header-cell collapsing></sui-table-header-cell>
        <sui-table-header-cell>Action</sui-table-header-cell>
        <sui-table-header-cell>Value</sui-table-header-cell>
        <sui-table-header-cell>Label</sui-table-header-cell>
      </sui-table-row>
    </sui-table-header>
    <sui-table-body>
      <sui-table-row
        v-for="(action, index) in actions"
        :key="index"
        @click="selectRow(index)"
        :active="index === selectedRow"
      >
        <sui-table-cell>
          <sui-icon name="mouse pointer"/>
        </sui-table-cell>
        <sui-table-cell>{{ action.action }}</sui-table-cell>
        <sui-table-cell>{{ action.value }}</sui-table-cell>
        <sui-table-cell>{{ action.label }}</sui-table-cell>
      </sui-table-row>
    </sui-table-body>
  </sui-table>
</template>

<script>
export default {
  name: 'ActionTable',
  data () {
    return {
      selectedRow: null
    }
  },
  methods: {
    selectRow (index) {
      this.selectedRow = this.selectedRow === index ? null : index
    }
  },
  props: {
    actions: Array
  }
}
</script>

<style scoped lang="sass">
tr
  cursor: pointer
</style>
