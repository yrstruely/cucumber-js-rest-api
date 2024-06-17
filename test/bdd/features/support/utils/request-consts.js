
import axios from "axios";

// Define the URL of your API endpoint
export const baseUrl = 'http://localhost:3000';

export const rangePath = '/range'

export const client = axios.create({
    timeout: 60000,
    maxContentLength: 500 * 1000 * 1000,
}) 
