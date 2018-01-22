<script>
export default {
  name: 'logout',

  created () {
    delete localStorage.token
    this.$store.dispatch('logout')
    this.$router.push({ name: 'login' })
  }
}
</script>
