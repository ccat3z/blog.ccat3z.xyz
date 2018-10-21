<template>
  <v-app>
    <!-- <background /> -->
    <md-card-transition-content class="blog-main-ui">
      <home v-if="pageType === 'home'">
      </home>
      <post v-else-if="pageType === 'post'" />
      <posts v-else-if="pageType === 'posts-list'" :key="rootPath" />
      <not-found v-else-if="pageType === 'not-found'" :key="errorMessage">{{ errorMessage }}</not-found>
      <message v-else-if="pageType === 'message'" />
      <construction v-else/>
    </md-card-transition-content>
    <Nav :show="pageType !== 'home' || isLoading" :is-processing="isLoading"/>
    <ICP :show="pageType === 'home'" />
  </v-app>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'

import 'material-design-icons/iconfont/material-icons.css'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'

import Home from 'pages/Home.vue'
import Post from 'pages/Post.vue'
import Posts from 'pages/Posts.vue'
import NotFound from 'pages/NotFound.vue'
import Construction from 'pages/Construction.vue'
import Message from 'pages/Message.vue'

import Nav from 'components/layout/Nav.vue'
import Background from 'components/layout/Background.vue'
import MdCardTransitionContent from 'components/layout/MdCardTransitionContent.vue'
import ICP from 'components/ICP.vue'

import 'app/style/hide-orig-data.css'

import { log } from 'app/utils/common'
import store from 'app/store'

const axios = require('axios')
const CancelToken = axios.CancelToken

let cancelLoad

Vue.use(VueRouter)
Vue.use(Vuetify)

var router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '*' }
  ]
})

router.beforeEach(function loadBlogPage (to, from, next) {
  var blog = router.app
  if (blog.isLoading === undefined) {
    next()
    return
  }

  if (!blog.isLoading) {
    // ready to router
    log.d('router', 'loading ' + to.fullPath)
    blog.isLoading = true
    axios.get(to.path, {
      cancelToken: new CancelToken((c) => (cancelLoad = c))
    }).then((resp) => {
      blog.$store.commit('blog/reloadBlogData', resp.data)

      log.d('router', 'loaded ' + to.fullPath)
      blog.isLoading = false
    }).catch((e) => {
      if (axios.isCancel(e)) {
        log.d('router', 'canceled ' + to.fullPath)
        return
      }

      log.w('router', 'fail to load ' + to.fullPath)
      blog.isLoading = false

      blog.errorMessage = e.response ? e.response.status : e.message
      router.push('/404.html')
    }).then(() => {
    })
    next()
  } else {
    // something is loading
    cancelLoad()
    blog.isLoading = false
    loadBlogPage(to, from, next)
  }
})

export default {
  data: () => ({
    isLoading: false,
    accent: false,
    errorMessage: '404'
  }),
  computed: {
    pageType: function () { return this.$store.getters['blog/pageType'] },
    rootPath: function () { return this.$store.getters['blog/rootPath'] }
  },
  watch: {
    isLoading: function (val, oldVal) {
      if (!val) this.accent = false
    }
  },
  store,
  components: {
    Nav, Home, Post, Posts, NotFound, Construction, Message, MdCardTransitionContent, Background, ICP
  },
  router,
  methods: {
    showAccent: function () {
      this.accent = true
    }
  }
}
</script>

<style>
/* html { overflow-y: auto; } */
</style>
