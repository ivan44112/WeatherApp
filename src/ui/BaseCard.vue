<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseCard",
});
</script>

<style scoped>
@keyframes append-animate {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

div {
  margin-top: 6rem;
  margin-left: 2rem;
  margin-right: 1rem;
  width: 16rem;
  height: 25rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  animation: append-animate 0.3s linear;
}
</style>
