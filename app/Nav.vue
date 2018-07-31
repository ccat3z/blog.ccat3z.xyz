<template>
  <div>
    <md-speed-dial class="md-bottom-right md-fixed" md-direction="top" md-event="click">
      <md-speed-dial-target class="md-primary">
        <md-icon class="md-morph-initial">menu</md-icon>
        <md-icon class="md-morph-final">close</md-icon>
      </md-speed-dial-target>

      <md-speed-dial-content>
        <md-button v-for="(n, index) in nav" :key="index" class="md-icon-button" v-on:click="goTo(nav[index].href)">
          <md-icon>{{ nav[index].icon }}</md-icon>
        </md-button>
      </md-speed-dial-content>
    </md-speed-dial>
  </div>

</template>

<script>
import Vue from 'vue'
import { MdSpeedDial, MdIcon, MdButton, MdProgress, MdTooltip } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueRouter from 'vue-router'

Vue.use(MdSpeedDial)
Vue.use(MdIcon)
Vue.use(MdButton)
Vue.use(MdProgress)
Vue.use(MdTooltip)

export default {
  props: {
    nav: {
      type: Array,
      default: () => []
    },
    isProcessing: {
      type: Boolean,
      default: false
    },
    router: VueRouter
  },
  methods: {
    goTo: function (href) {
      this.router.push(href)
    }
  }
}
</script>

<style>
  .md-progress-spinner {
    margin: 24px;
  }
</style>
