<template>
  <v-app>
    <!-- <background /> -->
    <md-card-transition-content>
      <home v-if="pageType === 'home'">
      </home>
      <post v-else-if="pageType === 'post'" />
      <posts v-else-if="pageType === 'posts-list'" :key="$router.currentRoute.path" />
      <message v-else-if="pageType === 'message'" />
      <message-base v-else color="amber" icon="format_paint" message="Coming soon"/>
    </md-card-transition-content>
    <Nav :show="pageType !== 'home' || isLoading" :is-processing="isLoading"/>
    <v-snackbar v-model="accent" bottom :timeout="3000" color="red accent-2">{{ message }}</v-snackbar>
  </v-app>
</template>

<script>
import Vue from 'vue'

import 'material-design-icons/iconfont/material-icons.css'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'

import Home from 'pages/Home.vue'
import Post from 'pages/Post.vue'
import Posts from 'pages/posts/Posts.vue'
import Message from 'pages/Message.vue'
import MessageBase from 'pages/MessageBase.vue'

import Nav from 'components/layout/Nav.vue'
// import Background from 'components/layout/Background.vue'
import MdCardTransitionContent from 'components/layout/MdCardTransitionContent.vue'

import 'app/style/hide-orig-data.css'

import store from 'app/store'
import router from './router'

Vue.use(Vuetify)

export default {
  data: () => ({
    isLoading: false,
    accent: false,
    message: null
  }),
  computed: {
    pageType () { return this.$store.getters['blog/pageType'] }
  },
  store,
  components: {
    Nav, Home, Post, Posts, Message, MessageBase, MdCardTransitionContent /*, Background */
  },
  methods: {
    showAccentMessage (msg) {
      this.accent = true
      this.message = msg
    }
  },
  router
}
</script>

<style>
html {
  overflow: hidden;
}
</style>
