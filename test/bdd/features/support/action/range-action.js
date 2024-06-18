
import {
    baseUrl,
    rangePath,
    inRangePath,
    doGet,
    doPost,
} from '../util/request-basic.js'

export async function changeRange(range) {
    const url = baseUrl + rangePath;
    const msg = `POST request successful: "${url}" expect passed, new range ${range}`
    await doPost( url, { range }, msg)
}

export async function checkInRange(name) {
    const url = baseUrl + inRangePath + name
    const msg = `GET request successful: "${url}" expect passed`

    return await doGet(url, msg)
}
