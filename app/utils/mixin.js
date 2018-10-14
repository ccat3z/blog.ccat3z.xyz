export default {
  methods: {
    goTo: function goTo (href) {
      this.$root.$router.push(href)
    }
  }
}
