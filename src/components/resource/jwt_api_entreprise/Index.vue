<template>
  <ul class="token__list">
    <li class="panel" v-for="(jwt, index) in jwtList" :key="index">
      <jwt-api-entreprise-card :jwt="jwt" :enabled="enabled"/>
    </li>
  </ul>
</template>

<script>
import JwtApiEntrepriseShow from '@/components/resource/jwt_api_entreprise/Show'

export default {
  name: 'jwt-api-entreprise-index',

  props: {
    jwtList: Array,
    enabled: {
      type: Boolean,
      default: true
    }
  },

  components: {
    'jwt-api-entreprise-card': JwtApiEntrepriseShow
  }
}
</script>

<style lang="scss" scoped>
  .token__list {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  .panel {
    margin-bottom: 1em;
  }
</style>
