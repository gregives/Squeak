<template>
  <div class="bg-white border-bottom shadow-sm p-4">
    <b-dropdown split text="Record" variant="danger" class="mr-2">
      <b-dropdown-item href="#">Play from beginning</b-dropdown-item>
      <b-dropdown-item href="#">Play from selected</b-dropdown-item>
    </b-dropdown>
    <b-dropdown split text="Play" variant="success" class="mr-2">
      <b-dropdown-item href="#">Play from beginning</b-dropdown-item>
      <b-dropdown-item href="#">Play from selected</b-dropdown-item>
    </b-dropdown>
    <b-dropdown split text="Stop" variant="info" class="mr-2">
      <b-dropdown-item href="#">Play from beginning</b-dropdown-item>
      <b-dropdown-item href="#">Play from selected</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  name: 'header-controls'
}
</script>
