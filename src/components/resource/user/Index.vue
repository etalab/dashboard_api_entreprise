<template lang="pug">
  .main
    .panel
      .form__group
        .panel
          .header
            h3 Liste des utilisateurs
            button.button.small.title-button(@click="userForm") Ajouter un utilisateur
            input.table__filter(v-model="search", placeholder="recherche par UUID, email, contexte")
          table.table
            thead
              th.ascending(
                @click='toggleSortBy("created_at")'
                v-bind:class='{ descending: order["created_at"] == "desc" }'
              ) Date création
              th.ascending(
                @click='toggleSortBy("email")'
                v-bind:class='{ descending: order["email"] == "desc" }'
              ) E-mail
              th.ascending(
                @click='toggleSortBy("context")'
                v-bind:class='{ descending: order["context"] == "desc" }'
              ) Contexte
              th.ascending(
                @click='toggleSortBy("confirmed")'
                v-bind:class='{ descending: order["confirmed"] == "desc" }'
              ) Confirmé
            tr(v-for="user in userListFiltered")
              td {{ user.created_at | formatDate }}
              td
                router-link(:to="{ name: 'admin-user-profile', params: { userId: user.id }}") {{ user.email }}
              td {{ user.context }}
              td {{ user.confirmed | friendlyBoolean }}
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import "material-design-icons-iconfont/dist/material-design-icons.css";
const { mapGetters } = createNamespacedHelpers("user/index");

export default {
  name: "UserIndex",

  data() {
    return {
      title: "Utilisateurs"
    };
  },

  computed: {
    ...mapGetters(["userListFiltered", "order"]),
    search: {
      get() {
        return this.$store.getters["user/index/search"];
      },
      set(value) {
        this.$store.commit("user/index/updateSearch", value);
      }
    }
  },

  created: function() {
    this.$store.dispatch("user/index/index");
  },

  filters: {
    formatDate: function(date) {
      const parsed = Date.parse(date);
      return new Date(parsed).toLocaleDateString("fr-FR");
    },
    friendlyBoolean: function(boolean) {
      return boolean == true ? "Oui" : "Non";
    }
  },

  methods: {
    userForm: function() {
      this.$router.push({ name: "userNew" });
    },
    toggleSortBy: function(element) {
      this.$store.dispatch("user/index/toggleSort", element);
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

th {
  // created_at, confirmed
  &:first-of-type,
  &:last-of-type {
    width: 12% !important;
  }
  // email
  &:nth-of-type(2) {
    width: 30% !important;
  }
  // context
  &:nth-of-type(3) {
    width: 40% !important;
  }
}
</style>
