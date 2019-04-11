<template lang="pug">
  .profile__group
    h2 Tokens de l'utilisateur
    jwt-api-entreprise-new(v-if="isAdmin || allowedToCreateToken")

    div(v-if="tokens.length > 0 || disabledTokens.length > 0")
      jwt-api-entreprise-index(:jwtList="tokens" v-if="tokens.length > 0")
      div(v-if="isAdmin && disabledTokens.length > 0")
        h2 Tokens désactivés
        jwt-api-entreprise-index(:jwtList="disabledTokens" :enabled="false")
    p(v-else) Aucun token attribué

</template>

<script>
import JWTAPIEntrepriseNew from '@/components/resource/jwt_api_entreprise/New'
import JWTAPIEntrepriseIndex from '@/components/resource/jwt_api_entreprise/Index'
import { mapGetters } from 'vuex'

export default {
  name: 'user-tokens',

  computed: {
    ...mapGetters({
      tokens: 'user/tokens',
      disabledTokens: 'user/disabledTokens',
      allowedToCreateToken: 'user/allowedToCreateToken',
      isAdmin: 'auth/isAdmin'
    })
  },

  components: {
    'jwt-api-entreprise-new': JWTAPIEntrepriseNew,
    'jwt-api-entreprise-index': JWTAPIEntrepriseIndex
  }
}
</script>

<style lang="scss" scoped>
  h2 {
    display: inline-block;
  }
</style>
