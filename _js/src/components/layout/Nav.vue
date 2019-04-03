<template>
  <v-slide-x-reverse-transition>
    <v-speed-dial
      v-model="fab"
      bottom
      right
      direction="top"
      transition="slide-y-transition"
      fixed
      v-show="show"
      class="nav-speed-dial"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="blue"
          fab
          dark
          :loading="isProcessing">
          <v-icon v-if="!pageTip.show">menu</v-icon>
          <span style="left: unset; top: unset; font-size: 16px;" class="btn-text" v-else>/ {{ pageTip.page }}</span>
          <v-icon>close</v-icon>
        </v-btn>
      </template>
      <v-btn v-for="(n, index) in nav" :key="index" @click="n.click"
        fab small color="white">
        <v-icon v-if="n.icon">{{ n.icon }}</v-icon>
        <span v-else>{{ n.text }}</span>
      </v-btn>
    </v-speed-dial>
  </v-slide-x-reverse-transition>
</template>

<script>
import mixin from 'app/utils/mixin'

export default {
  data: () => ({
    fab: false,
    pageTip: {
      show: false,
      page: 1
    }
  }),
  props: {
    isProcessing: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    nav () {
      let nav = this.$store.getters['blog/nav'].map(n => ({
        click: () => this.goTo(n.href),
        icon: n.icon
      }))

      if (this.showPagination) {
        nav.length = 1

        if (this.currentPage < this.pagination.length - 1) {
          nav.push({
            click: () => this.goTo(this.pagination[this.currentPage + 1] + '/'),
            icon: 'last_page'
          })
        }

        if (this.currentPage !== 0) {
          nav.push({
            click: () => this.goTo(this.pagination[this.currentPage - 1] + '/'),
            icon: 'first_page'
          })
        }
      }

      return nav
    },
    pagination () { return this.$store.getters['blog/pagination'] },
    currentPage () { return this.pagination.findIndex(v => v === '#') },
    showPagination () { return this.pagination.length > 1 }
  },
  watch: {
    showPagination: {
      handler (s) {
        if (s) {
          this.$nextTick(() => {
            this.pageTip.show = true
          })
        } else {
          this.pageTip.show = false
        }
      },
      immediate: true
    },
    currentPage: {
      handler (p) {
        this.$nextTick(() => {
          this.pageTip.page = this.currentPage + 1
        })
      },
      immediate: true
    }
  },
  mixins: [mixin]
}
</script>

<style lang="scss" scoped>
.nav-speed-dial {
  z-index: 10;
}
</style>
