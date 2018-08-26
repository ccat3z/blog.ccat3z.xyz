<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-card class="not-found-card display-4 error" dark>
        <slot></slot>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import '../../ui.scss'

export default { }
</script>

<style>
.not-found-card {
  width: fit-content;
  max-width: 100%;
  height: fit-content;
  max-height: 100%;
  padding: 50px 60px 50px 60px;
  text-align: center;
}
</style>
