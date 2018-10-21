<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-card class="construction-card" dark color="amber">
        <v-icon x-large class="icon">format_paint</v-icon>
        <p class="title">Coming soon</p>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default { }
</script>

<style lang="scss">
.construction-card {
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
