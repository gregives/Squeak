<template>
  <b-row no-gutters>
    <b-col cols="auto">
      <div class="bg-white border-bottom border-right shadow-sm p-4">
        <b-dropdown split text="Record" variant="danger" class="mr-2">
          <b-dropdown-item href="#">Play from beginning</b-dropdown-item>
          <b-dropdown-item href="#">Play from selected</b-dropdown-item>
        </b-dropdown>
        <b-dropdown split text="Play" variant="success" class="mr-2">
          <b-dropdown-item href="#">Play from beginning</b-dropdown-item>
          <b-dropdown-item href="#">Play from selected</b-dropdown-item>
        </b-dropdown>
        <b-dropdown split text="Stop" variant="info">
          <b-dropdown-item href="#">Play from beginning</b-dropdown-item>
          <b-dropdown-item href="#">Play from selected</b-dropdown-item>
        </b-dropdown>
      </div>
    </b-col>
    <b-col cols="auto">
      <div class="bg-white border-bottom border-right shadow-sm p-4">
      </div>
    </b-col>
    <b-col>
      <div class="bg-white border-bottom shadow-sm p-4"></div>
    </b-col>
  </b-row>
</template>

<script>
const robot = require('robotjs')
robot.setMouseDelay(2)

const twoPI = Math.PI * 2.0
const screenSize = robot.getScreenSize()
const height = (screenSize.height / 2) - 10
const width = screenSize.width

export default {
  name: 'header-controls',
  methods: {
    testMouse () {
      for (let x = 0; x < width; x++) {
        const y = height * Math.sin((twoPI * x) / width) + height
        robot.moveMouse(x, y)
      }
    }
  }
}
</script>

<style scoped lang="sass">
.row > div > div
  height: 100%
</style>
