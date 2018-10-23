<template>
  <v-container fluid>
    <v-layout align-start justify-center>
      <div class='masonry-list-grid' data-masonrt="{ itemSelector: '.grid-item', columnWidth: '.grid-sizer', percentPosition: true }">
        <div class="grid-sizer"></div>
        <!-- @slot items in masonry with .grid-item -->
        <slot></slot>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
const imagesLoaded = require('imagesloaded')
const Isotope = require('isotope-layout')

function refreshMasonry (iso) {
  imagesLoaded(iso.element, () => {
    iso.reloadItems()
    iso.arrange()
  })
}

export default {
  data: () => ({
    iso: null
  }),
  props: {
    itemSelector: {
      type: String,
      default: '.grid-item'
    }
  },
  mounted: function () {
    this.iso = new Isotope('.masonry-list-grid', { initLayout: false })
    refreshMasonry(this.iso)
  },
  updated: function () {
    this.$nextTick(() => refreshMasonry(this.iso))
  }
}
</script>

<style lang="scss">
.masonry-list-grid {
  width: 100%;
  max-width: 900px;

  .grid-item {
    position: fixed;
    left: -900px;
  }

  .grid-sizer, .grid-item {
    width: calc(100% / 3);
  }

  @media only screen and (max-width: 600px) {
    .grid-sizer, .grid-item {
      width: 50%;
    }
  }

  @media only screen and (max-width: 300px) {
    .grid-sizer, .grid-item {
      width: 100%;
    }
  }
}
</style>
