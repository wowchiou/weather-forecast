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

// F-C0032-001 => 36小時
// F-D0047-089 => 台灣未來2天
// F-D0047-001 => 宜蘭未來2天及1周預報
// O-A0001-001 => 氣象觀測資料 X

export default {
  getWeatherForecast() {
    return axiosWeather.get(
      `/v1/rest/datastore/F-D0047-089?Authorization=${API_KEY}`
    );
  },
  getWeekWeather() {
    return axiosWeather.get(
      `/v1/rest/datastore/F-D0047-091?Authorization=${API_KEY}`
    );
  },
  getSunrise(date) {
    return axiosWeather.get(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/A-B0062-001?Authorization=${API_KEY}&locationName=臺北市&dataTime=${date}`
    );
  },
};
