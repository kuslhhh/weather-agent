import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import * as dotenv from 'dotenv';
import * as readline from 'readline';

dotenv.config();

const geminiApiKey = process.env.GEMINI_API_KEY;
const weatherApiKey = process.env.OPENWEATHERMAP_API_KEY;

if (!geminiApiKey || !weatherApiKey) {
    throw new Error('API keys are not defined in the environment variables.');
}

const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

async function getWeatherData(city: string): Promise<string> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;
    try {
        const response = await axios.get(url);
        const weather = response.data.weather[0].description;
        const temperature = response.data.main.temp;
        return `The weather in ${city} is ${weather} with a temperature of ${temperature}°C.`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return `Unable to fetch weather data for ${city}.`;
    }
}

async function getUserInput(question: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

async function run() {
    try {
        const locationname = await getUserInput('Enter your location: ');
        const user = `Hey, what is the weather of ${locationname}?`;

        const result = await model.generateContent(user);
        const responseText = result.response.text();

        const locations = [locationname.toLowerCase()];
        let foundLocation = '';

        for (const location of locations) {
            if (responseText.toLowerCase().includes(location.toLowerCase())) {
                foundLocation = location;
                break;
            }
        }

        if (foundLocation) {
            const weatherInfo = await getWeatherData(foundLocation);
            console.log(weatherInfo);
        } else {
            console.log(responseText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

run();