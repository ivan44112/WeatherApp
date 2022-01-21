<template>
  <div class="searchBox" v-if="cities.length === 10 ? !showSearch : showSearch">
    <input class="searchInput" type="text" name="" v-model="searchTermForCities" placeholder="Search and add cities"
           @keyup.enter="fetchWeatherForCities">
    <button class="searchButton" v-if="cities.length === 10 ? !buttonDisabled : buttonDisabled"
            @click="fetchWeatherForCities">
      <i class="fas fa-search"></i>
    </button>
  </div>
  <BaseCard v-for="(city, index) in cities" :key="city.name">
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
      <p>Delete city <span style="cursor: pointer"><i class="fas fa-trash" style="color: red"
                                                      @click="deleteCity(index)"></i>
</span></p>
      <p>Add to favorites<span style="cursor: pointer"><i class="fas fa-heart" style="color: dodgerblue"
                                                          @click="addCityToFavorite(city)"></i>
</span></p>
    </div>
  </BaseCard>


</template>

<script lang="ts">
import {defineComponent} from 'vue'
import axios from 'axios'
import BaseCard from "@/ui/BaseCard.vue";


interface WeatherForCities {
  name: string;
  visibility: number,
  temperature: number,
  descriptionOfWeather: string,
  weatherIcon: string,
  latitude: number,
  longitude: number
}

export default defineComponent({
      name: 'Weather',
      components: {
        BaseCard,
      },
      data() {
        return {
          APIkey: 'ff1c72c6fa36d43e129658048b0e384d' as string,
          searchTermForCities: '' as string,
          cities: [] as Array<WeatherForCities>,
          buttonDisabled: true as boolean,
          showSearch: true as boolean
        }
      },
      methods: {
        fetchWeatherForCities() {
          axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
              q: this.searchTermForCities,
              appid: this.APIkey,
              units: 'metric',
            },
          }).then((response) => {
            const fetchedWeather = {
              name: response.data.name,
              visibility: response.data.visibility,
              temperature: response.data.main.temp,
              descriptionOfWeather: response.data.weather[0].description,
              weatherIcon: response.data.weather[0].icon,
              latitude: response.data.coord.lat,
              longitude: response.data.coord.lon,
            }
            this.cities.push(fetchedWeather)
            console.log(this.cities, 'ovdje su gradovi')
            console.log(response.data)
          })
        },
        selectedCityDailyWeather(lat: number, lon: number, cityName: string) {
          this.$router.push({path: `/weather/${cityName}`, query: {lat, lon}})
          console.log(this.$route.params, 'parami ovdje')

        },
        deleteCity(index: number) {
          this.cities.splice(index, 1)
        },
        addCityToFavorite(city: Array<WeatherForCities>) {
          const storedCities = JSON.parse(localStorage.getItem('city') || '[]')
          storedCities.push(city)
          localStorage.setItem('city', JSON.stringify(storedCities))
          alert('City added to favorites')
        }
      },


    },
) </script>

<style scoped>

.city-display {
  display: flex;
  flex-direction: column;
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

.city-navigation:hover {
  color: #35a3e3;
  cursor: pointer;
}

button {
  border: none;
}

.searchBox {
  position: absolute;
  top: 6%;
  left: 18.5%;
  transform: translate(-50%, 50%);
  height: 40px;
  border: 1px solid #1A669A;
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
  background: #1A669A;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
}

.searchButton > i {
  cursor: pointer;
}

.searchInput {
  font-family: CoinbaseSans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
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
