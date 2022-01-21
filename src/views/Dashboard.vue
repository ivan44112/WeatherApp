<template>
  <div class=dashboard>
    <div class="section-top">
      <span class="header-title">Weatherify</span>
      <div class="header-right">
        <button class="logout-button" @click="logout">Logout <i style="margin-left: 1rem"
                                                                class="fas fa-sign-out-alt"></i></button>
      </div>
    </div>
    <div class="main-container">
      <nav class="section-left">
        <ul class="menu-items">
          <NavigationItem
              v-for="navigationItem in navigationItems"
              :key="navigationItem.text"
              :text="navigationItem.text"
              :to="navigationItem.to"
          />
        </ul>
      </nav>
      <router-view></router-view>
    </div>
  </div>

</template>

<script lang="ts">
import NavigationItem from '@/components/NavigationItem.vue'
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'Dashboard',
  components: {
    NavigationItem,
  },

  data() {
    return {
      navigationItems: [
        {text: 'Weather', to: '/dashboard/weather'},
        {text: 'Favorites', to: '/dashboard/favorite-city'},
      ],
    }
  },
  methods: {
    logout: function () {
      localStorage.removeItem('X-token')
      this.$router.push('/')
    },
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem('X-token')) {
      console.log('moze dalje')
      next()
    }
  },

})
</script>

<style scoped>

.header-title {
  font-size: 24px;
  color: #FFF700;
  margin-top: 20px;
  margin-left: 42px;
}

.section-left {
  background-color: #0F3B58;
  width: 190px;
  height: calc(100vh - 78px);
  border-right: 1px solid #dae0e5;
}

.header-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding-right: 50px;
}

.logout-button {
  display: flex;
  cursor: pointer;
  border: none;
  background-color: #1A669A;
  color: white;
  font-size: 22px;
}

.logout-button:hover {
  color: #35a3e3;
}

.main-container {
  display: flex;
}

.section-top {
  display: flex;
  justify-content: center;
  height: 76px;
  background-color: #1A669A;
}

</style>
