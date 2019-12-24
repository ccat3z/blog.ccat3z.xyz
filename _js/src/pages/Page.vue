<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-card class="post-card" v-html="content" />
    </v-layout>
  </v-container>
</template>

<script>
import $ from 'jquery'

export default {
  data: () => ({
    content: ''
  }),
  computed: {
    _content: function () { return this.$store.getters['blog/content'] },
  },
  watch: {
    _content: {
      handler (n) {
        if (this.content && this.content.length > 0) return

        this.content = $(this._content).filter('div.content').html()
      },
      immediate: true
    }
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
