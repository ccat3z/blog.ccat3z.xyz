<template>
  <div>
    <md-card class="home-card">
      <md-card-header>
        <md-avatar>
          <img :src="authorInfo.avatar" alt="Avatar">
        </md-avatar>

        <div class="md-title">{{ authorInfo.name }}</div>
        <div class="md-subhead">{{ authorInfo.description }}</div>
      </md-card-header>

      <md-card-content>
        <slot></slot>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { MdCard, MdAvatar } from 'vue-material/dist/components'

Vue.use(MdCard)
Vue.use(MdAvatar)

export default {
  props: {
    authorInfo: Object
  }
}
</script>

<style>
.home-card {
  width: 90%;
  max-width: 450px;
  height:fit-content;
  max-height: 100%;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  overflow: auto;
}
</style>
