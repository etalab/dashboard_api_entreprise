<template lang="pug">
  .main
    .panel
      .header
        h2 Liste des jetons
        input.table__filter(v-model="search", placeholder="Recherche par cas d'usage, JTI")

      table.table
        thead
          th.ascending(
            @click='toggleSortBy("iat")'
            v-bind:class='{ descending: order["iat"] == "desc" }'
          ) Date création
          th.ascending(
            @click='toggleSortBy("subject")'
            v-bind:class='{ descending: order["subject"] == "desc" }'
          ) Cas d'usage
          th.ascending(
            @click='toggleSortBy("exp")'
            v-bind:class='{ descending: order["exp"] == "desc" }'
          ) Date d'expiration
          th.ascending(
            @click='toggleSortBy("archived")'
            v-bind:class='{ descending: order["archived"] == "desc" }'
          ) Archivé
          th.ascending(
            @click='toggleSortBy("blacklisted")'
            v-bind:class='{ descending: order["blacklisted"] == "desc" }'
          ) Blacklisté
        tr(v-for="token in tokenListFiltered")
          td {{ token.iat | fromTimestampToLocaleDate }}
          td(v-if="token.user_id")
            router-link(:to="{ name: 'admin-user-tokens', params: { userId: token.user_id }}") {{ token.subject }}
          td(v-else) {{ token.subject }}
          td {{ token.exp | fromTimestampToLocale }}
          td {{ token.archived | friendlyBoolean }}
          td {{ token.blacklisted | friendlyBoolean }}
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("jwt_api_entreprise");

export default {
  name: "JwtApiEntrepriseList",

  computed: {
    ...mapGetters(["tokenListFiltered", "order"]),
    search: {
      get() {
        return this.$store.getters["jwt_api_entreprise/search"];
      },
      set(value) {
        this.$store.commit("jwt_api_entreprise/updateSearch", value);
      }
    }
  },

  created: function() {
    this.$store.dispatch("jwt_api_entreprise/index");
  },

  methods: {
    toggleSortBy: function(element) {
      this.$store.dispatch("jwt_api_entreprise/toggleSort", element);
    }
  }
};
</script>

<style lang="scss" scoped>
h2 {
  display: inline-block;
  vertical-align: top;
}

td,
th {
  word-break: initial;
}

th {
  cursor: pointer;
}
</style>
