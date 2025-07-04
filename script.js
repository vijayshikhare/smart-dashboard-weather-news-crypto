document.addEventListener("DOMContentLoaded", function () {
    const WEATHER_API_KEY = 'your_openweathermap_api_key';
    const NEWS_API_KEY = 'your_thenewsapi_key';
    const cityInput = document.getElementById("cityInput");
    const searchBtn = document.getElementById("searchBtn");
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;

    async function fetchWeather(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            document.getElementById('weather').innerHTML = `🌤 ${data.main.temp}°C in ${data.name}`;
            fetchNews(city); // Fetch news based on the entered city
        } catch (error) {
            document.getElementById('weather').innerHTML = `⚠️ Error fetching weather`;
        }
    }

    async function fetchNews(city) {
        const url = `https://api.thenewsapi.com/v1/news/top?api_token=${NEWS_API_KEY}&search=${encodeURIComponent(city)}&locale=us&limit=5`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.data.length > 0) {
                document.getElementById('news').innerHTML = data.data.map(article => `
                    <div class="news-item">
                        <img src="${article.image_url || 'https://via.placeholder.com/150'}" alt="News Image" class="news-image">
                        <h3>${article.title}</h3>
                        <p>${article.description || 'No description available.'}</p>
                        <a href="${article.url}" target="_blank">Read more</a>
                    </div>
                `).join('');
            } else {
                document.getElementById('news').innerHTML = "No news found for this location.";
            }
        } catch (error) {
            document.getElementById('news').innerHTML = `⚠️ Error fetching news`;
        }
    }

    async function fetchCrypto() {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            document.getElementById('crypto').innerHTML = `₿ Bitcoin: $${data.bitcoin.usd} | Ξ Ethereum: $${data.ethereum.usd}`;
        } catch (error) {
            document.getElementById('crypto').innerHTML = `⚠️ Error fetching crypto`;
        }
    }

    searchBtn.addEventListener("click", () => {
        fetchWeather(cityInput.value);
    });

    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
    });

    fetchWeather("New York");
    fetchCrypto();
});
