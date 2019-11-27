<template lang="pug">
.dialog
  button.button.small.title-button(@click="showDialog") Editer
  .dialog-backdrop(v-if="dialog")
    .dialog.panel
      h2 Notes

      .form__group
        textarea(rows="8" cols="100" v-model="noteField")

      .action-buttons
        button.button.small(@click="submit") Valider
        button.button.small.warning(@click="reset") Annuler
</template>

<script>
export default {
  name: "NoteUpdate",

  props: {
    userId: {
      type: String,
      default: ""
    },
    note: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      dialog: false,
      noteField: this.note
    };
  },

  methods: {
    submit: function() {
      let payload = {
        note: this.noteField
      };

      this.$store
        .dispatch("user/update", { params: payload, userId: this.userId })
        .then(() => {
          this.dialog = false;
        })
        .catch(() => {
          // TODO something went wrong
        });
    },

    reset: function() {
      this.dialog = false;
      this.noteField = this.note;
    },

    showDialog: function() {
      this.noteField = this.note;
      this.dialog = true;
    }
  }
};
</script>

<style lang="scss" scoped>
label.label-inline {
  color: $color-black;
}

.dialog-backdrop {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.action-buttons {
  margin-top: 2em;
}
</style>
