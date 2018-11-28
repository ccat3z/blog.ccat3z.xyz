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
    <v-card class="fake-card" :style="fakeCardStyle"></v-card>
  </v-content>
</template>

<script>
import { rgb2Hex } from 'app/utils/common'
import $ from 'jquery'

function getTargetViewFrom (e, prefCardID) {
  var cards = $('.v-card', e)
  var cardsPref = prefCardID !== undefined ? cards.filter((i, e) => $(e).attr('id') === prefCardID) : []
  var cardsInViewport = cards.filter((i, e) => $(e).visible(false)) // entire visible
  var cardsHasTargetClass = cards.filter((i, e) => $(e).hasClass('target-card'))

  var targetCard
  if (cardsHasTargetClass.length > 0) {
    targetCard = $(cardsHasTargetClass[0])
  } else if (cardsPref.length > 0) {
    targetCard = $(cardsPref[0])
  } else if (cardsInViewport.length > 0) {
    targetCard = $(cardsInViewport[0])
  } else {
    targetCard = $(cards[0])
  }

  var otherCards = cards.filter((i, e) => !$(e).is(targetCard))

  return {
    targetCard,
    otherCards
  }
}

export const UtilsMixin = {
  methods: {
    setTarget: function (id) {
      $('.v-card.target-card').removeClass('target-card')
      $('#' + id).addClass('target-card')
    }
  }
}

/**
 * Transition between different v-card
 */
export default {
  data: () => ({
    hideFakeShadow: false,
    fromCards: undefined,
    toCards: undefined,
    sourceCardID: undefined,
    leavingCardID: undefined
  }),
  computed: {
    fakeCard: () => $('.fake-card'),
    fakeCardStyle: function () {
      return {
        boxShadow: this.hideFakeShadow ? 'none' : undefined
      }
    }
  },
  watch: {
  },
  methods: {
    beforeLeave: function (el) {
      this.fromCards = getTargetViewFrom(el)

      // clone and prepare for covering target leaving card
      this.fakeCard.css({ zIndex: 9 })
      this.fakeCard.css(this.cloneCardStyle(this.fromCards.targetCard))

      // avoid double shadow
      this.hideFakeShadow = true

      // store leaving card id
      this.leavingCardID = this.fromCards.targetCard.attr('id')

      // store target card id
      this.sourceCardID = this.fromCards.targetCard.attr('source-id')
    },
    leave: function (el, done) {
      // hide other leaving card
      this.fromCards.otherCards.velocity({ opacity: 0 }, { duration: 'fast' })

      // cover target leaving card
      this.fakeCard.velocity({ opacity: 1 }, { complete: done, duration: 'fast' })
    },
    afterLeave: function (el) {
      // card leaved, enable shadow on fake card
      this.hideFakeShadow = false
    },
    beforeEnter: function (el) {
      this.toCards = getTargetViewFrom(el, this.sourceCardID)

      // hide entering card
      this.toCards.targetCard.css({ opacity: 0 })
      this.toCards.otherCards.css({ opacity: 0 })
    },
    enter: function (el, done) {
      // move fake card
      this.fakeCard.velocity(this.cloneCardStyle(this.toCards.targetCard), { complete: done })
    },
    afterEnter: function (el) {
      // show entering card
      this.toCards.targetCard.css({ opacity: 1 })
      this.toCards.otherCards.velocity({ opacity: 1 }, { duration: 'fast' })

      // avoid double shadow
      this.hideFakeShadow = true

      // hide fake card
      this.fakeCard.velocity({ opacity: 0 }, { duration: 'fast', complete: () => this.fakeCard.css('z-index', -1) })

      // set from card id
      this.toCards.targetCard.attr('source-id', this.leavingCardID)
    },
    cloneCardStyle: function (card) {
      let offset = card.offset() || { top: 0, left: 0 }
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

<style lang="scss">
.fake-card {
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  position: fixed;
  opacity: 0;
  z-index: -1;
}

.v-card-transition-wrap {
  height: inherit;

  .v-card {
    transition: none;
  }
}
</style>
