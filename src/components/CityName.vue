<template>
  <BaseCard v-for="day in days" :key="day.nameOfDay" class="card-container">
    <div class="daily-city-forecast">
      <div class="daily-city-forecast-card">
        <p
            class="day-navigation"
            @click="navigateToSelectedDay(day.lat, day.lon, day.dt)"
        >
          <span>{{
              day.nameOfDay.charAt(0).toUpperCase() + day.nameOfDay.slice(1)
            }}</span>
        </p>

        <p>
          <span
          ><img
              :src="`http://openweathermap.org/img/wn/${day.icon}.png`"
          /></span>
        </p>
        <p>
          <span>{{ Math.round(day.minTemperature) }}°C </span>
          <span class="max-temperature"
          >{{ Math.round(day.maxTemperature) }}°C</span
          >
        </p>
      </div>
    </div>
  </BaseCard>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseCard from "@/ui/BaseCard.vue";
import axios from "axios";

interface DaysTemperature {
  nameOfDay: string;
  icon: string;
  minTemperature: number;
  maxTemperature: number;
  dt: number;
  lat: number;
  lon: number;
}

export default defineComponent({
  name: "CityName",
  components: {
    BaseCard,
  },
  data() {
    return {
      APIkey: "ff1c72c6fa36d43e129658048b0e384d" as string,
      days: [] as Array<DaysTemperature>,
      showTimestamp: false as boolean,
    };
  },
  methods: {
    fetchWeatherForDailyForecast() {
      axios
          .get("https://api.openweathermap.org/data/2.5/onecall", {
            params: {
              lat: this.$route.query.lat,
              lon: this.$route.query.lon,
              appid: this.APIkey,
              units: "metric",
            },
          })
          .then((response) => {
            for (let i = 0; i < 5; i++) {
              const date = new Date(+(response.data.daily[i].dt + "000"));
              const fetchedDailyWeatherData = {
                nameOfDay: date.toLocaleDateString("hr", { weekday: "long" }),
                icon: response.data.daily[i].weather[0].icon,
                minTemperature: response.data.daily[i].temp.min,
                maxTemperature: response.data.daily[i].temp.max,
                dt: response.data.daily[i].dt,
                lat: response.data.lat,
                lon: response.data.lon,
              };
              this.days.push(fetchedDailyWeatherData);
            }
          });
    },
    navigateToSelectedDay(lat: number, lon: number, dt: number) {
      this.$router.push({
        path: `/weather/cityName/${dt}`,
        query: { lat, lon },
      });
    },
  },
  mounted() {
    this.fetchWeatherForDailyForecast();
  },
});
</script>

<style scoped>
.card-container {
  margin-top: 2rem;
  height: 12rem;
}

.daily-city-forecast {
  display: flex;
  flex-direction: column;
}

.max-temperature {
  color: #bfbebe;
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

.day-navigation {
  background-image: linear-gradient(
      to right,
      #b36206 0%,
      #d2d885 51%,
      #b16003 100%
  );
}

.day-navigation {
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

.day-navigation > span {
  margin-right: 1rem;
}

.day-navigation:hover {
  cursor: pointer;
  background-position: right center;
  color: #fff;
  text-decoration: none;
}
</style>
