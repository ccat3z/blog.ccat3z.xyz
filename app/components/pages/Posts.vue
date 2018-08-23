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

export default {
  props: {
    posts: Array
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
