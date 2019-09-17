<template lang="pug">
  .main
    .panel
      //- .panel__header
      //-   h2 Liste des utilisateurs
      //-   button.button.small.title-button(@click="userForm") Ajouter un utilisateur

      .form__group
        .panel
          h3 Liste des utilisateurs
          button.button.small.title-button(@click="userForm") Ajouter un utilisateur
          input.table__filter(v-model="search", placeholder="recherche par UUID, email, contexte")
          table.table
            thead
              th.ascending E-mail
              th.descending Contexte
              th.ascending Confirmé
            tr(v-for="user in userList")
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
      search: ""
    };
  },

  computed: {
    ...mapGetters(["userList"])
  },

  created: function() {
    this.$store.dispatch("user/index/index");
  },

  methods: {
    userForm: function() {
      this.$router.push({ name: "userNew" });
    }
  }
};
</script>

<style lang="scss" scoped>
.panel > h3,
.panel > button {
  display: inline-block;
  margin-left: 10px;
  margin-right: 10px;
}

.panel > button {
  float: right;
}

td,
th {
  word-break: initial;
}
</style>
