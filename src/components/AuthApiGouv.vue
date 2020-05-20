<template lang="pug">
  .content
    .container
      div(class="notification error" v-if="isOauthError") {{ oauthErrors }}
      div(v-if="loginInProgress") Veuillez patienter...
</template>

<script>
export default {
  name: "AuthApiGouv",

  data() {
    return {
      loginInProgress: true,
      oauthErrors: []
    };
  },

  computed: {
    isOauthError: function() {
      return this.oauthErrors.length > 0;
    }
  },

  created() {
    const authorizationCode = this.$route.query.code;
    this.$store
      .dispatch("auth/loginSignup", authorizationCode)
      .then(() => {
        this.$router.push({ name: "application-panel" });
      })
      .catch(e => {
        this.oauthErrors.push(e);
      })
      .finally(() => {
        this.loginInProgress = false;
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
