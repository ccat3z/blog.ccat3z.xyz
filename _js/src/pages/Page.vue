<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-card class="message-card" v-html="content" />
    </v-layout>
  </v-container>
</template>

<script>
import $ from 'jquery'

export default {
  computed: {
    _content: function () { return this.$store.getters['blog/content'] },
    content: function () { return $(this._content).filter('div.content').html() }
  }
}
</script>

<style lang="scss">
.message-card {
  width: fit-content;
  max-width: 90%;
  max-height: 90%;
  padding: 0;
  text-align: center;

}
</style>
