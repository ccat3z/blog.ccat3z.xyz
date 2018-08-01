<template>
  <div>
    <md-card class="home-card target-card">
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

      <md-card-actions>
        <md-button v-for="(n, index) in nav" :key="index" class="md-icon-button" v-on:click="goTo(nav[index].href)">
          <md-icon>{{ nav[index].icon }}</md-icon>
        </md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { MdCard, MdAvatar, MdButton } from 'vue-material/dist/components'

Vue.use(MdCard)
Vue.use(MdAvatar)
Vue.use(MdButton)

export default {
  props: {
    authorInfo: Object,
    nav: {
      type: Array,
      default: () => []
    },
    goTo: Function
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
