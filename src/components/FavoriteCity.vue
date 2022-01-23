<template>
  <transition-group name="fade">
    <BaseCard
        v-for="(city, index) in favoriteCity"
        :key="city.name"
        class="card-container"
    >
      <div class="city-display">
        <p
            class="city-navigation"
            @click="
            selectedCityDailyWeather(city.latitude, city.longitude, city.name)
          "
        >
          <span>{{ city.name }}</span>
          <i class="fas fa-location-arrow"></i>
        </p>
        <p>
          Visibility:<span>{{ city.visibility }} metres</span>
        </p>
        <p>
          Description:<span
        >{{
            city.descriptionOfWeather.charAt(0).toUpperCase() +
            city.descriptionOfWeather.slice(1)
          }}
          </span>
        </p>
        <p>
          Temp:<span>{{ Math.round(city.temperature) }}°C</span>
        </p>
        <p class="image-container">
          <span>
            <img
                :src="`http://openweathermap.org/img/wn/${city.weatherIcon}.png`"
                alt=""
            />
          </span>
        </p>
        <p @click="deleteFavoriteCity(index)" class="delete-city">
          Delete city
          <span><i class="fas fa-trash"></i> </span>
        </p>
      </div>
    </BaseCard>
  </transition-group>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseCard from "@/ui/BaseCard.vue";

interface FavoriteCities {
  name: string;
  visibility: number;
  temperature: number;
  descriptionOfWeather: string;
  weatherIcon: string;
  latitude: number;
  longitude: number;
}

export default defineComponent({
  name: "FavoriteCity",
  components: {
    BaseCard,
  },
  data() {
    return {
      favoriteCity: [] as Array<FavoriteCities>,
    };
  },
  methods: {
    deleteFavoriteCity(index: number) {
      this.favoriteCity.splice(index, 1);
      localStorage.setItem("city", JSON.stringify(this.favoriteCity));
    },
    selectedCityDailyWeather(lat: number, lon: number, cityName: string) {
      this.$router.push({ path: `/weather/${cityName}`, query: { lat, lon } });
    },
  },
  mounted() {
    const retrievedFavoriteCity = localStorage.getItem("city");
    this.favoriteCity = JSON.parse(
        retrievedFavoriteCity || "[]"
    ) as Array<FavoriteCities>;
  },
});
</script>

<style scoped>

.card-container {
  margin-top: 2rem;
  height: 24rem;
}

.city-display {
  display: flex;
  flex-direction: column;
}

.city-display > i {
  color: red;
  cursor: pointer;
  font-size: 30px;
}

span {
  margin-left: 0.5rem;
  font-weight: normal;
  font-size: 18px;
}

p {
  font-size: 18px;
  font-weight: bold;
}

.image-container {
  margin: 0;
}

.city-navigation {
  background-image: linear-gradient(
      to right,
      #b36206 0%,
      #d2d885 51%,
      #b16003 100%
  );
}

.city-navigation {
  margin: 10px;
  padding: 15px 45px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  display: block;
}

.city-navigation > span {
  margin-right: 1rem;
}

.city-navigation:hover {
  cursor: pointer;
  background-position: right center;
  color: #fff;
  text-decoration: none;
}

.delete-city {
  background-image: linear-gradient(
      to right,
      #780808 0%,
      #e97982 51%,
      #780808 100%
  );
}

.delete-city {
  margin: 10px;
  padding: 15px 45px;
  text-align: center;
  text-transform: uppercase;
  font-weight: normal;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  display: block;
}

.delete-city > span {
  margin-right: 1rem;
}

.delete-city:hover {
  cursor: pointer;
  background-position: right center;
  color: #fff;
  text-decoration: none;
}
</style>
