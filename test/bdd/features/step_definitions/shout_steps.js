import { When } from '@cucumber/cucumber';

import {
    shout
} from '../support/action/person-action.js'

When('{Person} shouts {string}', async function (shouter, message) {
    await shout(shouter, message)
});

When('{Person} shouts the following message', function (shouter, message) {
    this.shout({ from: shouter, message })
})


