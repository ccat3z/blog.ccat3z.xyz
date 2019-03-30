<template>
    <v-card :id="id" class="post-item-card" @click.native="setTarget(id)">
      <div class="image-box">
        <img class="image" :src="post.image"/>
      </div>

      <v-card-title class="title">
        <div>
          <span class="tag-group subheading">
            <span class="grey--text text--darken-2">{{ post.date }}</span>
            <span class="grey--text">/</span>
            <span v-if="post.tags.length > 1" class="grey--text">{</span>
            <span v-for="(n, index) in post.tags" :key="index">
              <router-link :to="post.tags[index].href" class="grey--text text--darken-2 tag">{{ post.tags[index].name }}</router-link>
              <span v-if="index + 1 !== post.tags.length" class="grey--text">, </span>
            </span>
            <span v-if="post.tags.length > 1" class="grey--text">}</span>
            <span class="grey--text">/</span>
          </span>
          <br>
          <router-link class="title post-title black--text" :to="post.href">{{ post.title }}</router-link><br>
          <span class="subheading grey--text">{{ post.shortDescription }}</span>
        </div>
      </v-card-title>
    </v-card>
</template>

<script>
import { UtilsMixin as MdCardTransitionUtilsMixin } from 'components/layout/MdCardTransitionContent.vue'
var hash = require('object-hash')

export default {
  props: {
    post: Object
  },
  computed: {
    id: function () {
      return hash(this.post)
    }
  },
  mixins: [MdCardTransitionUtilsMixin]
}
</script>

<style lang="scss" scoped>
.post-item-card {
  overflow: hidden;
  max-width: 700px;

  @media only screen and (min-width: 450px) {
    min-height: 180px;
    padding: 20px;
  }

  &:hover {
    & .image-box {
      opacity: 0.3;
    }
  }

  & .image-box {
    position: absolute;
    top: 0;
    right: 0;
    transition: opacity 0.5s;
    opacity: 1;

    img {
      min-width: 300px;
      min-height: 300px;
      max-width: 600px;
      max-height: 600px;
    }

    &:after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      background: linear-gradient(to bottom left, rgba(255, 255, 255, 0.3), white 25%);;
      width: 600px;
      height: 600px;
    }
  }

  & .title {
    position: relative;
    .tag-group {
      a.tag {
        text-decoration: none;
        transition: color 500ms;

        &:hover {
          color: #2196F3!important;
        }
      }
    }

    a.post-title {
        text-decoration: none;
        transition: color 500ms;

        &:hover {
          color: #2196F3!important;
        }
    }
  }
}
</style>
