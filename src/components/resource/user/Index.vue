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
              th.ascending(@click='sortBy("created_at")' v-bind:class="{ descending: isDesc(order.dateCreation) }") Date de création
              th.ascending(@click='sortBy("email")' v-bind:class="{ descending: isDesc(order.email) }") E-mail
              th.ascending(@click='sortBy("context")' v-bind:class="{ descending: isDesc(order.context) }") Contexte
              th.ascending(@click='sortBy("confirmed")' v-bind:class="{ descending: isDesc(order.confirmed) }") Confirmé
            tr(v-for="user in userListFiltered")
              td {{ user.created_at | formatDate }}
              td
                router-link(:to="{ name: 'admin-user-profile', params: { userId: user.email }}") {{ user.email }}
              td {{ user.context }}
              td {{ user.confirmed }}
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import "material-design-icons-iconfont/dist/material-design-icons.css";
const { mapGetters } = createNamespacedHelpers("user/index");

export default {
  name: "UserIndex",

  data() {
    return {
      title: "Utilisateurs",
      order: {
        email: "asc",
        dateCreation: "asc",
        context: "asc",
        confirmed: "asc"
      }
    };
  },

  computed: {
    ...mapGetters(["userListFiltered"]),
    search: {
      get() {
        return this.$store.state.user.index.search;
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
    }
  },

  methods: {
    userForm: function() {
      this.$router.push({ name: "userNew" });
    },
    toggleOrderSort: function(element) {
      if (this.order[element] == "asc") {
        this.order[element] = "desc";
        return "desc";
      } else {
        this.order[element] = "asc";
        return "asc";
      }
    },
    sortBy: function(element) {
      this.$store.commit("user/index/orderIndexBy", {
        element: element,
        direction: this.toggleOrderSort(element)
      });
    },
    isDesc: function(order) {
      return order == "desc";
    }
  }
};
</script>

<style lang="scss" scoped>
td,
th {
  word-break: initial;
}
</style>
