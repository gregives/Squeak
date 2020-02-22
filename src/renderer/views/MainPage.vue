<template>
  <b-container class="d-flex flex-column vh-100" fluid>
    <header-controls class="flex-shrink-0"></header-controls>
    <b-row class="flex-grow-1">
      <b-col class="d-flex flex-column pr-0" cols="8">
        <selected-controls class="my-3"></selected-controls>
        <action-table class="flex-grow-1"></action-table>
      </b-col>
      <b-col cols="4">
        <edit-action></edit-action>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import HeaderControls from '@/components/HeaderControls'
import ActionTable from '@/components/ActionTable'
import EditAction from '@/components/EditAction'
import SelectedControls from '@/components/SelectedControls'

export default {
  components: {
    HeaderControls,
    ActionTable,
    EditAction,
    SelectedControls
  }
}
</script>
