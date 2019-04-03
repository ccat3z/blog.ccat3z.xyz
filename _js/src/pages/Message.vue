<template>
  <message-base :icon="icon" :color="color" :message="message"/>
</template>

<script>
import MessageBase from './MessageBase.vue'
import $ from 'jquery'

export default {
  computed: {
    _content: function () { return this.$store.getters['blog/content'] },
    color: function () { return $(this._content).filter('div.color').html() },
    icon: function () { return $(this._content).filter('div.icon').html() },
    message: function () { return $(this._content).filter('div.message').html() }
  },
  components: {
    MessageBase
  }
}
</script>
