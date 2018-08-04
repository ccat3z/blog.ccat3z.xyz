<template>
  <div class="center-container">
    <v-card class="not-found-card display-4 error target-card" dark>
      <slot></slot>
    </v-card>
  </div>
</template>

<script>
import '../../ui.scss'

export default { }
</script>

<style>
.not-found-card {
  width: fit-content;
  max-width: 100%;
  height: fit-content;
  max-height: 100%;
  padding: 50px 60px 50px 60px;
  text-align: center;
}
</style>
