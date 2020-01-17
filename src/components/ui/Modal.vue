<template>
  <div class="modal-backdrop">
    <div class="modal panel">
      <slot name="modalText">Souhaitez-vous réaliser cette action ?</slot>
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
  name: "Modal"
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
