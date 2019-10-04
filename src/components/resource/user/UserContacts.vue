<template lang="pug">
  div
    .profile__group
      h2 Contacts
      button.button.small.title-button(v-if="isAdmin") Ajouter un contact

      .contact__container.row(v-if="accountContacts.length > 0")
        contact-tile(class="contact" v-for="(contact, index) in accountContacts" :contact="contact" :key="index")
      p(v-else) Aucune coordonnée de contact

    .profile__group(v-if="allowedToCreateToken || isAdmin")
      h2 Contacts associés aux tokens

      .contact__container.row(v-if="tokenContacts.length > 0")
        contact-tile(class="contact" v-for="(contact, index) in tokenContacts" :contact="contact" :key="index")
      p(v-else) Aucune coordonnée de contact (aucun jeton créé jusqu'ici)
</template>

<script>
import ContactTile from "@/components/resource/contact/Show";
import { mapGetters } from "vuex";

export default {
  name: "UserContacts",

  computed: {
    ...mapGetters({
      accountContacts: "user/accountContacts",
      tokenContacts: "user/tokenContacts",
      allowedToCreateToken: "user/allowedToCreateToken",
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

.contact + .contact {
  margin-left: 2em;
  margin-top: 0;
}
</style>
