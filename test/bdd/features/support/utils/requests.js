
import {
    client,
    baseUrl,
    rangePath,
    personAddPath,
    networkPersonAddPath,
    shoutPath,
    inRangePath,
    messagePath,
    heardMessagePath,
} from './request-consts.js'

import {
    expect
} from 'chai';

export async function changeRange(range) {
    const url = baseUrl + rangePath;
    const msg = `POST request successful: "${url}" expect passed, new range ${range}`
    await doPost(
        url,
        {
            range
        },
        msg
    )
}

export async function addPerson(name, location) {
    const url = baseUrl + personAddPath;
    const msg = `POST request successful: "${url}" expect passed, new person ${name}, ${location}`
    await doPost(
        url,
        {
            name,
            location
        },
        msg
    )
}

export async function addPersonInNetwork(name) {
    const url = baseUrl + networkPersonAddPath;
    const msg = `POST request successful: "${url}" expect passed, new person ${name}`

    await doPost(
        url,
        {
            name
        },
        msg)
}

export async function shout(shouter, message) {
    const url = baseUrl + shoutPath;
    const msg = `POST request successful: "${url}" expect passed, new person ${message}`

    console.log(shouter)

    const shoutBody = {
        from: {
            name: shouter.name,
        },
        message
    }

    console.log('shoutBody', shoutBody)
    
    await doPost(
        url,
        shoutBody,
        msg)
}

async function doPost(url, postData, successMessage) {
    await client.post(url, postData)
        .then(response => {
            const ret = response.data.data
            expect(ret).to.equal("success");
            console.log(successMessage);
        })
        .catch(error => {
            console.error('Error making POST request:', error);
            throw error
        });
}

export async function checkInRange(name) {
    const url = baseUrl + inRangePath + name
    const msg = `GET request successful: "${url}" expect passed`

    const inRange = await doGet(url, msg)
    return inRange
}

export async function getMessage() {
    const url = baseUrl + messagePath
    const msg = `GET request successful: "${url}" expect passed`

    const message = await doGet(url, msg)
    return message
}

export async function getPersonHeardMessages(name) {
    const url = baseUrl + heardMessagePath + name
    const msg = `GET request successful: "${url}" expect passed`

    const messages = await doGet(url, msg)
    return messages
}

async function doGet(url, successMessage) {
    try {
        const response = await client.get(url);
        console.log(successMessage);

        const ret = response.data.data
        return ret

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error
    }
}