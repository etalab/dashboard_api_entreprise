<template lang="pug">
  .profile__group
    h2(class="main-title") Tokens de l’organisation
    jwt-api-entreprise-new(v-if="isAdmin")

    div(v-if="tokens.length > 0 || blacklistedTokens.length > 0")
      jwt-api-entreprise-index(:jwtList="tokens" v-if="tokens.length > 0")
      div(v-if="isAdmin && blacklistedTokens.length > 0")
        h2 Tokens blacklistés
        jwt-api-entreprise-index(:jwtList="blacklistedTokens")
    p(v-else) Aucun token attribué

</template>

<script>
import JWTAPIEntrepriseNew from "@/components/resource/jwt_api_entreprise/New";
import JWTAPIEntrepriseIndex from "@/components/resource/jwt_api_entreprise/Index";
import { mapGetters } from "vuex";

export default {
  name: "UserTokens",

  computed: {
    ...mapGetters({
      tokens: "user/tokens",
      blacklistedTokens: "user/blacklistedTokens",
      isAdmin: "auth/isAdmin"
    })
  },

  components: {
    "jwt-api-entreprise-new": JWTAPIEntrepriseNew,
    "jwt-api-entreprise-index": JWTAPIEntrepriseIndex
  }
};
</script>

<style lang="scss" scoped>
h2 {
  display: inline-block;
}
</style>
