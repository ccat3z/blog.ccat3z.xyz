<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-card class="home-card">
        <v-card-title class="home-card-title">
          <v-avatar size="36px" class="home-card-title-avatar">
            <img :src="authorInfo.avatar" alt="avatar">
          </v-avatar>
          <div class="home-card-title-name">
            <div class="">{{ authorInfo.name }}</div>
            <div class="grey--text">{{ authorInfo.description }}</div>
          </div>
        </v-card-title>

        <v-card-text>
          <div v-html="message"></div>
        </v-card-text>

        <v-card-actions class="home-card-actions">
          <v-spacer></v-spacer>
          <v-btn v-for="(n, index) in nav" :key="index" icon v-on:click="goTo(nav[index].href)">
            <v-icon>{{ nav[index].icon }}</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import $ from 'jquery'

export default {
  props: {
    content: String,
    nav: {
      type: Array,
      default: () => []
    },
    goTo: Function
  },
  computed: {
    authorInfo: function () {
      var author = $(this.content).filter('div.author')
      return {
        name: $('.name', author).text(),
        avatar: $('img.avatar', author).attr('src'),
        description: $('.description', author).text()
      }
    },
    message: function () {
      return $(this.content).filter('div.message').html()
    }
  }
}
</script>

<style>
.home-card {
  width: 90%;
  max-width: 450px;
  height: fit-content;
  max-height: 100%;
}

.home-card-title {
  margin-bottom: -16px;
}

.home-card-title-avatar {
  margin-right: 16px;
}

.home-card-title-name {
  flex-direction: column;
}

.home-card-actions {
  margin-top: -8px;
}
</style>
