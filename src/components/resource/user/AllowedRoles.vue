<template lang="pug">
  .profile__group
    h2 Droits de l'utilisateur

    .panel
      table.table
        thead
          th Endpoint
          th Actif
        tbody
          tr(v-for="(role, index) in allowedRoles" :key="index" :class="role.allowed ? 'enabled' : 'disabled'")
            td {{ role.name }}
            td {{ role.allowed ? 'Oui' : 'Non' }}

</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UserAllowedRoles",

  computed: {
    ...mapGetters({
      userDetails: "user/userDetails",
      allowedRoles: "user/allowedRoles"
    })
  }
};
</script>

<style lang="scss" scoped>
.enabled :last-child {
  color: $color-blue;
  font-weight: 700;
}

tr.disabled {
  color: $color-dark-grey;
  background: $color-white;
}

h2 {
  display: inline-block;
}

h2 + span {
  margin-left: 0.75em;
  color: $color-dark-grey;
}
</style>
