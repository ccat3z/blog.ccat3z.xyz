<template>
  <div>
    <posts-item v-for="(v, index) in posts" :key="index" :post="posts[index]" />
  </div>
</template>

<script>
import PostsItem from './PostsItem.vue'

export default {
  props: {
    posts: Array
  },
  components: {
    PostsItem
  }
}
</script>

<style lang="scss">
</style>
