<template>
  <table>
    <thead>
    <tr>
      <th>Time</th>
      <th>Graphical analysis</th>
      <th>Expected temperature</th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="weatherForSelectedDay in weatherForSelectedDays"
        :key="weatherForSelectedDay.expectedTemperature"
    >
      <td>{{ weatherForSelectedDay.time }}</td>
      <td>
        <img
            :src="`http://openweathermap.org/img/wn/${weatherForSelectedDay.icon}.png`"
        />
      </td>
      <td>{{ weatherForSelectedDay.expectedTemperature }} °C</td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

interface WeatherForSelectedDay {
  time: string;
  icon: string;
  expectedTemperature: number;
}

export default defineComponent({
  name: "DayOfSelectedCity",
  data() {
    return {
      APIkey: "ff1c72c6fa36d43e129658048b0e384d" as string,
      weatherForSelectedDays: [] as Array<WeatherForSelectedDay>,
    };
  },
  methods: {
    fetchWeatherForSelectedDay() {
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
            for (let i = 0; i < 10; i++) {
              const currentDate = new Date(+(response.data.hourly[i].dt + "000"));
              let currentTime;

              if (currentDate.getHours() < 10) {
                currentTime =
                    "0" +
                    currentDate.getHours() +
                    ":" +
                    currentDate.getMinutes() +
                    currentDate.getSeconds();
              } else
                currentTime =
                    currentDate.getHours() +
                    ":" +
                    currentDate.getMinutes() +
                    currentDate.getSeconds();

              const fetchedWeatherForSelectedDay = {
                time: currentTime,
                icon: response.data.hourly[i].weather[0].icon,
                expectedTemperature: response.data.hourly[i].temp,
              };
              this.weatherForSelectedDays.push(fetchedWeatherForSelectedDay);
            }
          });
    },
  },
  mounted() {
    this.fetchWeatherForSelectedDay();
  },
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

table {
  width: 750px;
  border-collapse: collapse;
  margin: 12px 10px 0 28px;
  box-shadow: 0 2px 8px rgba(0.26, 0.26, 0.26, 0.26);
  animation: append-animate 0.3s linear;
}

table th {
  text-transform: uppercase;
  text-align: left;
  background: #1a669a;
  color: #fff;
  padding: 8px;
  min-width: 30px;
}

table td {
  text-align: center;
  padding: 8px;
  border-right: 2px solid #7d82a8;
}

table td:last-child {
  border-right: none;
}

table tbody tr:nth-child(2n) td {
  background: #c0d3ea;
}
</style>
