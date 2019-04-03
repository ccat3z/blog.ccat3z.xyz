<template>
<div class="posts-list">
  <post-item-card
    class="post-item-card"
    v-for="(v, index) in posts"
    :key="posts[index].id"
    :post="v"
  />
</div>
</template>

<script>
import PostItemCard from './PostItemCard.vue'
import { getPostInfo } from 'pages/Post.vue'
import $ from 'jquery'

export default {
  computed: {
    content: function () { return this.$store.getters['blog/content'] },
    posts: function () {
      return $('ul.posts-list > li', $('<div>').html($(this.content))).toArray().map(getPostInfo)
    }
  },
  components: {
    PostItemCard
  }
}
</script>

<style lang="scss" scoped>
$gap: 20px;
$gap-small: 10px;

.posts-list {
  display: flex;
  flex-direction: column;
  align-items: center;

  & .post-item-card {
    width: calc(100% - 10px);
    margin: calc(#{$gap} / 2);

    &:first-child {
      margin-top: $gap;
    }

    &:last-child {
      margin-bottom: $gap;
    }

    @media only screen and (max-width: 450px) {
      width: 100%;
      margin: calc(#{$gap-small} / 2);

      &:first-child {
        margin-top: $gap-small;
      }

      &:last-child {
        margin-bottom: $gap-small;
      }
    }
  }
}
</style>
