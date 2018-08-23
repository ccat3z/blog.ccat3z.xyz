<template>
  <div class="cards-list-center-container">
    <div class='posts-list-grid' data-masonrt="{ itemSelector: '.grid-item', columnWidth: '.grid-sizer', percentPosition: true }">
      <div class="grid-sizer"></div>
      <posts-item v-for="(v, index) in posts" :key="index" :post="posts[index]" class="grid-item"/>
    </div>
  </div>
</template>

<script>
import PostsItem from './PostsItem.vue'
const Masonry = require('masonry-layout/dist/masonry.pkgd.js')

export default {
  props: {
    posts: Array
  },
  components: {
    PostsItem
  },
  mounted: () => new Masonry(document.querySelector('.posts-list-grid'))
}
</script>

<style lang="scss">
.posts-list-grid {
  width: 95%;
  max-width: 1024px;

  .grid-sizer, .grid-item {
    width: 33.33%;
  }

  @media only screen and (max-width: 600px) {
    .grid-sizer, .grid-item {
      width: 50%;
    }
  }
}
</style>
