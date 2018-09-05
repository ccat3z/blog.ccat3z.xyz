<template>
  <v-app>
    <!-- <background /> -->
    <md-card-transition-content>
      <home v-if="pageType === 'home'" :content="blogPageData.content" :nav="nav">
      </home>
      <posts v-else-if="pageType === 'posts-list'" :content="blogPageData.content" :key="getPagination().key" />
      <not-found v-else-if="pageType === 'not-found'" :key="errorMessage">{{ errorMessage }}</not-found>
      <construction v-else/>
    </md-card-transition-content>
    <Nav :nav="nav" :show="pageType !== 'home' || isLoading" :is-processing="isLoading"/>
  </v-app>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'

import 'material-design-icons/iconfont/material-icons.css'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'

import Home from 'pages/Home.vue'
import Posts from 'pages/Posts.vue'
import NotFound from 'pages/NotFound.vue'
import Construction from 'pages/Construction.vue'

import Nav from 'components/layout/Nav.vue'
import Background from 'components/layout/Background.vue'
import MdCardTransitionContent from 'components/layout/MdCardTransitionContent.vue'

import 'app/style/hide-orig-data.css'

import { getNavs, refreshBlogData, getBlogPageData, getPagination } from 'app/utils/blog-data'
import { log } from 'app/utils/common'
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
      refreshBlogData(resp.data)
      blog.blogPageData = getBlogPageData()

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
    nav: getNavs(),
    isLoading: false,
    router,
    accent: false,
    blogPageData: getBlogPageData(),
    errorMessage: '404'
  }),
  computed: {
    pageType: function () { return this.blogPageData.type }
  },
  watch: {
    isLoading: function (val, oldVal) {
      if (!val) this.accent = false
    }
  },
  components: {
    Nav, Home, Posts, NotFound, Construction, MdCardTransitionContent, Background
  },
  router,
  methods: {
    showAccent: function () {
      this.accent = true
    },
    getPagination
  }
}
</script>

<style>
.blog-main-ui {
  z-index: 1;
}

/* html { overflow-y: auto; } */
</style>
