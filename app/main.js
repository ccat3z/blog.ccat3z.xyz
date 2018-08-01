import Vue from 'vue'
import Blog from './Blog.vue'
import $ from 'jquery'
import './hide-orig-data.css'
import * as utils from './utils'

/* eslint-disable no-new */
new Vue(Blog).$mount('#blog')

window.jQuery = window.$ = $
require('velocity-animate')
