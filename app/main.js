import Vue from 'vue'
import Blog from './components/Blog.vue'
import $ from 'jquery'
import './hide-orig-data.css'

/* eslint-disable no-new */
new Vue(Blog).$mount('#blog')

window.jQuery = window.$ = $
require('velocity-animate')
