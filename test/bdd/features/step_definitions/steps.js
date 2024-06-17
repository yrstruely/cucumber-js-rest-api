import { Given, Then } from '@cucumber/cucumber';
import { assertThat, is } from 'hamjest';
import { deepEqual } from 'node:assert';
import { Person } from '../../../../src/shouty.js';

import {
    sleep
} from '../support/utils/utils.js'

import {
    changeRange,
    addPerson,
    addPersonInNetwork,
    getPersonHeardMessages,
    checkInRange,
    getMessage
} from '../support/utils/requests.js'

const default_distance = 0

Given('the range is {int} meters', async function (range) {
    this.network.range = range
    await sleep(3)
    await changeRange(range)
});

Given('a person named {word}', async function (name) {
    await sleep(3)
    this.people[name] = new Person({ name: name, location: default_distance })
    await sleep(3)
    this.network.addPerson(this.people[name])
});

Given('people are located at:', async function (dataTable) {
    for(const person of dataTable.transpose().hashes()) {
        await sleep(3)
        addPerson(person.name, person.location)

        await sleep(3)
        addPersonInNetwork(person.name)
    }
});

Then('{Person} hears {Person}\'s message', function (hearer, shouter) {
    assertThat(this.people[hearer.name].messagesHeard(), is([this.message]))
});

Then('{Person} doesn\'t hear {Person}\'s message', function (hearer, shouter) {
    assertThat(this.people[hearer.name].messagesHeard(), is([]))
});

Then('{Person} hears the following messages:', function (hearer, expectedMessages) {
    let actualMessages = this.people[hearer.name].messagesHeard().map(message => [message])
    deepEqual(actualMessages, expectedMessages.raw())
});

Then('{Person} only hears {Person}\'s message when she is in range', async function (hearer, shouter) {

    await sleep(3)
    const inRange = await checkInRange(hearer.name)

    if (inRange) {
        const heardMessages = await getPersonHeardMessages(hearer.name)
        const message = await getMessage()
        assertThat(heardMessages, is([message]))
    }
    else {
        const heardMessages = await getPersonHeardMessages(hearer.name)
        assertThat(heardMessages, is([]))
    }
});