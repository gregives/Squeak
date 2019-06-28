<template>
  <div>
    <sui-segment id="controls">
      <sui-button color="green" content="Play" size="large" icon="play"/>
      <sui-button color="red" content="Record" size="large" icon="circle"/>
      <sui-button color="blue" content="Stop" size="large" icon="square"/>
    </sui-segment>
    <div id="main">
      <sui-grid>
        <sui-grid-column :width="10">
          <action-table :actions="actions"></action-table>
        </sui-grid-column>
        <sui-grid-column :width="6">
          <sui-segment>
            <div id="action-header">
              <h4 is="sui-header" floated="left">
                Edit Action
              </h4>
              <sui-button compact color="red" size="small" icon="trash" floated="right"/>
              <sui-button compact size="small" icon="angle down" floated="right"/>
              <sui-button compact size="small" icon="angle up" floated="right"/>
            </div>
            <sui-divider clearing class="flush"/>
          </sui-segment>
        </sui-grid-column>
      </sui-grid>
    </div>
  </div>
</template>

<script>
import ActionTable from '@/components/ActionTable.vue'

export default {
  name: 'home',
  data () {
    return {
      actions: [
        {
          action: 'Click',
          value: '123, 456',
          label: ''
        },
        {
          action: 'Click',
          value: '123, 456',
          label: ''
        },
        {
          action: 'Click',
          value: '123, 456',
          label: ''
        },
        {
          action: 'Click',
          value: '123, 456',
          label: ''
        }
      ]
    }
  },
  components: {
    ActionTable
  }
}
</script>

<style lang="sass">
#controls
  border-radius: 0

#main
  padding-left: 14px
  padding-right: 14px

#action-header button
  margin-top: -5px

.header-buttons
  h4
    float: left

  .buttons
    float: right

.ui.divider.flush
  margin-left: -14px
  margin-right: -14px
</style>
