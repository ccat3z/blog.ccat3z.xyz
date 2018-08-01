<template>
  <div>
    <md-card class="not-found-card md-accent md-display-4 target-card">
      <slot></slot>
    </md-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { MdCard } from 'vue-material/dist/components'

Vue.use(MdCard)

export default { }
</script>

<style>
.not-found-card {
  min-width: 500px;
  width: fit-content;
  max-width: 100%;
  height: fit-content;
  max-height: 100%;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  overflow: auto;
  padding: 50px;
  text-align: center;
}
</style>
