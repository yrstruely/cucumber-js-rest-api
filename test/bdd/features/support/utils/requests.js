
import {
    client,
    baseUrl,
    rangePath,
} from './request-consts.js'

import { 
    expect 
} from 'chai';

export async function changeRange(range) {

    const url = baseUrl + rangePath
    const postData = {
        range: range
      }

    // Make a POST request using Axios
    await client.post(url, postData)
        .then(response => {
            const ret = response.data
            expect(ret.data).to.equal(range);
            console.log(`POST request successful: "${url}" expect passed, new range ${range}`);
        })
        .catch(error => {
            console.error('Error making POST request:', error);
            throw error
        });

}