# Weather Chatbot with Gemini API

A simple Node.js app that uses the **Google Gemini API** and **OpenWeatherMap API** to fetch and display weather information for user-specified locations.

---

## Features

- **Gemini API**: Processes user queries.
- **OpenWeatherMap API**: Fetches real-time weather data.

---

## Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/kuslhhh/weather-agent.git
   cd weather-agent
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` File**:
   Add your API keys:
   ```
   GEMINI_API_KEY=your-gemini-api-key
   OPENWEATHERMAP_API_KEY=your-openweathermap-api-key
   ```

4. **Run the App**:
   ```bash
   npm run dev
   ```

---

## Usage

1. Start the app:
   ```bash
   npm run dev
   ```

2. Enter a location (e.g., `Mumbai`).

3. View the weather:
   ```
   The weather in Mumbai is clear with a temperature of 30°C.
   ```

---

## Dependencies

- `@google/generative-ai`: Gemini API SDK.
- `axios`: HTTP client for API requests.
- `dotenv`: Loads environment variables.