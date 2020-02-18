<template lang="pug">
  .main
    ul.profile__tabs
      li
        router-link(:to="{ name: routeTo('profile') }") Profil
      li
        router-link(:to="{ name: routeTo('tokens') }") Tokens
      li
        router-link(:to="{ name: routeTo('contacts') }") Contacts

    // Tabs above are yielded here as nested routes
    router-view
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UserTabs",

  props: {
    userId: {
      type: String,
      default: ""
    }
  },

  computed: {
    ...mapGetters({
      isAdmin: "auth/isAdmin"
    })
  },

  created: function() {
    this.$store.dispatch("user/get", { userId: this.userId });
  },

  methods: {
    routeTo(tabName) {
      switch (tabName) {
        case "profile":
          return this.isAdmin ? "admin-user-profile" : "client-profile";

        case "tokens":
          return this.isAdmin ? "admin-user-tokens" : "client-tokens";

        case "contacts":
          return this.isAdmin ? "admin-user-contacts" : "client-contacts";

        default:
          console.error("This route tab do not exists:", tabName);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.profile__tabs {
  margin-bottom: 4em;
  padding: 0;
}

.profile__tabs li {
  display: inline-block;
}

.profile__tabs li + li {
  margin-left: 2em;
}

.profile__tabs a {
  display: inline-block;
  border-radius: 0;
  padding-bottom: 0.5em;
  text-decoration: none;
  border-bottom: 5px solid transparent;
  color: $color-black;
}

.profile__tabs a:hover {
  border-color: $color-light-blue;
  color: $color-light-blue;
}

.profile__tabs .router-link-active {
  border-color: $color-light-blue;
}
</style>
