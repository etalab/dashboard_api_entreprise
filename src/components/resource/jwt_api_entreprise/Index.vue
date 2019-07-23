<template>
  <ul class="token__list">
    <li class="panel" v-for="(jwt, index) in jwtList" :key="index">
      <jwt-api-entreprise-show :jwt="jwt" />
    </li>
  </ul>
</template>

<script>
import JwtApiEntrepriseShow from '@/components/resource/jwt_api_entreprise/Show'

export default {
  name: 'jwt-api-entreprise-index',

  props: ['jwtList'],

  components: {
    'jwt-api-entreprise-show': JwtApiEntrepriseShow
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
