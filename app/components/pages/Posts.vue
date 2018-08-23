<template>
  <mansonry-list>
    <div class="grid-item post-item-card-wrapper" v-for="(v, index) in posts" :key="index">
      <post-item-card :post="posts[index]"/>
    </div>
  </mansonry-list>
</template>

<script>
import PostItemCard from '../modules/PostItemCard.vue'
import MansonryList from './base/MasonryList.vue'
import $ from 'jquery'

export default {
  props: {
    content: String
  },
  computed: {
    posts: function () {
      return $('ul.posts-list > li', $('<div>').html($(this.content))).map((i, e) => ({
        title: $('a.post-title', e).html(),
        href: $('a.post-title', e).attr('href'),
        date: $('.post-date', e).text(),
        shortDescription: $('.post-short-description', e).text(),
        tags: $('.post-tags > li > a.post-tag', e).map((i, e) => ({
          name: $(e).text(),
          href: $(e).attr('href')
        })).toArray()
      })).toArray()
    }
  },
  components: {
    PostItemCard, MansonryList
  }
}
</script>

<style lang="scss">
.post-item-card-wrapper {
  padding: 6px;
}
</style>
