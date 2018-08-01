<!-- transition .md-card.target-card -->
<template>
  <div>
    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-on:after-leave="afterLeave"
      mode="out-in">
      <slot></slot>
    </transition>
    <md-card class="fake-card"></md-card>
  </div>
</template>

<script>
import { log, rgb2Hex } from './utils'
import $ from 'jquery'
import Vue from 'vue'
import { MdCard } from 'vue-material/dist/components'

Vue.use(MdCard)

export default {
  data: () => ({
    fromEl: null, // $
    toEl: null // $
  }),
  computed: {
    fromCard: function () {
      return $('.md-card.target-card', this.fromEl)
    },
    toCard: function () {
      return $('.md-card.target-card', this.toEl)
    },
    fromCardStyle: function () {
      return this.cloneCardStyle(this.fromCard)
    },
    toCardStyle: function () {
      return this.cloneCardStyle(this.toCard)
    },
    fakeCard: () => $('.fake-card')
  },
  watch: {
  },
  methods: {
    beforeLeave: function (el) {
      this.fromEl = $(el)

      this.fakeCard.css(this.fromCardStyle)
      this.fakeCard.css('box-shadow', 'none')
    },
    leave: function (el, done) {
      this.fakeCard.velocity({opacity: 1}, {complete: done, duration: 'fast'})
    },
    afterLeave: function (el) {
      this.fakeCard.css('box-shadow', this.fromCard.css('box-shadow'))
    },
    beforeEnter: function (el) {
      this.toEl = $(el)
      this.toCard.css('opacity', 0)
      window.toCard = this.toCard
    },
    enter: function (el, done) {
      let velocityStyle = this.toCardStyle
      velocityStyle.backgroundColor = [velocityStyle.backgroundColor, [0, 1.06, 0, 0.99]]
      this.fakeCard.velocity(velocityStyle, {complete: done})
    },
    afterEnter: function (el) {
      this.toCard.css('opacity', 1)
      this.fakeCard.css('box-shadow', 'none')
      this.fakeCard.velocity({opacity: 0}, {duration: 'fast'})

      this.fromEl = null
      this.toEl = null
    },
    cloneCardStyle: function (card) {
      let offset = card.offset() || {top: 0, left: 0}
      return {
        top: offset.top + 'px',
        left: offset.left + 'px',
        width: card.outerWidth() + 'px',
        height: card.outerHeight() + 'px',
        backgroundColor: rgb2Hex(card.css('background-color'))
      }
    }
  }
}
</script>

<style>
.fake-card {
  width: 0px;
  height: 0px;
  position: absolute;
  opacity: 0;
}
</style>
