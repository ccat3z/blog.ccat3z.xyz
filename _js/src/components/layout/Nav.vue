<template>
  <v-slide-x-reverse-transition>
    <v-speed-dial v-model="fab" bottom right direction="top" transition="scale-transition" fixed v-show="show" class="nav-speed-dial">
      <v-btn v-model="fab" slot="activator" color="blue" fab dark :loading="isProcessing">
        <v-icon>menu</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn v-for="(n, index) in nav" :key="index" @click="goTo(nav[index].href)"
        fab small color="white">
        <v-icon>{{ nav[index].icon }}</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-slide-x-reverse-transition>
</template>

<script>
import mixin from 'app/utils/mixin'

export default {
  data: () => ({
    active: false,
    fab: false
  }),
  props: {
    isProcessing: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    nav: function () { return this.$store.getters['blog/nav'] }
  },
  mixins: [mixin]
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
