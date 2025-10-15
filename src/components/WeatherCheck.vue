<template>
  <section class="wrap">
    <h1>WeatherCheck</h1>

    <!-- Location-based weather only -->
    <div class="card">
      <h2>Check weather using my location</h2>
      <button @click="getByGeo" :disabled="loading">
        {{ loading ? 'Working...' : 'Use My Location' }}
      </button>
    </div>

    <!-- Status messages -->
    <p v-if="loading">Loading...</p>
    <p v-else-if="error" class="err">{{ error }}</p>

    <!-- Weather display -->
    <div v-else-if="weather">
      <h2>{{ weather.title }}</h2>
      <p>Temperature: {{ Math.round(weather.temp) }}°C</p>
      <p>Windspeed: {{ Math.round(weather.wind) }} km/h</p>
      <p>Source: Open-Meteo (current_weather)</p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)
const error = ref('')
const weather = ref(null)

// Fetch current weather data from Open-Meteo API
async function fetchWeather(lat, lon, title) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current_weather=true&timezone=auto`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Weather request failed')
  const data = await res.json()
  if (!data.current_weather) throw new Error('No current weather data')
  weather.value = {
    title,
    temp: data.current_weather.temperature,
    wind: data.current_weather.windspeed
  }
}

// Get weather based on browser geolocation
async function getByGeo() {
  error.value = ''
  weather.value = null
  loading.value = true
  try {
    // Works only on HTTPS 
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000
      })
    })
    const { latitude, longitude } = pos.coords
    await fetchWeather(latitude, longitude, 'Your location')
  } catch (e) {
    error.value = 'Failed to get location'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.wrap { max-width: 720px; margin: 2rem auto; padding: 1rem; }
.card { border: 1px solid #eee; padding: 1rem; border-radius: 10px; margin-bottom: 1rem; }
button { padding: .6rem .9rem; cursor: pointer; }
.err { color: #d33; }
.note { font-size: .9rem; opacity: .75; margin-top: .5rem; }
</style>


