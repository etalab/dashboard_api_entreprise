<template>
  <div class="modal-backdrop">
    <div class="modal panel">
      <div v-if="errorsArePresent" class="notification error">
        <ul>
          <li v-for="(errorMsg, fieldKey) in apiErrors" :key="fieldKey">
            {{ fieldKey }} : {{ errorMsg }}
          </li>
        </ul>
      </div>
      <slot name="modalText">Souhaitez-vous réaliser cette action ?</slot>
      <slot name="modalForm"></slot>
      <div class="action-buttons">
        <button class="button small" @click="$emit('close')">
          Annuler
        </button>
        <button class="button small warning" @click="$emit('submit')">
          <slot name="confirmText">
            Valider
          </slot>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",

  props: {
    apiErrors: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  computed: {
    errorsArePresent: function() {
      return Object.keys(this.apiErrors).length > 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  display: inline-block;
}

.modal-backdrop {
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
  padding: 5em 0;
}
</style>
