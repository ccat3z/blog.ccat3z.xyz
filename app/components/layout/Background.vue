<template>
  <div class='background'>
  </div>
</template>

<script>
export default {}
</script>

<style>
.background {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  background-image: url(/images/background.png);
  background-size: cover;
  background-position-x: left;
  z-index: 0;
  filter: brightness(0.4);
}
</style>
