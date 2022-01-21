<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
      name: "BaseCard"
    }
) </script>

<style scoped>
div {
  margin-top: 6rem;
  margin-left: 1rem;
  width: 16rem;
  height: 26rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
}
</style>
