<template lang="pug">
  div
    .profile__group
      h2(class="main-title") Contacts
      template(v-if="anyContacts")
        div(v-for="jwtContacts in accountContacts" class="usage")
          h3 Cadre d'utilisation associé : {{ jwtContacts.usage_policy }}
          .contact__container.grid
            contact-tile(class="contact" v-for="(contact, index) in jwtContacts.contacts_data" :contact="contact" :key="index")

      div(v-else) Aucune coordonnée de contact

</template>

<script>
import ContactTile from "@/components/resource/contact/Show";
import { mapGetters } from "vuex";

export default {
  name: "UserContacts",

  computed: {
    ...mapGetters({
      accountContacts: "user/accountContacts",
      anyContacts: "user/anyContacts",
      isAdmin: "auth/isAdmin"
    })
  },

  components: {
    "contact-tile": ContactTile
  }
};
</script>

<style lang="scss" scoped>
h2 {
  display: inline-block;
}

.usage h3 {
  margin-bottom: 0.5em;
}

.usage + .usage {
  margin-top: 5em;
}

.contact + .contact {
  margin-left: 2em;
  margin-top: 0;
}
</style>
