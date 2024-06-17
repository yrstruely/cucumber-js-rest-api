
import axios from "axios";

// Define the URL of your API endpoint
export const baseUrl = 'http://localhost:3000';

export const rangePath = '/range'
export const personAddPath = '/person/add'
export const networkPersonAddPath = '/network/person-add'

export const shoutPath = '/shout'

export const inRangePath = '/person/in-range/'
export const messagePath = '/message'
export const heardMessagePath = '/person/heard-messages/'


export const client = axios.create({
    timeout: 60000,
    maxContentLength: 500 * 1000 * 1000,
}) 
