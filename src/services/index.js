import axios from 'axios';

const API_KEY = process.env.VUE_APP_WEATHER_KEY;

const axiosWeather = axios.create({
  baseURL: 'https://opendata.cwb.gov.tw/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  getWeatherForecast() {
    return axiosWeather.get(
      `/v1/rest/datastore/O-A0001-001?Authorization=${API_KEY}`
    );
  },
  getSunrise(date) {
    return axiosWeather.get(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/A-B0062-001?Authorization=${API_KEY}&locationName=臺北市&dataTime=${date}`
    );
  },
};
