import './init'
import Vue from 'vue'
import './hide-orig-data.css'
import Blog from './components/Blog.vue'

/* eslint-disable no-new */
new Vue(Blog).$mount('#blog')
