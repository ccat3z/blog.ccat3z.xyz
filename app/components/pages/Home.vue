<template>
  <div>
    <v-card class="home-card target-card">
      <v-card-title class="home-card-title">
        <v-avatar size="36px" class="home-card-title-avatar">
          <img :src="authorInfo.avatar" alt="avatar">
        </v-avatar>
        <div class="home-card-title-name">
          <div class="">{{ authorInfo.name }}</div>
          <div class="grey--text">{{ authorInfo.description }}</div>
        </div>
      </v-card-title>

      <v-card-text>
        <slot></slot>
      </v-card-text>

      <v-card-actions class="home-card-actions">
        <v-spacer></v-spacer>
        <v-btn v-for="(n, index) in nav" :key="index" icon v-on:click="goTo(nav[index].href)">
          <v-icon>{{ nav[index].icon }}</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    authorInfo: Object,
    nav: {
      type: Array,
      default: () => []
    },
    goTo: Function
  }
}
</script>

<style>
.home-card {
  width: 90%;
  max-width: 450px;
  height: fit-content;
  max-height: 100%;

  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  overflow: auto;
}

.home-card-title {
  margin-bottom: -16px;
}

.home-card-title-avatar {
  margin-right: 16px;
}

.home-card-title-name {
  flex-direction: column;
}

.home-card-actions {
  margin-top: -8px;
}
</style>
