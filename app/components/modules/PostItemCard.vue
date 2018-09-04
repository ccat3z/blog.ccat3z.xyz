<template>
    <v-card :id="id" class="post-item-card" @click.native="setTarget()">
      <v-card-media :src="lowPolyArt" height="100px" />

      <v-card-title class="post-item-card-title">
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
import $ from 'jquery'
var hash = require('object-hash')
var Trianglify = require('trianglify')

export default {
  props: {
    post: Object
  },
  computed: {
    lowPolyArt: function () {
      return Trianglify({width: 512, height: 512, seed: this.id}).png()
    },
    id: function () {
      return hash(this.post)
    }
  },
  methods: {
    setTarget: function () {
      $('.v-card.target-card').removeClass('target-card')
      $('#' + this.id).addClass('target-card')
    }
  }
}
</script>

<style lang="scss">
.post-item-card {
  height: fit-content;

  &-title {
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
