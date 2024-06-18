
import {
    baseUrl,
    messagePath,
    doGet,
} from '../util/request-basic.js'

export async function getMessage() {
    const url = baseUrl + messagePath
    const msg = `GET request successful: "${url}" get current message`
    return await doGet(url, msg)
}