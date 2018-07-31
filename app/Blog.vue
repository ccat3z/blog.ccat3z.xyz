<template>
  <div>
    <md-progress-bar v-if="loadState.isLoading" md-mode="indeterminate" :class="{ 'md-accent': accent }"></md-progress-bar>
    <router-view></router-view>
    <Nav :nav="nav" :router="router"/>
  </div>
</template>

<script>
import Vue from 'vue'
import Nav from './Nav.vue'
import Home from './Home.vue'
import {getNavs, getAuthorInfoInHome, getRealContentInHome, refreshBlogData, getContent, log} from './utils'
import VueRouter from 'vue-router'
import { MdProgress } from 'vue-material/dist/components'
const axios = require('axios')

Vue.use(VueRouter)
Vue.use(MdProgress)

var store = {
  authorInfo: {
    name: null,
    avatar: null,
    description: null
  },
  content: {
    type: null,
    content: null
  },
  loadState: {
    isLoading: false,
    isRouted: true
  }
}

var router = new VueRouter({
  mode: 'history',
  routes: [
    { name: 'home', path: '/', component: Home, props: {authorInfo: store.authorInfo, content: store.content} },
    { path: '*' }
  ]
})

window.store = store
window.router = router

router.beforeEach((to, from, next) => {
  if (!store.loadState.isLoading && store.loadState.isRouted) {
    // ready to router
    log.i('router', 'loading ' + to.fullPath)
    store.loadState.isLoading = true
    store.loadState.isRouted = false
    axios.get(to.path).then((resp) => {
      refreshBlogData(resp.data)
      store.loadState.isLoading = false

      router.push(to.fullPath)
    }).catch((e) => {
      store.loadState.isLoading = false
      store.loadState.isRouted = true
      console.log('fail to load ' + to.fullPath)
    })
    next(false)
  } else if (!store.loadState.isLoading && !store.loadState.isRouted) {
    // loaded
    log.i('router', 'loaded ' + to.fullPath)
    store.loadState.isRouted = true

    var content = getContent()
    store.content.content = content.type
    store.content.content = content.content

    switch (to.name) {
      case 'home':
        var authorInfo = getAuthorInfoInHome(content)
        store.authorInfo.name = authorInfo.name
        store.authorInfo.avatar = authorInfo.avatar
        store.authorInfo.description = authorInfo.description

        store.content.content = getRealContentInHome(content)
        break
    }
    next()
  } else {
    // something is loading
    log.i('router', 'ban ' + to.fullPath)
    router.app.showAccent()
    next(false)
  }
})

export default {
  data: () => ({
    nav: getNavs(),
    isLoading: false,
    isRouted: true,
    router,
    loadState: store.loadState,
    accent: false
  }),
  components: {
    Nav
  },
  router,
  methods: {
    showAccent: function () {
      this.accent = true
      setTimeout(() => (this.accent = false), 500)
    }
  }
}
</script>

<style>
.example {
  color: red
}
</style>
