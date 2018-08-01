<template>
  <transition name="nav-fade">
   <div v-show="show">
     <md-speed-dial class="nav-speed-dial md-bottom-right" md-direction="top" md-event="click">
       <md-speed-dial-target class="md-primary nav-toggle-button" v-on:click="active = !active">
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
  </transition>

</template>

<script>
import Vue from 'vue'
import $ from 'jquery'
import { MdSpeedDial, MdIcon, MdButton, MdProgress, MdTooltip } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(MdSpeedDial)
Vue.use(MdIcon)
Vue.use(MdButton)
Vue.use(MdProgress)
Vue.use(MdTooltip)

export default {
  data: () => ({
    active: false
  }),
  props: {
    nav: {
      type: Array,
      default: () => []
    },
    isProcessing: {
      type: Boolean,
      default: false
    },
    goTo: Function,
    show: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    show: (v) => v || $('.nav-toggle-button').click()
  }
}
</script>

<style>
.nav-speed-dial {
  z-index: 10
}

.nav-fade-enter-active, .nav-fade-leave-active {
  transition: opacity .3s;
}

.nav-fade-enter, .nav-fade-leave-to /* .nav-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
