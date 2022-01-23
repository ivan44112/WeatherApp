<template>
  <div class="searchBox">
    <input
        v-if="cities.length === 10 ? !showSearch : showSearch"
        class="searchInput"
        type="text"
        name=""
        v-model="searchTermForCities"
        placeholder="Search and add cities"
        @keyup.enter="fetchWeatherForCities"
    />
    <button
        class="searchButton"
        v-if="cities.length === 10 ? !buttonDisabled : buttonDisabled"
        @click="fetchWeatherForCities"
    >
      <i class="fas fa-search"></i>
    </button>
    <p class="validation-message" v-if="cities.length === 10">
      Maximum amount reached, delete some to add more.
    </p>
  </div>
  <transition-group name="fade">
    <BaseCard v-for="(city, index) in cities" :key="city.name">
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
      <p @click="deleteCity(index)" class="delete-city">
        Delete city
        <span><i class="fas fa-trash"></i> </span>
      </p>
      <p @click="addCityToFavorite(city)" class="favorite-city">
        Favorite<span
      ><i class="fas fa-heart" style="margin-left: 24px"></i>
        </span>
      </p>
    </BaseCard>
  </transition-group>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import BaseCard from "@/ui/BaseCard.vue";

interface WeatherForCities {
  name: string;
  visibility: number;
  temperature: number;
  descriptionOfWeather: string;
  weatherIcon: string;
  latitude: number;
  longitude: number;
}

export default defineComponent({
  name: "Weather",
  components: {
    BaseCard,
  },
  data() {
    return {
      APIkey: "ff1c72c6fa36d43e129658048b0e384d" as string,
      searchTermForCities: "" as string,
      cities: [] as Array<WeatherForCities>,
      buttonDisabled: true as boolean,
      showSearch: true as boolean,
      validationErrorMessage: "" as string,
    };
  },
  methods: {
    fetchWeatherForCities() {
      axios
          .get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
              q: this.searchTermForCities,
              appid: this.APIkey,
              units: "metric",
            },
          })
          .then((response) => {
            const fetchedWeather = {
              name: response.data.name,
              visibility: response.data.visibility,
              temperature: response.data.main.temp,
              descriptionOfWeather: response.data.weather[0].description,
              weatherIcon: response.data.weather[0].icon,
              latitude: response.data.coord.lat,
              longitude: response.data.coord.lon,
            };
            this.cities.push(fetchedWeather);
            const storedCities = JSON.parse(
                localStorage.getItem("searchedCity") || "[]"
            );
            storedCities.push(fetchedWeather);
            localStorage.setItem("searchedCity", JSON.stringify(storedCities));
            this.searchTermForCities = "";
          });
    },
    selectedCityDailyWeather(lat: number, lon: number, cityName: string) {
      this.$router.push({ path: `/weather/${cityName}`, query: { lat, lon } });
    },
    deleteCity(index: number) {
      this.cities.splice(index, 1);
      localStorage.setItem("searchedCity", JSON.stringify(this.cities));
    },
    addCityToFavorite(city: Array<WeatherForCities>) {
      const storedCities = JSON.parse(localStorage.getItem("city") || "[]");
      if (storedCities.length < 10) {
        storedCities.push(city);
        localStorage.setItem("city", JSON.stringify(storedCities));
        alert("City added to favorites");
      } else {
        alert("Maximum amount of favorite cities added")
      }

    },
  },
  mounted() {
    const retrievedSearchedCity = localStorage.getItem("searchedCity");
    this.cities = JSON.parse(
        retrievedSearchedCity || "[]"
    ) as Array<WeatherForCities>;
  },
});
</script>

<style scoped>

span {
  margin-left: 0.5rem;
  font-weight: normal;
  font-size: 18px;
}

p {
  font-size: 18px;
  font-weight: bold;
  transition: all 0.6s ease-out;
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

.validation-message {
  color: rgb(179, 0, 0);
  font-family: CoinbaseSans, -apple-system, BlinkMacSystemFont, "Segoe UI",
  Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
  "Helvetica Neue", sans-serif;
  font-weight: bold;
  font-size: 16px;
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

.favorite-city {
  background-image: linear-gradient(
      to right,
      #00a4fc 0%,
      #85d8ce 51%,
      #00a6ff 100%
  );
}

.favorite-city {
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

.favorite-city > span {
  margin-right: 1rem;
}

.favorite-city:hover {
  cursor: pointer;
  background-position: right center;
  color: #fff;
  text-decoration: none;
}

button {
  border: none;
}

.searchBox {
  position: absolute;
  top: 6%;
  left: 22%;
  transform: translate(-50%, 50%);
  height: 40px;
  border: 1px solid #1a669a;
  border-radius: 40px;
  padding: 10px;
}

.searchBox:hover > .searchInput {
  width: 240px;
  padding: 0 6px;
}

.searchBox:hover > .searchButton {
  background: white;
  color: #2f3640;
}

.searchButton {
  color: white;
  float: right;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #1a669a;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
}

.searchButton > i {
  cursor: pointer;
}

.searchInput {
  font-family: CoinbaseSans, -apple-system, BlinkMacSystemFont, "Segoe UI",
  Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
  "Helvetica Neue", sans-serif;
  font-weight: bold;
  border: none;
  background: none;
  outline: none;
  float: left;
  padding: 0;
  font-size: 16px;
  transition: 0.4s;
  line-height: 40px;
  width: 0;
}

@media screen and (max-width: 620px) {
  .searchBox:hover > .searchInput {
    width: 150px;
    padding: 0 6px;
  }
}
</style>
