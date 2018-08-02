<template>
  <div>
    <v-card class="not-found-card display-4 error target-card" dark>
      <slot></slot>
    </v-card>
  </div>
</template>

<style>
.not-found-card {
  width: fit-content;
  max-width: 100%;
  height: fit-content;
  max-height: 100%;
  padding: 50px 60px 50px 60px;
  text-align: center;

  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  overflow: auto;
}
</style>
