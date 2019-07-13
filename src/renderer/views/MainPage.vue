<template>
  <div id="wrapper">
    <header-controls></header-controls>
    <b-container fluid class="p-4">
      <b-row>
        <b-col cols="8" class="pr-2">
          <action-table></action-table>
        </b-col>
        <b-col cols="4" class="position-fixed top-right mt-4 pr-4">
          <edit-action></edit-action>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import HeaderControls from '@/components/HeaderControls'
import ActionTable from '@/components/ActionTable'
import EditAction from '@/components/EditAction'

export default {
  components: {
    HeaderControls,
    ActionTable,
    EditAction
  }
}
</script>

<style lang="sass">
body
  background-color: #FBFBFB
</style>
