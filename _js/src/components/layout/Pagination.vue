<template>
    <v-pagination
      v-if="pagination.length > 1"
      v-model="page"
      :length="pagination.length"
      total-visible="5"
    ></v-pagination>
</template>

<script>
import utilsMixin from 'app/utils/mixin'

export default {
  data: () => ({
    page: 0
  }),
  computed: {
    pagination () { return this.$store.getters['blog/pagination'] },
    currentPage () { return this.pagination.findIndex(v => v === '#') + 1 }
  },
  watch: {
    currentPage: {
      handler (p) { this.page = p },
      immediate: true
    },
    async page (p) {
      if (p !== this.currentPage) {
        this.goTo(this.pagination[p - 1] + '/')
      }
    }
  },
  mixins: [utilsMixin]
}
</script>

<style lang="scss" scoped>

</style>
