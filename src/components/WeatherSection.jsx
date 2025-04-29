/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../css/Weatherpage.css';

const WeatherSection = ({ user }) => {
  // List of major UK cities to use instead of database
  const majorUkCities = [
    { city: 'London', lat: 51.5074, lng: -0.1278 },
    { city: 'Birmingham', lat: 52.4862, lng: -1.8904 },
    { city: 'Manchester', lat: 53.4808, lng: -2.2426 },
    { city: 'Glasgow', lat: 55.8642, lng: -4.2518 },
    { city: 'Liverpool', lat: 53.4084, lng: -2.9916 },
    { city: 'Bristol', lat: 51.4545, lng: -2.5879 },
    { city: 'Edinburgh', lat: 55.9533, lng: -3.1883 },
    { city: 'Leeds', lat: 53.8008, lng: -1.5491 },
    { city: 'Sheffield', lat: 53.3811, lng: -1.4701 },
    { city: 'Cardiff', lat: 51.4816, lng: -3.1791 },
    { city: 'Belfast', lat: 54.5973, lng: -5.9301 },
    { city: 'Newcastle', lat: 54.9783, lng: -1.6178 },
    { city: 'Nottingham', lat: 52.9548, lng: -1.1581 },
    { city: 'Leicester', lat: 52.6369, lng: -1.1398 },
    { city: 'Coventry', lat: 52.4068, lng: -1.5197 },
    { city: 'Brighton', lat: 50.8225, lng: -0.1372 },
    { city: 'Southampton', lat: 50.9097, lng: -1.4044 },
    { city: 'Portsmouth', lat: 50.8198, lng: -1.0880 },
    { city: 'Plymouth', lat: 50.3755, lng: -4.1427 },
    { city: 'Luton', lat: 51.8787, lng: -0.4200 },
    { city: 'Aberdeen', lat: 57.1497, lng: -2.0943 },
    { city: 'Oxford', lat: 51.7520, lng: -1.2577 },
    { city: 'Cambridge', lat: 52.2053, lng: 0.1218 }
  ];

  const [ukCities, setUkCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loadingCities, setLoadingCities] = useState(true);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [error, setError] = useState('');
  const [date, setDate] = useState('');
  const [weatherQuote, setWeatherQuote] = useState('');
  const [recentlySearched, setRecentlySearched] = useState([
    { city: 'Liverpool, UK', temp: '16°', condition: 'Light Clouds' },
    { city: 'Palermo, Italy', temp: '-2°', condition: 'Light Snow' }
  ]);

  // Backend API base URL
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://portfolio-be-sad5.onrender.com';

  // Use a ref to track if this is the initial render
  const isInitialRender = React.useRef(true);

  // Weather quotes based on different conditions
  const weatherQuotes = {
    Clear: [
      "Sunshine is the best medicine for the soul.",
      "Blue skies smiling at me, nothing but blue skies do I see.",
      "A sunny day keeps the clouds away."
    ],
    Rain: [
      "Let the rain wash away your worries.",
      "Listen to the rhythm of the falling rain.",
      "The sound of rain needs no translation."
    ],
    Clouds: [
      "Even the darkest clouds will pass.",
      "Every cloud has a silver lining.",
      "Cloud watching: nature's own streaming service."
    ],
    Snow: [
      "Snowflakes are winter's butterflies.",
      "When it snows, you have two choices: shovel or make snow angels.",
      "The world changes when it snows – silence falls in a blanket of white."
    ],
    Thunderstorm: [
      "The sky's drama unfolds with each lightning strike.",
      "When thunder roars, go indoors.",
      "Nature's light show is in full effect today."
    ],
    Mist: [
      "In the mist, even the familiar becomes magical.",
      "Mist: nature's way of adding mystery to the ordinary.",
      "The world softens in the embrace of mist."
    ],
    Default: [
      "Weather is nature's way of showing us we're not in control.",
      "Live in the sunshine, swim in the sea, drink the wild air.",
      "Wherever you go, no matter the weather, always bring your own sunshine."
    ]
  };

  const setRandomWeatherQuote = (condition) => {
    const quotes = weatherQuotes[condition] || weatherQuotes.Default;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setWeatherQuote(quotes[randomIndex]);
  };

  const updateRecentlySearched = (newCity) => {
    // Check if the city is already in the list
    const cityExists = recentlySearched.some(city => city.city === newCity.city);
    
    if (!cityExists) {
      // Add to the beginning and keep only the most recent 2
      setRecentlySearched(prev => [newCity, ...prev].slice(0, 2));
    }
  };
  
  const processForecastData = (data) => {
    const dailyForecasts = [];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay();
    
    // Create a map to store the data for each day
    const dayMap = {};
    
    // Group forecast data by day
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dayName = days[date.getDay()];
      
      if (!dayMap[dayName]) {
        dayMap[dayName] = [];
      }
      
      dayMap[dayName].push(item);
    });
    
    // Get the average temperature for each day
    for (let i = 0; i < 6; i++) {
      const dayIndex = (today + i) % 7;
      const dayName = days[dayIndex];
      const dayData = dayMap[dayName];
      
      if (dayData && dayData.length > 0) {
        // Calculate average temperature for the day
        const avgTemp = dayData.reduce((sum, item) => sum + item.main.temp, 0) / dayData.length;
        
        dailyForecasts.push({
          day: dayName,
          temp: Math.round(avgTemp) + '°'
        });
      } else {
        // If no data for this day, use a placeholder
        dailyForecasts.push({
          day: dayName,
          temp: '--°'
        });
      }
    }
    
    return dailyForecasts;
  };

  // Function to fetch weather data wrapped in useCallback
  const fetchWeatherData = useCallback(async (lat, lng) => {
    setLoadingWeather(true);
    try {
      // Get current weather from our backend proxy instead of directly from OpenWeatherMap
      const weatherResponse = await axios.get(
        `${API_BASE_URL}/api/weather/current?lat=${lat}&lon=${lng}`
      );
      setWeatherData(weatherResponse.data);
      
      // Set weather quote based on condition
      setRandomWeatherQuote(weatherResponse.data.weather[0].main);
      
      // Get 5-day forecast from our backend proxy
      const forecastResponse = await axios.get(
        `${API_BASE_URL}/api/weather/forecast?lat=${lat}&lon=${lng}`
      );
      
      // Process forecast data to get daily forecasts
      const dailyData = processForecastData(forecastResponse.data);
      setForecastData(dailyData);
      
      // Add to recently searched if it's not already in the list and not initial render
      if (!isInitialRender.current) {
        updateRecentlySearched({
          city: `${weatherResponse.data.name}, UK`,
          temp: `${Math.round(weatherResponse.data.main.temp)}°`,
          condition: weatherResponse.data.weather[0].description
        });
      }
      isInitialRender.current = false;
    } catch (error) {
      console.error('Weather fetch error:', error);
      setError('Unable to fetch weather data. Please try again.');
    } finally {
      setLoadingWeather(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    // Instead of fetching cities from backend, use the predefined majorUkCities array
    setUkCities(majorUkCities);
    setLoadingCities(false);
    
    // Set a default city on initial load (preferably Luton to match the design)
    const defaultCity = majorUkCities.find(city => city.city === 'Luton') || majorUkCities[0];
    setSelectedCity(defaultCity.city);
    fetchWeatherData(defaultCity.lat, defaultCity.lng);

    // Set current time and date in the format shown in the design
    const updateDateTime = () => {
      const now = new Date();
      
      // Format: Friday, April 18
      setDate(now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
      }));
    };
    
    updateDateTime();
    const intervalId = setInterval(updateDateTime, 60000);
    
    return () => clearInterval(intervalId);
  }, [fetchWeatherData]);

  const handleCitySelect = (event) => {
    const city = event.target.value;
    const selected = ukCities.find((c) => c.city === city);
    if (selected) {
      setSelectedCity(selected.city);
      fetchWeatherData(selected.lat, selected.lng);
    } else {
      setWeatherData(null);
      setForecastData(null);
    }
  };

  const getWeatherCondition = () => {
    if (!weatherData) return '';
    const condition = weatherData.weather[0].main;
    const description = weatherData.weather[0].description;
    
    if (condition === 'Rain') return 'Rainy';
    if (condition === 'Clouds') {
      return description.includes('few') || description.includes('partly') 
        ? 'Partly cloudy' 
        : 'Cloudy';
    }
    if (condition === 'Clear') return 'Clear';
    if (condition === 'Thunderstorm') return 'Stormy with partly cloudy';
    if (condition === 'Snow') return 'Snow';
    if (condition === 'Drizzle') return 'Drizzle';
    if (condition === 'Mist' || condition === 'Fog') return 'Misty';
    
    return condition;
  };

  const getWeatherIcon = (condition) => {
    if (!condition) return '☁️';
    
    if (condition.includes('Snow')) return '❄️';
    if (condition.includes('Rain') || condition.includes('Drizzle')) return '🌧️';
    if (condition.includes('Cloud')) return '☁️';
    if (condition.includes('Clear')) return '☀️';
    if (condition.includes('Thunderstorm')) return '⛈️';
    if (condition.includes('Mist') || condition.includes('Fog')) return '🌫️';
    
    return '☁️';
  };

  // Helper function to generate the trend graph SVG
  const getTrendGraphSVG = () => {
    return `
      <svg width="100" height="30" viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,25 C20,25 25,5 45,15 C65,25 75,5 100,0" stroke="#4caf50" fill="none" stroke-width="2"/>
      </svg>
    `;
  };

  return (
    <div className="weather-page">
      {/* Top Edge Animation */}
      <div className="top-edge-animation">
        <div className="edge-line"></div>
        <div className="edge-dot dot1"></div>
        <div className="edge-dot dot2"></div>
        <div className="edge-dot dot3"></div>
        <div className="scan-line"></div>
        <div className="pulse-ring"></div>
      </div>
      
      <div className="weather-container">
        <div className="sidebar">
          <h2 className="app-title">WeatherToday</h2>
          
          <div className="status-section">
            <h3>Status</h3>
            <div className="status-graph">
              <div className="percentage">+3.8%</div>
              <div className="graph-indicator">
                <div dangerouslySetInnerHTML={{ __html: getTrendGraphSVG() }} />
              </div>
            </div>
            
            <div className="danger-level">
              <span>Dangerous</span>
              <div className="danger-meter"></div>
            </div>
            <button className="see-more">See More details</button>
          </div>
          
          <div className="location-selector">
            <h3>Select Area</h3>
            <div className="globe-container">
              <div className="globe-image">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="45" fill="#31343c" stroke="#4a5159" strokeWidth="1" />
                  <path d="M50,5 Q80,40 50,95 Q20,40 50,5" fill="#4a5159" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#5d6370" strokeWidth="0.5" strokeDasharray="2" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="#5d6370" strokeWidth="0.5" strokeDasharray="2" />
                </svg>
              </div>
              <div className="selected-location">
                {selectedCity ? `${selectedCity}, UK` : 'Select a city'}
              </div>
            </div>
            
            <div className="city-dropdown">
              <select value={selectedCity} onChange={handleCitySelect} disabled={loadingCities}>
                <option value="">Select a city</option>
                {ukCities.map((city, index) => (
                  <option key={index} value={city.city}>{city.city}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="main-content">
          <div className="header-row">
            <div className="location-info">
              <div className="location-icon">📍</div>
              <div className="location-text">
                {selectedCity ? `${selectedCity}, UK` : 'Select a city'} | {date}
              </div>
            </div>
          </div>
          
          {loadingWeather ? (
            <div className="loading">Loading weather data...</div>
          ) : weatherData ? (
            <>
              {/* Weather Quote Animation */}
              {weatherQuote && (
                <div className="weather-quote-container">
                  <div className="quote-icon">❝</div>
                  <div className="weather-quote">{weatherQuote}</div>
                  <div className="quote-icon quote-end">❞</div>
                </div>
              )}
              
              <div className="current-weather">
                <div className="temperature-display">
                  <h1 className="current-temp">{Math.round(weatherData.main.temp)}°</h1>
                  <div className="temp-range">
                    <span className="high-temp">{Math.round(weatherData.main.temp_max)}°</span>
                    <span className="low-temp">{Math.round(weatherData.main.temp_min)}°</span>
                  </div>
                </div>
                
                <div className="weather-description">
                  <h2 className="condition">{getWeatherCondition()}</h2>
                  <p className="tagline">
                    With real time data and advanced technology,
                    we provide reliable forecasts for any location
                    around the world.
                  </p>
                </div>
                
                <div className="recent-searches">
                  <div className="recent-header">
                    <h3>Recently Searched</h3>
                    <button className="see-all">See All</button>
                  </div>
                  <div className="recent-cities">
                    {recentlySearched.map((city, index) => (
                      <div key={index} className="recent-city-card">
                        <div className="weather-icon">
                          {getWeatherIcon(city.condition)}
                        </div>
                        <div className="temp">{city.temp}</div>
                        <div className="city-name">{city.city}</div>
                        <div className="condition">{city.condition}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="forecast-container">
                {forecastData && forecastData.map((day, index) => (
                  <div key={index} className={`day-forecast ${day.day === 'Wednesday' ? 'active' : ''}`}>
                    <div className="day-name">{day.day}</div>
                    <div className="forecast-wave-indicator">
                      {day.day === 'Wednesday' && <div className="wave-peak"></div>}
                    </div>
                    <div className="day-temp">{day.temp}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="no-data">
              {error || 'Please select a city to view weather information'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherSection;