import Vue from 'vue'
import $ from 'jquery'
import './hide-orig-data.css'
import Blog from './components/Blog.vue'

/* eslint-disable no-new */
new Vue(Blog).$mount('#blog')

window.jQuery = window.$ = $
require('velocity-animate')
require('masonry-layout/dist/masonry.pkgd.js')
