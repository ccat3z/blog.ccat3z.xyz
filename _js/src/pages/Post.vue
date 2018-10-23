<template>
  <v-container fluid fill-height>
    <v-layout justify-center>
      <v-card class="post-card">
        <div class="post-card-image-box">
          <img :src="info.image" />
        </div>
        <v-card-title class="post-card-title">
          <div>
            <span class="prefix-info headline">
              /

              <span class="key-info" v-if="info.date">{{ info.date }} /</span>

              <span v-if="info.tags.length > 0">
                <span v-if="info.tags.length > 1">{</span>
                <span v-for="(n, index) in info.tags" :key="index">
                  <router-link :to="info.tags[index].href">{{ info.tags[index].name }}</router-link>
                  <span v-if="index + 1 !== info.tags.length">, </span>
                </span>
                <span v-if="info.tags.length > 1">}</span>
                <span>/</span>
              </span>

            </span>
            <!-- <br> -->
            <span class="headline">
              {{ info.title }}
            </span>
          </div>
        </v-card-title>
        <v-card-text class="post-content" v-html="content" />
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import $ from 'jquery'
var hash = require('object-hash')
var Trianglify = require('trianglify')

export function getPostInfo (e) {
  let id = hash($('a.post-title', e).attr('href'))
  let image = $('img.post-image', e).attr('src') || Trianglify({ width: 512, height: 256, seed: id }).png()
  console.log($('img.post-image', e))

  return {
    title: $('a.post-title', e).html(),
    href: $('a.post-title', e).attr('href'),
    date: $('.post-date', e).text(),
    shortDescription: $('.post-short-description', e).text(),
    tags: $('.post-tags > li > a.post-tag', e).map((i, e) => ({
      name: $(e).text(),
      href: $(e).attr('href')
    })).toArray(),
    id,
    image
  }
}

export default {
  data: () => ({
    showPrefixInfo: false
  }),
  computed: {
    _content: function () { return this.$store.getters['blog/content'] },
    info: function () { return getPostInfo($(this._content).filter('div.post-info')) },
    content: function () { return $(this._content).filter('div.content').html() }
  }
}
</script>

<style lang="scss">
@import 'app/style/post.scss';

.post-card {
  width: 100%;
  max-width: 900px;
  height: fit-content;
  max-height: 100%;
  padding: 20px;
  overflow: hidden;

  @media only screen and (max-width: 600px) {
    padding: 5px;
  }

  &-image-box {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 0;

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
      // z-index: -1;
    }
  }

  &-title {
    position: relative;
    z-index: 1;

    .prefix-info {
      color: #9e9e9e;

      .key-info, a {
        color: #616161;
      }

      a {
        text-decoration: none;
        transition: color 500ms;

        &:hover {
          color: #2196F3!important;
        }
      }
    }
  }

  .post-content {
    position: relative;
    z-index: 1;

    @include post;
  }
}
</style>
