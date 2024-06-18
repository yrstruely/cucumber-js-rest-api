
import {
    baseUrl,
    personAddPath,
    networkPersonAddPath,
    shoutPath,
    heardMessagePath,
    doGet,
    doPost,
} from '../util/request-basic.js'

export async function addPerson(name, location) {

    const url = baseUrl + personAddPath;
    const msg = `POST request successful: "${url}", new person ${name}, ${location}.`
    await doPost(url, { name, location }, msg)
}

export async function addPersonInNetwork(name) {

    const url = baseUrl + networkPersonAddPath;
    const msg = `POST request successful: "${url}", add person ${name} to network.`
    await doPost( url, { name }, msg)
}

export async function getPersonHeardMessages(name) {

    const url = baseUrl + heardMessagePath + name
    const msg = `GET request successful: "${url}", get person heard messages.`
    return await doGet(url, msg)
}

export async function shout(shouter, message) {

    const url = baseUrl + shoutPath;
    const msg = `POST request successful: "${url}" expect passed, new person ${message}`
    const shoutBody = { from: { name: shouter.name, },  message }

    await doPost( url, shoutBody,  msg)
}
