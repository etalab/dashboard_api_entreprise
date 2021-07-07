<template>
  <div class="panel">
    <div v-if="errorsArePresent" class="notification error">
      <ul>
        <li v-for="(errorMsg, fieldKey) in apiErrors" :key="fieldKey">
          {{ fieldKey }} : {{ errorMsg }}
        </li>
      </ul>
    </div>
    <jwt-api-entreprise-show v-if="jwtIsPresent" :jwt="jwt" />
  </div>
</template>

<script>
import JwtApiEntrepriseShow from "@/components/resource/jwt_api_entreprise/Show";

export default {
  name: "JwtApiEntrepriseMagicLinkShow",

  data() {
    return {
      jwt: {},
      apiErrors: {}
    };
  },

  computed: {
    errorsArePresent: function() {
      const errorsCount = Object.keys(this.apiErrors).length;
      return errorsCount > 0;
    },

    jwtIsPresent: function() {
      return Object.keys(this.jwt).length > 0;
    }
  },

  created: function() {
    this.$store
      .dispatch("jwt_api_entreprise/retrieveFromMagicLink", {
        token: this.$route.query.token
      })
      .then(data => {
        this.jwt = data;
      })
      .catch(error => {
        this.apiErrors = error;
      });
  },

  components: {
    "jwt-api-entreprise-show": JwtApiEntrepriseShow
  }
};
</script>

<style lang="scss" scoped></style>
