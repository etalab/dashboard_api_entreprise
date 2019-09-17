<template lang="pug">
  .main
    h2 Rôles
    button.button.small.title-button(@click="roleForm") Ajouter un rôle
    .panel
      table.table
        thead
          tr
            th.text-left(v-for="header in headers") {{ header.text }}
        tbody
          tr(v-for="role in index")
            td {{ role.name }}
            td {{ role.code }}
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("role");

export default {
  name: "RoleIndex",
  data() {
    return {
      headers: [
        { text: "Nom", value: "name", align: "left" },
        { text: "Code", value: "code", align: "left" }
      ]
    };
  },

  computed: {
    ...mapGetters(["index"])
  },

  created: function() {
    this.$store.dispatch("role/index");
  },

  methods: {
    roleForm: function() {
      this.$router.push({ name: "roleNew" });
    }
  }
};
</script>

<style lang="scss" scoped>
h2 {
  display: inline-block;
}
</style>
