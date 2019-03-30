import Vue from 'vue'
import VueRouter from 'vue-router'
import { log } from 'app/utils/common'
import axios, { CancelToken } from 'axios'

Vue.use(VueRouter)

var router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '*' }
  ]
})

let cancelLoad

router.beforeEach(async function loadBlogPage (to, from, next) {
  var blog = router.app
  if (blog.isLoading === undefined) {
    next()
    return
  }

  if (!blog.isLoading) {
    // ready to router
    log.d('router', 'loading ' + to.fullPath)
    blog.isLoading = true
    try {
      let resp = await axios.get(to.path, {
        cancelToken: new CancelToken((c) => (cancelLoad = () => {
          c()
          blog.isLoading = false
        }))
      })

      blog.$store.commit('blog/reloadBlogData', resp.data)

      log.d('router', 'loaded ' + to.fullPath)
      next()
    } catch (e) {
      if (axios.isCancel(e)) {
        log.d('router', 'canceled ' + to.fullPath)
      } else {
        blog.showAccentMessage(e.response ? e.response.status : e.message)
      }

      log.e('router', 'fail to load ' + to.fullPath)
    } finally {
      blog.isLoading = false
    }
  } else {
    // something is loading
    cancelLoad()
    loadBlogPage(to, from, next)
  }
})

export default router
