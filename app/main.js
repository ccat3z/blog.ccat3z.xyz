import Vue from 'vue'
import Blog from 'app/Blog.vue'

import $ from 'jquery'

window.jQuery = window.$ = $
require('velocity-animate')
require('isotope-layout/dist/isotope.pkgd.min.js')
require('jquery-visible')

/* eslint-disable no-new */
new Vue(Blog).$mount('#blog')
