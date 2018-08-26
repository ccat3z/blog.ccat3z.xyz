<template>
  <v-card class="target-card" :color="color">
    <v-card-actions>
      <v-btn block flat :to="to" active-class="" append :disable="disable">
        <slot>BUTTON</slot>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    to: String,
    color: String,
    disable: Boolean
  }
}
</script>
