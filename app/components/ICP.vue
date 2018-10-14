<template>
    <transition name="fade">
    <div class="icp-info" v-show="show">{{ icp }}</div>
    </transition>
</template>

<script>
export default {
  props: {
    show: Boolean
  },
  computed: {
    icp: function () { return this.$store.getters['blog/icp'] }
  }
}
</script>

<style lang="scss">
.icp-info {
  text-align: center;
  color: #9e9e9e;
  position: absolute;
  bottom: 0;
  width: 100%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
