<template>
<div>
  <mansonry-list id="top">
    <div class="grid-item post-item-card-wrapper" v-for="(v, index) in posts" :key="posts[index].id">
      <router-button-card v-if="typeof posts[index] === 'number'" :to="pagination[posts[index]]" color="accent">MORE</router-button-card>
      <post-item-card v-else :post="posts[index]" :key="posts[index].id"/>
    </div>
  </mansonry-list>
</div>
</template>

<script>
import PostItemCard from '../modules/PostItemCard.vue'
import RouterButtonCard from '../modules/RouterButtonCard.vue'
import MansonryList from './base/MasonryList.vue'
import $ from 'jquery'
import { getPagination } from '../../utils.js'
var hash = require('object-hash')

export default {
  data: () => ({
    postsByPage: [], // append in watch
    pagination: getPagination() // update in watch
  }),
  props: {
    content: String
  },
  computed: {
    currentPageNum: function () {
      return this.pagination.findIndex((a) => a === '#')
    },
    posts: function () {
      var acc = []

      for (var i = 0; i < this.pagination.length; i++) {
        var e = this.postsByPage[i]
        if (e === undefined) {
          acc = acc.concat(this.isNumeric(acc[acc.length - 1]) ? [] : [i])
        } else {
          acc = acc.concat(e)
        }
      }

      return acc
    }
  },
  watch: {
    content: {
      handler: function () {
        this.pagination = getPagination()

        // ref: https://vuejs.org/v2/guide/list.html#Caveats
        this.$set(this.postsByPage, this.currentPageNum, $('ul.posts-list > li', $('<div>').html($(this.content))).map((i, e) => ({
          title: $('a.post-title', e).html(),
          href: $('a.post-title', e).attr('href'),
          date: $('.post-date', e).text(),
          shortDescription: $('.post-short-description', e).text(),
          tags: $('.post-tags > li > a.post-tag', e).map((i, e) => ({
            name: $(e).text(),
            href: $(e).attr('href')
          })).toArray(),
          id: hash($(e).html())
        })).toArray())
      },
      immediate: true
    }
  },
  methods: {
    isNumeric: (i) => $.isNumeric(i)
  },
  components: {
    PostItemCard, RouterButtonCard, MansonryList
  }
}
</script>

<style lang="scss">
.post-item-card-wrapper {
  padding: 6px;
}
</style>
