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
import $ from 'jquery'

export default {
  props: {
    itemSelector: {
      type: String,
      default: '.grid-item'
    }
  },
  mounted: function () {
    $('.masonry-list-grid').isotope()
  },
  updated: function () {
    this.$nextTick(() => $('.masonry-list-grid').isotope('reloadItems').isotope())
  }
}
</script>

<style lang="scss">
.masonry-list-grid {
  width: 100%;
  max-width: 900px;

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
