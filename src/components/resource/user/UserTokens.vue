<template lang="pug">
  .profile__group
    h2 Tokens de l'utilisateur
    jwt-api-entreprise-new(v-if="isAdmin || allowedToCreateToken")

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

  components: {
    "jwt-api-entreprise-new": JWTAPIEntrepriseNew,
    "jwt-api-entreprise-index": JWTAPIEntrepriseIndex
  },

  computed: {
    ...mapGetters({
      tokens: "user/tokens",
      blacklistedTokens: "user/blacklistedTokens",
      allowedToCreateToken: "user/allowedToCreateToken",
      isAdmin: "auth/isAdmin"
    })
  }
};
</script>

<style lang="scss" scoped>
h2 {
  display: inline-block;
}
</style>
