<template>
  <ul class="token__list">
    <li v-for="(jwt, index) in jwtList" :key="index" class="panel">
      <jwt-api-entreprise-show :jwt="jwt" />
    </li>
  </ul>
</template>

<script>
import JwtApiEntrepriseShow from "@/components/resource/jwt_api_entreprise/Show";

export default {
  name: "JwtApiEntrepriseIndex",

  props: {
    jwtList: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  components: {
    "jwt-api-entreprise-show": JwtApiEntrepriseShow
  }
};
</script>

<style lang="scss" scoped>
.token__list {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.panel {
  margin-bottom: 1em;
  position: initial;
}
</style>
