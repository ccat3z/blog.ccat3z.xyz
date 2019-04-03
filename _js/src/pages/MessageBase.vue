<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-card class="message-card" dark :color="color">
        <v-icon x-large class="icon">{{ icon }}</v-icon>
        <p class="title" v-html="message"></p>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['color', 'icon', 'message']
}
</script>

<style lang="scss">
.message-card {
  width: fit-content;
  max-width: 100%;
  height: fit-content;
  max-height: 100%;
  padding: 50px 60px 30px 60px;
  text-align: center;

  & .icon {
    padding-bottom: 30px;
  }
}
</style>
