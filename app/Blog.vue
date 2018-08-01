<template>
  <div>
    <md-progress-bar v-if="isLoading" md-mode="indeterminate" :class="{ 'md-accent': accent }" class="progress"></md-progress-bar>
    <md-card-transition>
      <home v-if="pageType === 'home'" :author-info="authorInfo" :nav="nav" :go-to="goTo">
        <div v-html="contentHtml"></div>
      </home>
      <not-found v-else>{{ errorMessage }}</not-found>
    </md-card-transition>
    <Nav :nav="nav" :go-to="goTo" :show="pageType !== 'home'"/>
    <background />
  </div>
</template>

<script>
import Vue from 'vue'
import Nav from './Nav.vue'
import Home from './Home.vue'
import NotFound from './NotFound.vue'
import Background from './Background.vue'
import MdCardTransition from './MdCardTransition.vue'
import {getNavs, getAuthorInfo, getRealContent, refreshBlogData, getContent, log} from './utils'
import VueRouter from 'vue-router'
import { MdProgress } from 'vue-material/dist/components'
const axios = require('axios')
const CancelToken = axios.CancelToken
let cancelLoad

Vue.use(VueRouter)
Vue.use(MdProgress)

var router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '*' }
  ]
})

window.router = router

router.beforeEach(function loadBlogPage (to, from, next) {
  var blog = router.app
  if (blog.isLoading === undefined) {
    next()
    return
  }

  if (!blog.isLoading) {
    // ready to router
    log.i('router', 'loading ' + to.fullPath)
    blog.isLoading = true
    axios.get(to.path, {
      cancelToken: new CancelToken((c) => (cancelLoad = c))
    }).then((resp) => {
      refreshBlogData(resp.data)
      blog.content = getContent()

      log.i('router', 'loaded ' + to.fullPath)
      blog.isLoading = false
    }).catch((e) => {
      if (axios.isCancel(e)) {
        log.i('router', 'canceled ' + to.fullPath)
        return
      }

      log.w('router', 'fail to load ' + to.fullPath)
      blog.isLoading = false
      window.error = e

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
    content: getContent(),
    errorMessage: '404'
  }),
  computed: {
    pageType: function () { return this.content.type },
    authorInfo: function () { return getAuthorInfo(this.content) },
    contentHtml: function () { return getRealContent(this.content) }
  },
  watch: {
    isLoading: function (val, oldVal) {
      if (!val) this.accent = false
    }
  },
  components: {
    Nav, Home, NotFound, MdCardTransition, Background
  },
  router,
  methods: {
    showAccent: function () {
      this.accent = true
    },
    goTo: function (href) {
      this.router.push(href)
    }
  }
}
</script>

<style>
</style>
