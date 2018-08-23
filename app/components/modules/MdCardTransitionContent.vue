<!-- transition .md-card.target-card -->
<template>
  <v-content class="v-card-transition-wrap">
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
    <v-card class="fake-card"></v-card>
  </v-content>
</template>

<script>
import { rgb2Hex } from '../../utils'
import $ from 'jquery'

export default {
  data: () => ({
    fromEl: null, // $
    toEl: null // $
  }),
  computed: {
    fromCard: function () {
      return $('.v-card.target-card', this.fromEl)
    },
    toCard: function () {
      return $('.v-card.target-card', this.toEl)
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

      this.fakeCard.css('z-index', 9)
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
      this.fakeCard.velocity(this.toCardStyle, {complete: done})
    },
    afterEnter: function (el) {
      this.toCard.css('opacity', 1)
      this.fakeCard.css('box-shadow', 'none')
      this.fakeCard.velocity({opacity: 0}, {duration: 'fast', complete: () => this.fakeCard.css('z-index', -1)})

      this.fromEl = null
      this.toEl = null
    },
    cloneCardStyle: function (card) {
      let offset = card.offset() || {top: 0, left: 0}
      return {
        top: offset.top - $(window).scrollTop() + 'px',
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
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  position: absolute;
  opacity: 0;
  z-index: -1;
}

.v-card-transition-wrap {
  height: inherit;
}
</style>
