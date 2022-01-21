<template>
  <BaseCard v-for="city in favoriteCity" :key="city.name" class="card-container">
    <div class="city-display">
      <p>City name:<span class="city-navigation"
                         @click="selectedCityDailyWeather(city.latitude, city.longitude, city.name)">{{
          city.name
        }}</span>
      </p>
      <p>Visibility:<span>{{ city.visibility }} metres</span></p>
      <p>Description:<span>{{
          city.descriptionOfWeather.charAt(0).toUpperCase() + city.descriptionOfWeather.slice(1)
        }} </span></p>
      <p>Temp:<span>{{ Math.round(city.temperature) }}°C</span></p>
      <p class="image-container"><span> <img v-bind:src="`http://openweathermap.org/img/wn/${city.weatherIcon}.png` "
                                             alt=""/>
      </span></p>
    </div>
  </BaseCard>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import BaseCard from "@/ui/BaseCard.vue";

interface FavoriteCities {
  name: string;
  visibility: number,
  temperature: number,
  descriptionOfWeather: string,
  weatherIcon: string,
  latitude: number,
  longitude: number
}

export default defineComponent({
  name: 'FavoriteCity',
  components: {
    BaseCard
  },
  data() {
    return {
      favoriteCity: [] as Array<FavoriteCities>
    }
  },
  mounted() {
    const retrievedFavoriteCity = localStorage.getItem('city')
    this.favoriteCity = JSON.parse(retrievedFavoriteCity || '[]') as Array<FavoriteCities>
  }
})</script>

<style scoped>

.card-container {
  margin-top: 2rem;
  height: 18rem;
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

</style>
