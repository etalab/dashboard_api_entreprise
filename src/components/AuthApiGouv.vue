<template lang="pug">
  .content
    .container
      div Veuillez patienter...
</template>

<script>
export default {
  name: "AuthApiGouv",

  created() {
    const authorizationCode = this.$route.query.code;
    this.$store
      .dispatch("auth/loginSignup", authorizationCode)
      .then(() => {
        this.$router.push({ name: "application-panel" });
      })
      .catch(e => {
        console.error(e);
      });
  }
};
</script>

<style lang="scss" scoped>
.content {
  height: calc(100vh - 73px);
  display: flex;
  align-items: center;
  position: relative;
}
</style>
