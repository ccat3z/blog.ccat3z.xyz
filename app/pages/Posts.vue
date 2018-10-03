<template>
<div>
  <masonry-list id="top">
    <div class="grid-item post-item-card-wrapper" v-for="(v, index) in posts" :key="posts[index].id">
      <router-button-card v-if="typeof posts[index] === 'number'" :to="pagination[posts[index]]" color="accent">MORE</router-button-card>
      <post-item-card v-else :post="posts[index]" :key="posts[index].id"/>
    </div>
  </masonry-list>
</div>
</template>

<script>
import MasonryList from 'components/pages/MasonryList.vue'

import PostItemCard from 'components/cards/PostItemCard.vue'
import RouterButtonCard from 'components/cards/RouterButtonCard.vue'

import { getPostInfo } from 'pages/Post.vue'

import $ from 'jquery'

export default {
  data: () => ({
    postsByPage: [] // append in watch
  }),
  computed: {
    pagination: function () { return this.$store.getters['blog/pagination'] },
    content: function () { return this.$store.getters['blog/content'] },
    currentPageNum: function () {
      return this.pagination.findIndex((a) => a === '#')
    },
    posts: function () {
      var acc = []

      for (var i = 0; i < this.pagination.length; i++) {
        var e = this.postsByPage[i]
        if (e === undefined) {
          acc = acc.concat($.isNumeric(acc[acc.length - 1]) ? [] : [i])
        } else {
          acc = acc.concat(e)
        }
      }

      return acc
    }
  },
  watch: {
    content: {
      handler: function () { this.loadPost() },
      immediate: true
    }
  },
  methods: {
    loadPost: function () {
      // ref: https://vuejs.org/v2/guide/list.html#Caveats
      this.$set(
        this.postsByPage,
        this.currentPageNum,
        $('ul.posts-list > li', $('<div>').html($(this.content))).toArray().map(getPostInfo)
      )
    }
  },
  components: {
    PostItemCard, RouterButtonCard, MasonryList
  }
}
</script>

<style lang="scss">
.post-item-card-wrapper {
  padding: 6px;
}
</style>
