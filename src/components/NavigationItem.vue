<template>
  <li class="menu-items">
    <router-link class="items" :to="to">
      {{ text }}
    </router-link>
  </li>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'NavigationItem',
  props: {
    text: String,
    to: String,
  },
})
</script>

<style scoped>
li.menu-items {
  display: flex;
  padding-top: 20px;
  text-align: left;
  letter-spacing: 0;
  opacity: 1;
}

.items {
  color: #ababab;
  text-decoration: none;
  margin: 5px;
  position: relative;
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  overflow: hidden;
}

.items:hover {
  color: white;
}

.items:focus {
  color: white;
}
</style>
