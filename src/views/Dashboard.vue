<template>
  <div class="dashboard">
    <div class="section-top">
      <span class="header-title">Weatherify</span>
      <div class="header-right">
        <button class="logout-button" @click="logout">
          Logout <i style="margin-left: 1rem" class="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </div>

    <div class="weather-container">
      <router-view> </router-view>
    </div>
    <nav class="section-left">
      <ul>
        <NavigationItem
            v-for="navigationItem in navigationItems"
            :key="navigationItem.text"
            :text="navigationItem.text"
            :to="navigationItem.to"
            :icon="navigationItem.icon"
        />
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import NavigationItem from "@/components/NavigationItem.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Dashboard",
  components: {
    NavigationItem,
  },

  data() {
    return {
      navigationItems: [
        {
          text: "Weather",
          to: "/dashboard/weather",
          icon: "fas fa-cloud-moon",
        },
        {
          text: "Favorites",
          to: "/dashboard/favorite-city",
          icon: "fas fa-heart",
        },
      ],
    };
  },
  methods: {
    logout: function () {
      localStorage.removeItem("X-token");
      this.$router.push("/");
    },
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("X-token")) {
      next();
    }
  },
});
</script>

<style scoped>
ul {
  margin-top: 0;
}

.weather-container {
  height: 0;
  display: flex;
  margin-left: 10rem;
  flex-wrap: wrap;
}
.header-title {
  font-size: 24px;
  color: #fff700;
  margin-top: 20px;
  margin-left: 42px;
}

.section-left {
  background-color: #0f3b58;
  width: 11rem;
  height: calc(110vh);
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
  background-color: #1a669a;
  color: white;
  font-size: 22px;
}

.logout-button:hover {
  color: #35a3e3;
}

.section-top {
  display: flex;
  justify-content: center;
  height: 76px;
  background-color: #1a669a;
}
</style>
