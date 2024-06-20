
import axios from "axios";

import {
    expect
} from 'chai';

// basic urls and paths
export const baseUrl = 'http://localhost:3001';

export const rangePath = '/range'
export const personAddPath = '/person/add'
export const networkPersonAddPath = '/network/person-add'
export const shoutPath = '/shout'
export const inRangePath = '/person/in-range/'
export const messagePath = '/message'
export const heardMessagePath = '/person/heard-messages/'

// http client
export const client = axios.create({
    timeout: 60000,
    maxContentLength: 500 * 1000 * 1000,
}) 

export async function doPost(url, postData, successMessage) {
    await client.post(url, postData)
        .then(response => {
            const ret = response.data.data
            expect(ret).to.equal("success");
        })
        .catch(error => {
            console.error('Error making POST request:', error);
            throw error
        });
}

export async function doGet(url, successMessage) {
    try {
        const response = await client.get(url);
        const ret = response.data.data
        return ret
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error
    }
}
