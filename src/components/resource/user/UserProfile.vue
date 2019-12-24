<template lang="pug">
div
  .profile__group
    h2(class="main-title") Profil de organisation
    .panel
      dl.form__group
        dt Adresse e-mail
        dd.headline {{ userDetails.email }}
      dl.form__group
        dt Siret de organisation
        dd.headline {{ userDetails.context }}

  template(v-if="isAdmin")
    .profile__group
      h2 Notes
      note-update(:userId="userDetails.id", :note="userDetails.note")
      .panel
        div(v-html="toHtml(userDetails.note)")

</template>

<script>
import NoteUpdate from "@/components/resource/user/NoteUpdate";
import { mapGetters } from "vuex";
import marked from "marked";

export default {
  name: "UserProfile",

  computed: {
    ...mapGetters({
      userDetails: "user/userDetails",
      isAdmin: "auth/isAdmin"
    })
  },

  methods: {
    toHtml(markdownText) {
      if (markdownText == null) {
        return "Pas de note enregistrée";
      } else {
        return marked(markdownText);
      }
    }
  },

  components: {
    "note-update": NoteUpdate
  }
};
</script>

<style lang="scss" scoped>
h2 {
  display: inline-block;
}

dl:first-child {
  margin-top: 0;
}

.enabled :last-child {
  color: $color-blue;
  font-weight: 700;
}
</style>
