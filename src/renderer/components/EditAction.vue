<template>
  <b-card>
    <h6 slot="header" class="mb-0">
      Edit Action
      <div class="float-right">
        <b-button size="sm">^</b-button>
        <b-button size="sm">v</b-button>
        <b-button variant="danger" size="sm">D</b-button>
      </div>
    </h6>
  </b-card>
</template>

<script>
export default {
  name: 'edit-action'
}
</script>

<style lang="sass">
  .card-header .float-right
    margin-top: -6.5px
    margin-bottom: -6.5px
</style>
